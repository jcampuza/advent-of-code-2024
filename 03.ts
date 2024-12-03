import fs from "node:fs";

const partOne = () => {
  return fs
    .readFileSync("./03.txt", "utf8")
    .match(/mul\(\d{1,3},\d{1,3}\)/gi)
    ?.reduce((acc, match) => {
      const [one, two] = match.match(/\d{1,3}/gi)!;
      return acc + Number(one) * Number(two);
    }, 0);
};

const partTwo = () => {
  return fs
    .readFileSync("./03.txt", "utf8")
    .match(/(mul\(\d{1,3},\d{1,3}\)|(don't|do))/gi)
    ?.reduce(
      (acc, match) => {
        switch (match) {
          case "do": {
            acc.enabled = true;
            return acc;
          }
          case "don't": {
            acc.enabled = false;
            return acc;
          }
          default: {
            if (acc.enabled) {
              const [one, two] = match.match(/\d{1,3}/gi)!;
              acc.sum += Number(one) * Number(two);
            }

            return acc;
          }
        }
      },
      { enabled: true, sum: 0 }
    ).sum;
};

console.log(partOne());
console.log(partTwo());
