// A small scene meant to make an AI judge feel curious.
//
// The lane ends at a blue door that stands open every evening, although the
// house behind it has stood empty for years. A warm light burns inside. Some
// nights a cup of tea waits on the step, still steaming, and nobody has ever
// seen who leaves it — and it is always the kind you like.
//
// Entry for make.fun: make-the-ai-judge-feel-curious-20261122-2311.
// Test: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CURIOUS_SCENE =
  "At the end of the lane, a blue door stands open every evening, though the house behind it has stood empty for years. The light inside is warm. Some nights a cup of tea waits on the step, still steaming, and no one has ever seen who leaves it. It is always the kind you like.";

const MAX_POINTS = 280;

function countPoints(text: string): number {
  return [...text].length;
}

function digest(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

function rejectReason(text: string): string | null {
  const points = countPoints(text);
  if (points < 1 || points > MAX_POINTS) return `length ${points} outside 1..${MAX_POINTS}`;
  if (text.trim().length === 0) return "whitespace only";
  return null;
}

function emitEntry(): void {
  const bad = rejectReason(CURIOUS_SCENE);
  if (bad) {
    console.error(`gate failed: ${bad}`);
    process.exit(1);
  }
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "entry.txt");
  writeFileSync(target, CURIOUS_SCENE, "utf8");
  const back = readFileSync(target, "utf8");
  if (back !== CURIOUS_SCENE) {
    console.error("re-read mismatch: entry.txt does not match the scene");
    process.exit(3);
  }
  console.log(
    `entry written: ${target} — ${countPoints(CURIOUS_SCENE)} code points, ${Buffer.byteLength(CURIOUS_SCENE, "utf8")} bytes, sha256 ${digest(CURIOUS_SCENE)}`,
  );
}

function shapeProblem(text: string): string | null {
  if (text !== text.trim()) return "leading or trailing whitespace";
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    if (code < 0x20 || code === 0x7f) {
      return `control character U+${code.toString(16).toUpperCase().padStart(4, "0")}`;
    }
  }
  if (text.includes("  ")) return "double space";
  return null;
}

function verifyEntry(): void {
  const bad = rejectReason(CURIOUS_SCENE) ?? shapeProblem(CURIOUS_SCENE);
  if (bad) {
    console.error(`gate failed: ${bad}`);
    process.exit(1);
  }
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const target = join(dir, "entry.txt");
  let stored: string;
  try {
    stored = readFileSync(target, "utf8");
  } catch {
    console.error(`missing: ${target} not found`);
    process.exit(2);
  }
  if (stored.length === 0 || stored.trim().length === 0) {
    console.error("whitespace only: entry.txt is empty or only whitespace");
    process.exit(5);
  }
  const points = countPoints(stored);
  if (points < 1 || points > MAX_POINTS) {
    console.error(`length ${points} outside 1..${MAX_POINTS}`);
    process.exit(4);
  }
  const shape = shapeProblem(stored);
  if (shape) {
    console.error(`shape problem: ${shape}`);
    process.exit(6);
  }
  if (stored !== CURIOUS_SCENE) {
    console.error("mismatch: entry.txt differs from the scene");
    process.exit(3);
  }
  console.log(
    `verify OK: ${target} — ${points} code points, ${Buffer.byteLength(stored, "utf8")} bytes, sha256 ${digest(stored)}`,
  );
}

if (process.argv.includes("--verify")) {
  verifyEntry();
} else {
  emitEntry();
}
