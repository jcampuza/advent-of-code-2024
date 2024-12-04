import fs from "node:fs";

const isXMAS = (x: string, m: string, a: string, s: string) => {
  return `${x}${m}${a}${s}` === "XMAS" ? 1 : 0;
};

const partOne = () => {
  const m = fs
    .readFileSync("./04.txt", "utf8")
    .split("\n")
    .map((line) => line.split(""));

  let res = 0;

  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      // hor
      res += isXMAS(m[i]?.[j], m[i + 1]?.[j], m[i + 2]?.[j], m[i + 3]?.[j]);
      res += isXMAS(m[i]?.[j], m[i - 1]?.[j], m[i - 2]?.[j], m[i - 3]?.[j]);
      // ver
      res += isXMAS(m[i]?.[j], m[i]?.[j + 1], m[i]?.[j + 2], m[i]?.[j + 3]);
      res += isXMAS(m[i]?.[j], m[i]?.[j - 1], m[i]?.[j - 2], m[i]?.[j - 3]);
      // diag
      res += isXMAS(m[i]?.[j], m[i + 1]?.[j + 1], m[i + 2]?.[j + 2], m[i + 3]?.[j + 3]);
      res += isXMAS(m[i]?.[j], m[i + 1]?.[j - 1], m[i + 2]?.[j - 2], m[i + 3]?.[j - 3]);
      res += isXMAS(m[i]?.[j], m[i - 1]?.[j + 1], m[i - 2]?.[j + 2], m[i - 3]?.[j + 3]);
      res += isXMAS(m[i]?.[j], m[i - 1]?.[j - 1], m[i - 2]?.[j - 2], m[i - 3]?.[j - 3]);
    }
  }

  return res;
};

const partTwo = () => {
  const m = fs
    .readFileSync("./04.txt", "utf8")
    .split("\n")
    .map((line) => line.split(""));

  let res = 0;

  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      res +=
        isXMAS("X", m[i - 1]?.[j - 1], m[i]?.[j], m[i + 1]?.[j + 1]) &&
        isXMAS("X", m[i + 1]?.[j - 1], m[i]?.[j], m[i - 1]?.[j + 1]);

      res +=
        isXMAS("X", m[i + 1]?.[j - 1], m[i]?.[j], m[i - 1]?.[j + 1]) &&
        isXMAS("X", m[i + 1]?.[j + 1], m[i]?.[j], m[i - 1]?.[j - 1]);

      res +=
        isXMAS("X", m[i - 1]?.[j - 1], m[i]?.[j], m[i + 1]?.[j + 1]) &&
        isXMAS("X", m[i - 1]?.[j + 1], m[i]?.[j], m[i + 1]?.[j - 1]);

      res +=
        isXMAS("X", m[i - 1]?.[j + 1], m[i]?.[j], m[i + 1]?.[j - 1]) &&
        isXMAS("X", m[i + 1]?.[j + 1], m[i]?.[j], m[i - 1]?.[j - 1]);
    }
  }

  return res;
};

console.log(partOne());
console.log(partTwo());
