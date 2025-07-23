// scripts/generateFooterMeta.js
import fs from "fs";
import path from "path";
import { config } from "../docs/config.js";
const version = JSON.parse(
  fs.readFileSync(path.resolve("./version.json"), "utf-8")
);

const footerMeta = {
  text: config.formatFooter(
    version.date,
    version.commit,
    version.version,
    config.author,
    config.title
  ),
};

fs.writeFileSync(
  path.resolve("./docs/.vitepress/footer-meta.json"),
  JSON.stringify(footerMeta, null, 2)
);
