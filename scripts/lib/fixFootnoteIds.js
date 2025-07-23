export function fixFootnoteIds(html, prefix) {
  return html
    .replace(/(id="fn)(\d+)/g, `$1-${prefix}-$2`)
    .replace(/(href="#fn)(\d+)/g, `$1-${prefix}-$2`)
    .replace(/(id="fnref)(\d+)/g, `$1-${prefix}-$2`)
    .replace(/(href="#fnref)(\d+)/g, `$1-${prefix}-$2`);
}
