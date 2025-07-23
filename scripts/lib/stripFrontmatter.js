export function stripFrontmatter(content) {
  return content.replace(/^---[\s\S]*?---/, "").trim();
}
