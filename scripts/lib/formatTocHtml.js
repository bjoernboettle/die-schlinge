export function formatTocHtml(title, chapters) {
  return `
    <div class="toc">
      <h1 class="toc-title">${title}</h1>
      <ul class="toc-list">
        ${chapters
          .map(
            ({ title, anchor, level }) => `
          <li class="toc-entry level-${level}">
            <span class="section"><a href="#${anchor}">${title}</a></span>
            <span class="page">&nbsp;</span>
          </li>`
          )
          .join("\n")}
      </ul>
    </div>`;
}
