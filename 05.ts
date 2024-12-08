import fs from "node:fs";

const determineCorrectOrderIfPossible = (rules: number[][], incorrectOrdering: number[]) => {
  const m = new Map<number, number[]>();
  for (const [left, right] of rules) {
    if (incorrectOrdering.includes(left) && incorrectOrdering.includes(right)) {
      m.set(left, (m.get(left) ?? []).concat(right));
    }
  }

  // 0 = not yet visited, 1 = visiting, 2 = visited
  const v = new Map<number, number>();
  const res: number[] = [];

  function visit(node: number) {
    // We're assuming cycles aren't possible, i.e there must exist a valid order.
    if (v.get(node) === 1 || v.get(node) === 2) {
      return;
    }

    v.set(node, 1);

    const children = m.get(node) ?? [];
    for (const child of children) {
      visit(child);
    }

    v.set(node, 2);
    res.push(node);
  }

  //
  for (const node of incorrectOrdering) {
    if (!v.get(node)) {
      visit(node);
    }
  }

  //

  return res;
};

const partOne = () => {
  const [rules, updates] = fs.readFileSync("./05.txt", "utf8").split("\n\n");

  const rulesList = rules.split("\n").map((line) => line.split("|"));

  return updates
    .split("\n")
    .map((line) => {
      let split = line.split(",");
      let m = new Map(split.map((v, i) => [v, i]));

      let passes = rulesList.every((rule) => {
        let [left, right] = rule;

        //
        if (!m.has(left) || !m.has(right)) {
          return true;
        }

        return m.get(left)! - m.get(right)! < 0;
      });

      if (!passes) {
        return 0;
      }

      return Number(split[Math.floor((split.length - 1) / 2)]);
    })
    .reduce((acc, v) => acc + v, 0);
};

const partTwo = () => {
  const [rules, updates] = fs.readFileSync("./05.txt", "utf8").split("\n\n");

  const rulesList = rules.split("\n").map((line) => line.split("|").map(Number));

  return updates
    .split("\n")
    .filter((line) => {
      let split = line.split(",");
      let m = new Map(split.map((v, i) => [Number(v), i]));

      let passes = rulesList.every((rule) => {
        let [left, right] = rule;
        if (!m.has(left) || !m.has(right)) {
          return true;
        }

        return m.get(left)! - m.get(right)! < 0;
      });

      return !passes;
    })
    .map((line) => {
      let split = line.split(",").map(Number);
      const order = determineCorrectOrderIfPossible(rulesList, split);
      return order[Math.floor((order.length - 1) / 2)];
    })
    .reduce((acc, v) => acc + v);
};

console.log(partOne());
console.log(partTwo());
