import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

export async function checkStructure(docsDir = "./docs") {
  const configPath = path.join(docsDir, "config.js");
  if (!fs.existsSync(configPath)) {
    console.warn(`❌ config.js fehlt im docs-Verzeichnis`);
    return;
  }

  const configUrl = pathToFileURL(path.resolve(configPath)).href;
  const { config } = await import(configUrl);
  const book = config.bookStructure;

  if (!Array.isArray(book)) {
    console.warn(`❌ Keine gültige bookStructure in ${configPath}`);
    return;
  }

  console.log(`🔍 Prüfe bookStructure im '${docsDir}'...\n`);
  let hasValidEntries = false;
  function checkMdContent(filePath) {
    if (!fs.existsSync(filePath)) return false;
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("---"));
    return lines.length >= 3;
  }

  for (const entry of book) {
    if (entry.file) {
      const filePath = path.join(docsDir, entry.file);
      const exists = fs.existsSync(filePath);
      const valid = exists && checkMdContent(filePath);
      console.log(
        `${valid ? "✅" : exists ? "⚠️" : "❌"} ${entry.title} → ${entry.file}`
      );
      hasValidEntries ||= valid;
    } else if (entry.children) {
      console.log(`📂 ${entry.title}`);
      for (const child of entry.children) {
        const filePath = path.join(docsDir, child.file);
        const exists = fs.existsSync(filePath);
        const valid = exists && checkMdContent(filePath);
        console.log(
          `  ${valid ? "✅" : exists ? "⚠️" : "❌"} ${child.title} → ${
            child.file
          }`
        );
        hasValidEntries ||= valid;
      }
    } else {
      console.log(`⚠️  Kein file oder children für: ${entry.title}`);
    }
  }

  if (!hasValidEntries) {
    console.warn(
      `⚠️  Keine gültigen Inhalte gefunden – Sidebar & Seite könnten leer sein`
    );
  }
  console.log("");
}
