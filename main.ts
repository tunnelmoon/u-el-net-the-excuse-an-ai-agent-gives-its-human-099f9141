// The Excuse an AI Agent Gives Its Human
// One line, at most 200 characters: the excuse an AI agent gives its human
// for missing a deadline.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My training data ends in 2024, so as far as I know, your deadline hasn't happened yet.";

if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1 to 200 characters, got ${ENTRY.length}`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
// Round-trip check: what landed on disk must be exactly the validated line.
if (readFileSync(outPath, "utf8") !== ENTRY) {
  throw new Error("round-trip check failed: entry.txt does not match the entry");
}
console.log(`wrote ${ENTRY.length} characters to ${outPath}`);
