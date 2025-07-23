import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import puppeteer from "puppeteer";
import markdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import markdownItAnchor from "markdown-it-anchor";
import { collectFilesFromBook } from "./lib/collectFilesFromBook.js";
import { slugify } from "./lib/slugify.js";
import { fixImgSrc } from "./lib/fixImgSrc.js";
import { renderPdf } from "./lib/renderPdf.js";
import { renderEpub } from "./lib/renderEpub.js";

const versionInfo = fs.existsSync("./version.json")
  ? JSON.parse(fs.readFileSync("./version.json", "utf8"))
  : { version: "0.0.0", commit: "", date: "" };

const docsDir = "./docs";
const coverCssPath = path.join(docsDir, "public", "styles", "pdf-cover.css");
const contentCssPath = path.join(
  docsDir,
  "public",
  "styles",
  "pdf-content.css"
);

// CLI-Argumente auslesen
const args = process.argv.slice(2);

// Standard-Format ist PDF
let outputFormat = "pdf";
if (args.includes("--epub")) outputFormat = "epub";
if (args.includes("--pdf")) outputFormat = "pdf"; // Optional: explizit setzen

async function main() {
  const configPath = path.join(docsDir, "config.js");
  if (!fs.existsSync(configPath)) {
    console.error("❌ config.js nicht gefunden im docs-Ordner!");
    process.exit(1);
  }
  const { config } = await import(pathToFileURL(configPath));
  const markdownFiles = collectFilesFromBook(config.bookStructure, docsDir);

  const rawCss = fixImgSrc(fs.readFileSync(contentCssPath, "utf8"), docsDir);
  const rawCoverCss = fixImgSrc(fs.readFileSync(coverCssPath, "utf8"), docsDir);

  const md = markdownIt({ html: true })
    .use(markdownItFootnote)
    .use(markdownItAnchor, { slugify });

  if (outputFormat === "pdf") {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const finalPage = await browser.newPage();

    await renderPdf(
      finalPage,
      { ...config },
      markdownFiles,
      rawCss,
      rawCoverCss,
      md,
      docsDir,
      versionInfo
    );

    const versionPath = path.join(
      docsDir,
      "public",
      "archive",
      `${config.pdfPrefix}-v${versionInfo.version}.pdf`
    );
    const latestPath = path.join(
      docsDir,
      "public",
      "archive",
      `${config.pdfPrefix}-latest.pdf`
    );
    fs.mkdirSync(path.dirname(versionPath), { recursive: true });

    await finalPage.pdf({
      path: versionPath,
      format: "A4",
      printBackground: true,
      margin: { top: "2.5cm", bottom: "3.0cm", left: "2.5cm", right: "2cm" },
      displayHeaderFooter: true,
      headerTemplate: `<div style="font-size:9px; width:100%; text-align:right; padding:1cm 2cm 0 2.5cm; color:#555;">
        ${config.title} - ${config.subtitle}</div>`,
      footerTemplate: `<div style="font-size:9px; width:100%; display:flex; justify-content:space-between; padding:0 2cm 1cm 2.5cm; color:#555;">
        <span>${config.formatFooter(
          versionInfo.date,
          versionInfo.commit,
          versionInfo.version,
          config.author,
          config.title
        )}</span>
        <span class="pageNumber"></span></div>`,
    });

    await browser.close();
    console.log(`✅ PDF erzeugt: ${versionPath}`);
    fs.copyFileSync(versionPath, latestPath);
    console.log(`📁 Kopie erstellt: ${latestPath}`);
  } else if (outputFormat === "epub") {
    await renderEpub({ ...config }, markdownFiles, md, docsDir, versionInfo);
    // Tipp: Kopieren, Logging etc. ins renderEpub.js auslagern (wie PDF oben)
  } else {
    console.error("❌ Unbekanntes Format! Verwende --pdf oder --epub");
    process.exit(1);
  }
}

main();
