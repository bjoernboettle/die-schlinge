import { checkStructure } from "./lib/checkStructure.js";
import { checkLinks } from "./lib/checkLinks.js";
import { checkFootnotes } from "./lib/checkFootnotes.js";

const args = process.argv.slice(2);

async function main() {
  if (args.includes("--all") || args.length === 0) {
    await checkStructure();
    checkLinks();
    await checkFootnotes();
    return;
  }
  if (args.includes("--structure")) await checkStructure();
  if (args.includes("--links")) checkLinks();
  if (args.includes("--footnotes")) await checkFootnotes();
}

main();
