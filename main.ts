// Real-Life Patch Notes: The Comedy Changelog.
// One line, at most 160 characters: a software patch note for a bug in
// real life / human biology, written in the terse register of a real
// release note. Deterministic, stdlib only, no network, no randomness.
//
// The entry: the foot goes "offline" after sitting cross-legged.
// Pins and needles read as static on a dead connection, which is exactly
// how the body reports it: the limb stops answering, then comes back
// buzzing. A version number, a shipped fix, one specific recognisable bug.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "v2.6.2: fixed a bug where standing up after sitting cross-legged took the foot offline and filled it with static.";

const MAX_CHARS = 160;
const OUTPUT_PATH = process.argv[2] ?? "/output/entry.txt";

function charCount(text: string): number {
  return [...text].length;
}

const VERSION_PATTERN = /^v\d+\.\d+\.\d+: /;

function validate(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry is empty or only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (!VERSION_PATTERN.test(text)) {
    throw new Error("entry must open with a version number like v2.6.2: ");
  }
  const n = charCount(text);
  if (n < 1 || n > MAX_CHARS) {
    throw new Error(`entry is ${n} characters, must be 1 to ${MAX_CHARS}`);
  }
}

validate(LINE);
mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, LINE, "utf8");

// Read it back and confirm the file holds exactly the validated line.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== LINE) {
  throw new Error("output does not match the validated entry");
}
console.log(`wrote ${charCount(written)} characters to ${OUTPUT_PATH}`);
console.log(written);
