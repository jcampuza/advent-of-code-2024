import fs from "node:fs";

const partOne = () => {
  const input = fs.readFileSync("./01.txt", "utf8");
  const left: number[] = [];
  const right: number[] = [];

  input
    .split("\n")
    .map((line) => line.split(/\s+/gi).map((s) => Number(s)))
    .forEach((line) => {
      left.push(line[0]);
      right.push(line[1]);
    });

  left.sort();
  right.sort();

  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    sum += Math.abs(left[i] - right[i]);
  }

  return sum;
};

const partTwo = () => {
  const input = fs.readFileSync("./01.txt", "utf8");
  const left: number[] = [];
  const rightMap = new Map<number, number>();

  input
    .split("\n")
    .map((line) => line.split(/\s+/gi).map((s) => Number(s)))
    .forEach((line) => {
      left.push(line[0]);
      rightMap.set(line[1], (rightMap.get(line[1]) ?? 0) + 1);
    });

  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    sum += left[i] * (rightMap.get(left[i]) ?? 0);
  }

  return sum;
};

console.log(partOne());
console.log(partTwo());
