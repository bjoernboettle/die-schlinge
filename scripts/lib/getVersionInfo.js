// scripts/lib/getVersionInfo.js
import semanticRelease from "semantic-release";
import { execSync } from "child_process";
import fs from "fs";

export async function getVersionInfo({
  dryRun = true,
  branchesConfig,
  isCi = false,
  env = process.env,
}) {
  function getLatestTag() {
    try {
      return execSync("git describe --tags --abbrev=0").toString().trim();
    } catch {
      return null;
    }
  }

  const result = await semanticRelease({
    dryRun,
    ci: isCi,
    branches: branchesConfig,
    plugins: [
      ["@semantic-release/commit-analyzer", { preset: "conventionalcommits" }],
      "@semantic-release/release-notes-generator",
    ],
    env,
  });

  let versionInfo;
  if (result?.nextRelease?.version) {
    versionInfo = {
      version: result.nextRelease.version,
      date: new Date().toISOString(),
      commit:
        result.nextRelease.gitHead ||
        execSync("git rev-parse HEAD").toString().trim(),
    };
    console.log(`✔ Neue Version ermittelt: ${versionInfo.version}`);
  } else if (result?.lastRelease?.version) {
    versionInfo = {
      version: result.lastRelease.version,
      date: new Date().toISOString(),
      commit:
        result.lastRelease.gitHead ||
        execSync("git rev-parse HEAD").toString().trim(),
    };
    console.log(`✔ Letzte gültige Version verwendet: ${versionInfo.version}`);
  } else {
    const latestTag = getLatestTag();
    if (latestTag && /^v\d+\.\d+\.\d+$/.test(latestTag)) {
      versionInfo = {
        version: latestTag.replace(/^v/, ""),
        date: new Date().toISOString(),
        commit: execSync("git rev-parse HEAD").toString().trim(),
      };
      console.log(
        `✔ Fallback: Letztes Git-Tag verwendet: ${versionInfo.version}`
      );
    } else {
      versionInfo = {
        version: "0.0.0",
        date: new Date().toISOString(),
        commit: execSync("git rev-parse HEAD").toString().trim(),
      };
      console.log(
        `❗️ Keine vorherige Version gefunden. Verwende Standard: ${versionInfo.version}`
      );
    }
  }
  return versionInfo;
}

export function writeVersionFile(versionInfo, filename = "version.json") {
  fs.writeFileSync(filename, JSON.stringify(versionInfo, null, 2));
}
