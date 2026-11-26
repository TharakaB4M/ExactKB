import assert from "node:assert/strict";
import test from "node:test";
import { parsePageSelection } from "./page-selection.mjs";

test("parses individual pages and ranges in ascending order", () => {
  assert.deepEqual(parsePageSelection("5, 1, 3-4", 5), [0, 2, 3, 4]);
});

test("removes duplicate pages", () => {
  assert.deepEqual(parsePageSelection("1,1-3,2", 3), [0, 1, 2]);
});

test("rejects empty or malformed page selections", () => {
  assert.throws(() => parsePageSelection(" , ", 5), /at least one page/);
  assert.throws(() => parsePageSelection("1;2", 5), /page numbers and ranges/);
  assert.throws(() => parsePageSelection("3-2", 5), /between 1 and 5/);
  assert.throws(() => parsePageSelection("6", 5), /between 1 and 5/);
});
