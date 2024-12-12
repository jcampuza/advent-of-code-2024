import fs from "node:fs";

const getTrailheads = (m: number[][]) => {
  let zeros: Array<{ i: number; j: number }> = [];
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      if (m[i][j] === 0) {
        zeros.push({ i, j });
      }
    }
  }

  return zeros;
};

const getNumberOfValidTrails = (
  m: number[][],
  node: { i: number; j: number },
  prev: { i: number; j: number } | null = null,
  trailendsReached: Set<string> = new Set()
) => {
  let nodeValue = m[node.i]?.[node.j];
  if (nodeValue == null) {
    return trailendsReached;
  }

  if (prev && m[node.i][node.j] - m[prev.i][prev.j] !== 1) {
    return trailendsReached;
  }

  if (m[node.i][node.j] === 9) {
    return trailendsReached.add(`${node.i},${node.j}`);
  }

  getNumberOfValidTrails(m, { i: node.i, j: node.j - 1 }, node, trailendsReached);
  getNumberOfValidTrails(m, { i: node.i, j: node.j + 1 }, node, trailendsReached);
  getNumberOfValidTrails(m, { i: node.i - 1, j: node.j }, node, trailendsReached);
  getNumberOfValidTrails(m, { i: node.i + 1, j: node.j }, node, trailendsReached);

  return trailendsReached;
};

const getNumberOfValidPaths = (
  m: number[][],
  node: { i: number; j: number },
  prev: { i: number; j: number } | null = null
): number => {
  let nodeValue = m[node.i]?.[node.j];
  if (nodeValue == null) {
    return 0;
  }

  if (prev && nodeValue - m[prev.i][prev.j] !== 1) {
    return 0;
  }

  if (m[node.i][node.j] === 9) {
    return 1;
  }

  return (
    getNumberOfValidPaths(m, { i: node.i, j: node.j - 1 }, node) +
    getNumberOfValidPaths(m, { i: node.i, j: node.j + 1 }, node) +
    getNumberOfValidPaths(m, { i: node.i - 1, j: node.j }, node) +
    getNumberOfValidPaths(m, { i: node.i + 1, j: node.j }, node)
  );
};

const partOne = () => {
  let m = fs
    .readFileSync("10.txt", "utf8")
    .split("\n")
    .map((line) => line.split("").map(Number));

  return getTrailheads(m).reduce((acc, zero) => acc + getNumberOfValidTrails(m, zero).size, 0);
};

const partTwo = () => {
  let m = fs
    .readFileSync("10.txt", "utf8")
    .split("\n")
    .map((line) => line.split("").map(Number));

  return getTrailheads(m).reduce((acc, zero) => acc + getNumberOfValidPaths(m, zero), 0);
};

console.log(partOne());
console.log(partTwo());
