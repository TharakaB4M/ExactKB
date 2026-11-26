/**
 * @template {{ size: number }} T
 * @param {T[]} current
 * @param {T[]} selected
 * @param {{ append: boolean; multiple: boolean; maxFiles: number; maxFileBytes: number; maxTotalBytes: number }} limits
 * @returns {T[]}
 */
export function combineFileSelection(current, selected, limits) {
  const files = limits.append && limits.multiple
    ? [...current, ...selected]
    : limits.multiple
      ? [...selected]
      : selected.slice(0, 1);

  if (files.some((file) => file.size > limits.maxFileBytes)) {
    throw new Error("Each file must be 25 MB or smaller to help keep browser memory use manageable.");
  }
  if (files.length > limits.maxFiles) {
    throw new Error(`Choose no more than ${limits.maxFiles} files at a time.`);
  }
  if (files.reduce((total, file) => total + file.size, 0) > limits.maxTotalBytes) {
    throw new Error("The selected files together must be 100 MB or smaller.");
  }
  return files;
}
