import "dotenv/config";
import { getVersionInfo, writeVersionFile } from "./lib/getVersionInfo.js";

const branchesConfig = [
  { name: "main" },
  { name: "develop", prerelease: "beta" },
  { name: "feature/**", prerelease: "beta" },
];

const isCI = process.env.CI === "true";

if (!process.env.GITHUB_TOKEN) {
  console.warn("⚠️  GITHUB_TOKEN nicht gesetzt – keine Releases möglich.");
}

const versionInfo = await getVersionInfo({
  dryRun: !isCI,
  branchesConfig,
  isCI,
  env: {
    ...process.env,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN || "", // leer = kein Push
  },
});

writeVersionFile(versionInfo, "version.json");
