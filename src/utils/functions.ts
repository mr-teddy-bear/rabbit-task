import { AlgoritmicalItem } from "./interfaces";

export function binarySearchForId(
  items: AlgoritmicalItem[],
  minId: number
): number {
  let low = 0;
  let high = items.length - 1;
  let result = items.length;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (items[mid].id > minId) {
      result = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return result;
}

export function buildLPS(pattern: string): number[] {
  const lps = new Array(pattern.length).fill(0);
  let len = 0;
  let i = 1;
  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  return lps;
}

export function kmpSearch(text: string, pattern: string): boolean {
  if (pattern === "") return true;
  const lps = buildLPS(pattern);
  let i = 0;
  let j = 0;
  while (i < text.length) {
    if (pattern[j] === text[i]) {
      i++;
      j++;
      if (j === pattern.length) return true;
    } else {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }
  return false;
}
