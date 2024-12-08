import fs from "node:fs";

function serialize(pos: { x: number; y: number }, v: { x: number; y: number }): string {
  return `x:${pos.x} y:${pos.y}, vx:${v.x} vy:${v.y}`;
}

const getStart = (map: string[][]) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[j][i] === "^") {
        return { x: j, y: i };
      }
    }
  }
  throw new Error("start not found");
};

const simulate = (map: string[][], start: { x: number; y: number }) => {
  // starting vector direction
  let pos = { x: start.x, y: start.y };
  let v = { x: -1, y: 0 };

  let memory: Record<string, number> = {};

  while (pos.x >= 0 && pos.x < map.length && pos.y >= 0 && pos.y < map[0].length) {
    // Record position and direction
    let p = serialize(pos, v);
    if (memory[p] > 4) {
      // console.log("loop", serialize(pos, v), memory);
      return { loop: true, map, pos };
    }

    memory[p] = (memory[p] ?? 0) + 1;

    // Visit
    map[pos.x][pos.y] = "X";

    // is in front of obstacle?
    if (map[pos.x + v.x]?.[pos.y + v.y] === "#") {
      // rotate
      let { x, y } = v;
      v.x = y;
      v.y = -x;
    }

    // move
    pos.x += v.x;
    pos.y += v.y;
  }

  return { loop: false, map };
};

const partOne = () => {
  const map = fs
    .readFileSync("./06.txt", "utf8")
    .split("\n")
    .map((line) => line.split(""));

  let start = getStart(map);
  let result = simulate(map, start);
  return result?.map.reduce((acc, line) => acc + line.filter((i) => i === "X").length, 0);
};

const partTwo = () => {
  const map = fs
    .readFileSync("./06.txt", "utf8")
    .split("\n")
    .map((line) => line.split(""));

  let start = getStart(map);

  // walk the map once so we can get the guards path
  simulate(map, start);

  let loopAmount = 0;

  // Place obstacles at areas the guard actually walked through in the original path
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "X") {
        let clone = map.map((line) => [...line]);
        clone[i][j] = "#";

        const res = simulate(clone, start);
        if (res.loop) {
          loopAmount += 1;
        }
      }
    }
  }

  return loopAmount;
};

console.log(partOne());
console.log(partTwo());
