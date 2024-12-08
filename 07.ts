import fs from "node:fs";

const search = (expected: number, curr: number, inputs: number[]): boolean => {
  if (inputs.length === 0) {
    return curr === expected;
  }

  if (curr > expected) {
    return false;
  }

  return (
    // Add
    search(expected, curr + inputs[0], inputs.slice(1)) ||
    // Multiply
    search(expected, curr * inputs[0], inputs.slice(1))
  );
};

const searchWithConcat = (expected: number, curr: number, inputs: number[]): boolean => {
  if (inputs.length === 0) {
    return curr === expected;
  }

  if (curr > expected) {
    return false;
  }

  return (
    // Add
    searchWithConcat(expected, curr + inputs[0], inputs.slice(1)) ||
    // Multiply
    searchWithConcat(expected, curr * inputs[0], inputs.slice(1)) ||
    // Concat
    searchWithConcat(expected, Number(`${curr}${inputs[0]}`), inputs.slice(1))
  );
};

const partOne = () => {
  return fs
    .readFileSync("./07.txt", "utf8")
    .split("\n")
    .map((line) => {
      const [res, input] = line.split(": ");
      return [Number(res), search(Number(res), 0, input.split(" ").map(Number))] as const;
    })
    .filter((v) => v[1])
    .reduce((acc, v) => acc + v[0], 0);
};

const partTwo = () => {
  return fs
    .readFileSync("./07.txt", "utf8")
    .split("\n")
    .map((line) => {
      const [res, input] = line.split(": ");
      return [Number(res), searchWithConcat(Number(res), 0, input.split(" ").map(Number))] as const;
    })
    .filter((v) => v[1])
    .reduce((acc, v) => acc + v[0], 0);
};

console.log(partOne());
console.log(partTwo());
