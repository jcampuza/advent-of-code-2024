import fs from "node:fs";

const isAscending = (row: number[]) => {
  for (let i = 0; i < row.length - 1; i++) {
    let diff = row[i + 1] - row[i];
    if (diff < 1 || diff > 3) {
      return [false, i] as const;
    }
  }

  return [true, -1] as const;
};

const isDescending = (row: number[]) => {
  for (let i = 0; i < row.length - 1; i++) {
    let diff = row[i + 1] - row[i];
    if (diff > -1 || diff < -3) {
      return [false, i] as const;
    }
  }

  return [true, -1] as const;
};

const isIncreasingOrDecreasing = (row: number[]) => {
  let [asc] = isAscending(row);
  let [desc] = isDescending(row);
  return asc || desc;
};

const isIncreasingOrDecreasingWithOneViolationAllowed = (row: number[]) => {
  let [asc, ascViolationIdx] = isAscending(row);
  let [desc, descViolationIdx] = isDescending(row);
  if (asc || desc) {
    return true;
  }

  return (
    isAscending([...row.slice(0, ascViolationIdx), ...row.slice(ascViolationIdx + 1)])[0] ||
    isAscending([...row.slice(0, ascViolationIdx + 1), ...row.slice(ascViolationIdx + 2)])[0] ||
    isDescending([...row.slice(0, descViolationIdx), ...row.slice(descViolationIdx + 1)])[0] ||
    isDescending([...row.slice(0, descViolationIdx + 1), ...row.slice(descViolationIdx + 2)])[0]
  );
};

const partOne = () => {
  return fs
    .readFileSync("./02.txt", "utf8")
    .split("\n")
    .map((line) => line.split(/\s/).map((char) => Number(char)))
    .map(isIncreasingOrDecreasing)
    .reduce((acc, item) => acc + (item ? 1 : 0), 0);
};

const partTwo = () => {
  return fs
    .readFileSync("./02.txt", "utf8")
    .split("\n")
    .map((line) => line.split(/\s/).map((char) => Number(char)))
    .map(isIncreasingOrDecreasingWithOneViolationAllowed)
    .reduce((acc, item) => acc + (item ? 1 : 0), 0);
};

console.log(partOne());
console.log(partTwo());
