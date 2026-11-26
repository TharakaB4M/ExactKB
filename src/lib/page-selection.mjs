/**
 * @param {string} value
 * @param {number} pageCount
 * @returns {number[]}
 */
export function parsePageSelection(value, pageCount) {
  const pages = new Set();
  const segments = value.split(",").map((part) => part.trim()).filter(Boolean);
  if (!segments.length) throw new Error("Enter at least one page number or range.");
  for (const segment of segments) {
    const match = /^(\d+)(?:\s*-\s*(\d+))?$/.exec(segment);
    if (!match) throw new Error("Use page numbers and ranges like 1,3-5.");
    const start = Number(match[1]);
    const end = Number(match[2] ?? match[1]);
    if (start < 1 || end < start || end > pageCount) {
      throw new Error(`Page numbers must be between 1 and ${pageCount}.`);
    }
    for (let page = start; page <= end; page += 1) pages.add(page - 1);
  }
  return [...pages].sort((a, b) => a - b);
}
