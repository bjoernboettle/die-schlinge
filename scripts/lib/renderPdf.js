import fs from "fs";
import path from "path";
import { stripFrontmatter } from "./stripFrontmatter.js";
import { fixImgSrc } from "./fixImgSrc.js";
import { fixFootnoteIds } from "./fixFootnoteIds.js";
import { formatTocHtml } from "./formatTocHtml.js";

export async function renderPdf(
  page,
  config,
  markdownFiles,
  rawCss,
  rawCoverCss,
  md,
  docsDir,
  versionInfo
) {
  const parts = [];
  // Cover
  const coverPath = path.join(docsDir, "pdf-cover.html");
  if (fs.existsSync(coverPath)) {
    const raw = stripFrontmatter(fs.readFileSync(coverPath, "utf8"));
    const coverHtml = fixImgSrc(md.render(raw), coverPath, docsDir)
      .replace("{TITLE}", config.title)
      .replace("{SUBTITLE}", config.subtitle)
      .replace("{AUTHOR}", config.author)
      .replace(
        "{VERSION}",
        config.formatFooter(
          versionInfo.date,
          versionInfo.commit,
          versionInfo.version,
          config.author,
          config.title
        )
      );
    parts.push(`<section class="cover">${coverHtml}</section>`);
  }
  // TOC
  const toc = formatTocHtml(config.tableOfContents, markdownFiles);
  parts.push(`<section class="toc">${toc}</section>`);
  // Content
  for (const { fullPath, anchor } of markdownFiles) {
    const raw = stripFrontmatter(fs.readFileSync(fullPath, "utf8"));
    const html = fixImgSrc(fixFootnoteIds(md.render(raw), anchor), fullPath);
    parts.push(`<section id="${anchor}">${html}</section>`);
  }
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
    <style>${rawCoverCss}\n${rawCss}</style>
    </head><body>${parts.join("\n\n")}</body></html>`;
  await page.setContent(html, { waitUntil: "networkidle0" });
}
