import fs from "fs";
import path from "path";
import { stripFrontmatter } from "./stripFrontmatter.js";
import { fixImgSrc } from "./fixImgSrc.js";
import { fixFootnoteIds } from "./fixFootnoteIds.js";
import epubPkg from "epub-gen-memory";
const epub = epubPkg.default || epubPkg;

export async function renderEpub(
  config,
  markdownFiles,
  md,
  docsDir,
  versionInfo
) {
  let chapters = [];

  // Content-Kapitel hinzufügen
  for (const { fullPath, anchor } of markdownFiles) {
    const raw = stripFrontmatter(fs.readFileSync(fullPath, "utf8"));
    const html = fixImgSrc(
      fixFootnoteIds(md.render(raw), anchor),
      fullPath,
      docsDir,
      false
    );

    const h1Match = raw.match(/^#\s+(.+)/m);
    const chapterTitle = h1Match ? h1Match[1] : path.basename(fullPath, ".md");

    chapters.push({
      title: chapterTitle,
      content: html,
      excludeFromToc: false,
    });
  }

  const coverPath = path.join(docsDir, config.coverEpub);
  const cover = await fs.promises.readFile(coverPath);
  const coverFile = new File([cover], "cover.png");

  const options = {
    title: config.title,
    author: config.author,
    publisher: config.publisher || "",
    description: config.subtitle,
    cover: coverFile,
    tocTitle: config.tableOfContents,
    tocInTOC: false,
    numberChaptersInTOC: false,
    prependChapterTitles: false,
    date: versionInfo.date,
    lang: config.lang,
    version: 3,
    verbose: true,
  };

  // Speicherpfad vorbereiten
  const versionPath = path.join(
    docsDir,
    "public",
    "archive",
    `${config.pdfPrefix}-v${versionInfo.version}.epub`
  );
  fs.mkdirSync(path.dirname(versionPath), { recursive: true });

  try {
    const buffer = await epub(options, chapters);
    fs.writeFileSync(versionPath, buffer);
    console.log(`✅ EPUB erzeugt: ${versionPath}`);

    // Kopie als "-latest"
    const latestPath = path.join(
      docsDir,
      "public",
      "archive",
      `${config.pdfPrefix}-latest.epub`
    );
    fs.copyFileSync(versionPath, latestPath);
    console.log(`📁 Kopie erstellt: ${latestPath}`);
  } catch (err) {
    console.error("❌ EPUB-Erzeugung fehlgeschlagen:", err);
  }
}
