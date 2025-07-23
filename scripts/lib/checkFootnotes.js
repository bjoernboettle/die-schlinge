import fs from "fs";
import pLimit from "p-limit";
import { findMarkdownFiles } from "./findMarkdownFiles.js";

const browserHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  Referer: "https://www.google.com/",
  Connection: "keep-alive",
};

function normalizeUrl(url) {
  return url
    .replace("http://dx.doi.org/", "https://doi.org/")
    .replace("https://dx.doi.org/", "https://doi.org/")
    .replace("http://doi.org/", "https://doi.org/");
}

async function resolveDoi(url) {
  if (!url.includes("doi.org")) return url;
  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "manual",
      headers: browserHeaders,
    });
    const redirectUrl = res.headers.get("location");
    if (redirectUrl && redirectUrl.startsWith("http")) {
      console.log(`\u{1F500} DOI Redirect \u2192 ${redirectUrl}`);
      return redirectUrl;
    }
  } catch (err) {
    console.warn(`\u26A0\uFE0F DOI-Auflösung fehlgeschlagen \u2192 ${url}`);
  }
  return url;
}

async function robustFetchWithRetry(url, retries = 2, timeoutMs = 10000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        method: "GET",
        signal: controller.signal,
        headers: browserHeaders,
        redirect: "follow",
      });
      clearTimeout(timeout);
      return res;
    } catch (err) {
      clearTimeout(timeout);
      if (attempt === retries) throw err;
      console.warn(`\u{1F501} Wiederhole (${attempt}) für ${url}`);
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}

async function extractLinks(content) {
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const matches = [...content.matchAll(linkRegex)];
  return matches.map((m) => ({ label: m[1], url: m[2] }));
}

async function checkLink(filePath, line, rawUrl, failedLinks) {
  const normalizedUrl = normalizeUrl(rawUrl);
  const resolvedUrl = await resolveDoi(normalizedUrl);

  try {
    const res = await robustFetchWithRetry(resolvedUrl, 2, 10000);
    if (res.ok) {
      console.log(`\u2705 ${res.status} ${resolvedUrl}`);
    } else {
      console.warn(
        `\u26A0\uFE0F  ${res.status} ${res.statusText} \u2192 ${resolvedUrl}`
      );
      failedLinks.push({
        file: filePath,
        line: line.trim(),
        url: resolvedUrl,
        status: res.status,
        reason: res.statusText,
      });
    }
  } catch (err) {
    console.error(`\u274C ${resolvedUrl} \u2192 ${err.message}`);
    failedLinks.push({
      file: filePath,
      line: line.trim(),
      url: resolvedUrl,
      status: "\u274C",
      reason: err.name === "AbortError" ? "Timeout" : err.message,
    });
  }
}

export async function checkFootnotes({
  docsDir = "./docs",
  concurrency = 10,
} = {}) {
  const failedLinks = [];
  const markdownFiles = findMarkdownFiles(docsDir);
  for (const file of markdownFiles) {
    const content = fs.readFileSync(file, "utf8");
    const footnoteLines = content.match(/^\[\^[^\]]+\]:.*$/gm) || [];
    console.log(`\u{1F50D} ${file} \u2192 ${footnoteLines.length} Fußnoten`);
    const limit = pLimit(concurrency);
    const tasks = [];
    for (const line of footnoteLines) {
      const matches = await extractLinks(line);
      for (const { url } of matches) {
        tasks.push(limit(() => checkLink(file, line, url, failedLinks)));
      }
    }
    await Promise.all(tasks);
  }
  if (failedLinks.length > 0) {
    console.log("\n\n\u{1F4C9} Fehlerhafte Links:");
    console.table(
      failedLinks.map((f) => ({
        Datei: f.file,
        Fußnote: f.line.length > 80 ? f.line.slice(0, 77) + "…" : f.line,
        URL: f.url,
        Status: f.status,
        Fehler: f.reason,
      }))
    );
    process.exitCode = 1;
  } else {
    console.log("\n\u2705 Alle Fußnoten-Links sind erreichbar.");
  }
}
