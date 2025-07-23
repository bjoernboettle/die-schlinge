import fs from "fs";
import path from "path";

export function fixImgSrc(content, docPath, docsDir = "./docs", embed = true) {
  const baseDir = path.dirname(path.resolve(docPath));

  function resolveImagePath(src) {
    if (/^(https?:)?\/\//.test(src)) return null;
    if (src.startsWith("/")) {
      return path.join(docsDir, "public", src.replace(/^\/+/, ""));
    } else {
      return path.resolve(baseDir, src);
    }
  }

  // <img src="...">
  content = content.replace(/<img\s+[^>]*src="([^"]+)"[^>]*>/g, (m, src) => {
    const abs = resolveImagePath(src);
    if (!abs || !fs.existsSync(abs)) return m;
    if (!embed) return m.replace(src, `file://${abs}`);
    const ext = path.extname(abs).substring(1).toLowerCase();
    const mime = ext === "svg" ? "svg+xml" : ext;
    const data = fs.readFileSync(abs).toString("base64");
    return m.replace(src, `data:image/${mime};base64,${data}`);
  });
  // CSS url(...)
  content = content.replace(/url\(["']?(.*?)["']?\)/g, (m, src) => {
    const abs = resolveImagePath(src);
    if (!abs || !fs.existsSync(abs)) return m;
    if (!embed) return m.replace(src, `file://${abs}`);
    const ext = path.extname(abs).substring(1).toLowerCase();
    const mime = ext === "svg" ? "svg+xml" : ext;
    const data = fs.readFileSync(abs).toString("base64");
    return `url("data:image/${mime};base64,${data}")`;
  });
  // Markdown Images ![]()
  content = content.replace(/!\[[^\]]*\]\(([^)]+)\)/g, (m, src) => {
    if (src.startsWith("data:")) {
      return m;
    }
    const abs = resolveImagePath(src);
    if (!abs || !fs.existsSync(abs)) return m;
    if (!embed) return m.replace(src, `file://${abs}`);
    const ext = path.extname(abs).substring(1).toLowerCase();
    const mime = ext === "svg" ? "svg+xml" : ext;
    const data = fs.readFileSync(abs).toString("base64");
    return m.replace(src, `data:image/${mime};base64,${data}`);
  });

  return content;
}
