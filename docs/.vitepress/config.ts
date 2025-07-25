import { defineConfig } from "vitepress";
import fs from "fs";
import path from "path";

// Falls du weiterhin eine config.js verwendest (optional)
import { config } from "../config.js";

const versionPath = path.resolve(__dirname, "../../version.json");
const versionData = JSON.parse(fs.readFileSync(versionPath, "utf-8"));

function toSidebar(structure) {
  return structure
    .map((e) => {
      if (e.children) {
        const items = e.children
          .filter(
            (c) =>
              c?.file && fs.existsSync(path.resolve(__dirname, "..", c.file))
          )
          .map((c) => ({
            text: c.title,
            link: `/${c.file.replace(/\.md$/, "")}`,
          }));
        return items.length ? { text: e.title, collapsed: true, items } : null;
      } else if (
        e?.file &&
        e.file !== "index.md" &&
        fs.existsSync(path.resolve(__dirname, "..", e.file))
      ) {
        return {
          text: e.title,
          link: `/${e.file.replace(/\.md$/, "")}`,
        };
      }
      return null;
    })
    .filter(Boolean);
}

function toNav(structure, pdfPrefix) {
  const items = structure
    .filter((e) => !e.webOnly)
    .map((e) => {
      if (e.children && e.children.length > 0) {
        const firstChild = e.children[0];
        if (
          firstChild.file &&
          fs.existsSync(path.resolve(__dirname, "..", firstChild.file))
        ) {
          const dir = firstChild.file.split("/")[0];
          return {
            text: e.title,
            link: `/${firstChild.file.replace(/\.md$/, "")}`,
            activeMatch: `/${dir}/`,
          };
        }
      } else if (
        e?.file &&
        e.file !== "index.md" &&
        fs.existsSync(path.resolve(__dirname, "..", e.file))
      ) {
        const match = `/${e.file.replace(/\.md$/, "")}`;
        return {
          text: e.title,
          link: match,
          activeMatch: match,
        };
      }
      return null;
    })
    .filter(Boolean);

  return [
    {
      text: "Dossier",
      items,
    },
    {
      text: "Download PDF",
      link: "https://3YYxRo.short.gy/KTY7KG",
      target: "_blank",
    },
    {
      text: "Download E-Book",
      link: `https://3YYxRo.short.gy/jLGVYp`,
      target: "_blank",
    },
  ];
}

export default defineConfig({
  base: "/die-schlinge/",
  cleanUrls: true,
  lang: "de-DE",
  title: config.title,
  description: config.subtitle,
  lastUpdated: true,
  themeConfig: {
    nav: toNav(config.bookStructure, config.pdfPrefix),
    sidebar: toSidebar(config.bookStructure),
    footer: {
      message: config.formatFooter(
        versionData.date,
        versionData.commit,
        versionData.version,
        config.author,
        config.title
      ),
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/bjoernboettle/die-schlinge" },
    ],
    search: {
      provider: "local",
    },
  },
  markdown: {
    async config(md) {
      const footnote = await import("markdown-it-footnote");
      md.use(footnote.default);
    },
  },
});
