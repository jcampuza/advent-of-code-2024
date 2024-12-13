import fs from "node:fs";

const blink = (list: number[], count: number) => {
  let freq: Record<number, number> = {};
  for (const item of list) {
    if (!freq[item]) {
      freq[item] = 0;
    }

    freq[item] += 1;
  }

  for (let i = 0; i < count; i++) {
    let nextFreq: Record<number, number> = {};
    for (let [key, value] of Object.entries(freq)) {
      let itemAsString = `${key}`;
      if (Number(key) === 0) {
        nextFreq[1] = (nextFreq[1] ?? 0) + value;
      } else if (itemAsString.length % 2 === 0) {
        let left = +itemAsString.slice(0, itemAsString.length / 2);
        let right = +itemAsString.slice(itemAsString.length / 2);

        nextFreq[left] = (nextFreq[left] ?? 0) + value;
        nextFreq[right] = (nextFreq[right] ?? 0) + value;
      } else {
        const next = +key * 2024;
        nextFreq[next] = (nextFreq[next] ?? 0) + value;
      }
    }

    freq = nextFreq;
  }

  return Object.values(freq).reduce((acc, count) => acc + count);
};

const partOne = () => {
  let list = fs.readFileSync("./11.txt", "utf8").split(" ").map(Number);

  return blink(list, 25);
};

const partTwo = () => {
  let list = fs.readFileSync("./11.txt", "utf8").split(" ").map(Number);

  return blink(list, 75);
};

console.log(partOne());
console.log(partTwo());
