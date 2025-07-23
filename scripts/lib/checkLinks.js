import fs from "fs";
import path from "path";
import { findMarkdownFiles } from "./findMarkdownFiles.js";

export function checkLinks(docsDir = "./docs") {
  const allMarkdownFiles = findMarkdownFiles(docsDir);

  for (const filePath of allMarkdownFiles) {
    const content = fs.readFileSync(filePath, "utf8");
    const links = [...content.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1]);

    for (const link of links) {
      if (
        link.startsWith("http") ||
        link.startsWith("#") ||
        link.startsWith("mailto:")
      )
        continue;

      const base = path.dirname(filePath);
      const cleaned = link.replace(/[#?].*$/, "");
      const candidates = [
        path.join(base, cleaned),
        path.join(base, cleaned + ".md"),
        path.join(base, cleaned, "index.md"),
      ];

      const exists = candidates.some((p) => fs.existsSync(p));
      if (!exists) {
        console.warn(`❌ Dead link in ${filePath} → (${link})`);
      }
    }
  }
}
