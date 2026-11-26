import assert from "node:assert/strict";
import test from "node:test";
import { combineFileSelection } from "./file-selection.mjs";

const limits = { maxFiles: 3, maxFileBytes: 10, maxTotalBytes: 20, multiple: true, append: true };
const file = (name, size) => ({ name, size });

test("adding files preserves existing files and their order", () => {
  const current = [file("first.pdf", 4)];
  const selected = [file("second.pdf", 5)];
  assert.deepEqual(combineFileSelection(current, selected, limits), [...current, ...selected]);
});

test("replacing a selection does not retain previous files", () => {
  const current = [file("old.pdf", 4)];
  const selected = [file("new.pdf", 5)];
  assert.deepEqual(combineFileSelection(current, selected, { ...limits, append: false }), selected);
});

test("single-file tools keep only one chosen file", () => {
  const selected = [file("first.jpg", 4), file("second.jpg", 5)];
  assert.deepEqual(combineFileSelection([], selected, { ...limits, multiple: false }), [selected[0]]);
});

test("combined selections enforce count and size limits", () => {
  assert.throws(() => combineFileSelection([file("one", 3)], [file("two", 3), file("three", 3), file("four", 3)], limits), /no more than 3/);
  assert.throws(() => combineFileSelection([], [file("large", 11)], limits), /25 MB or smaller/);
  assert.throws(() => combineFileSelection([file("one", 10)], [file("two", 10), file("three", 1)], limits), /100 MB or smaller/);
});
