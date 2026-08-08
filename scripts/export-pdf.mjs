import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { spawn } from "node:child_process";

const decks = [
  ["AtlasGR.html", "AtlasGR.pdf"],
  ["Total Trac.html", "Total-Trac.pdf"],
];

await mkdir("exports", { recursive: true });

for (const [source, destination] of decks) {
  const command = resolve("node_modules/decktape/decktape.js");
  const url = pathToFileURL(resolve(source)).href;
  const output = resolve("exports", destination);
  const exitCode = await new Promise((resolveExit, reject) => {
    const child = spawn(process.execPath, [command, "generic", url, output], { stdio: "inherit" });
    child.once("error", reject);
    child.once("exit", resolveExit);
  });
  if (exitCode !== 0) process.exit(exitCode ?? 1);
}
