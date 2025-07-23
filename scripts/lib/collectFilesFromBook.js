import fs from "fs";
import path from "path";
import { slugify } from "./slugify.js";

export function collectFilesFromBook(
  bookStructure,
  docsDir,
  level = 0,
  parentTitles = []
) {
  const list = [];
  for (const item of bookStructure) {
    const currentTitles = [...parentTitles, item.title];
    const hasChildren =
      Array.isArray(item.children) && item.children.length > 0;
    let indexEntry = null;
    if (hasChildren) {
      const index = item.children.find(
        (c) => c.file && /^00_.*\.md$/.test(path.basename(c.file))
      );
      if (index) {
        const indexPath = path.join(docsDir, index.file);
        if (fs.existsSync(indexPath)) {
          indexEntry = {
            title: item.title,
            fullPath: indexPath,
            fullTitle: currentTitles.join(" → "),
            anchor: currentTitles.map(slugify).join("--"),
            level,
          };
        }
      }
    }
    if (item.file && (item.webOnly === undefined || item.webOnly === false)) {
      const fullPath = path.join(docsDir, item.file);
      if (fs.existsSync(fullPath)) {
        list.push({
          title: item.title,
          fullPath,
          fullTitle: currentTitles.join(" → "),
          anchor: currentTitles.map(slugify).join("--"),
          level,
        });
      }
    } else if (indexEntry) {
      list.push(indexEntry);
    }
    if (hasChildren) {
      const filteredChildren = item.children.filter(
        (c) => !c.file || !/^00_.*\.md$/.test(path.basename(c.file))
      );
      for (const child of filteredChildren) {
        const childTitles = [...currentTitles, child.title];
        const fullPath = path.join(docsDir, child.file);
        if (fs.existsSync(fullPath)) {
          list.push({
            title: child.title,
            fullPath,
            fullTitle: childTitles.join(" → "),
            anchor: childTitles.map(slugify).join("--"),
            level: level + 1,
          });
        }
      }
    }
  }
  return list;
}
