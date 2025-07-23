export function slugify(str) {
  return str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[\u00e4]/g, "ae")
    .replace(/[\u00f6]/g, "oe")
    .replace(/[\u00fc]/g, "ue")
    .replace(/[\u00df]/g, "ss")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}
