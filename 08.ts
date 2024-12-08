import fs from "node:fs";

const isInGrid = (node: { i: number; j: number }, map: string[][]) => {
  return node.i >= 0 && node.i < map.length && node.j >= 0 && node.j < map[0].length;
};

const partOne = () => {
  const map = fs
    .readFileSync("./08.txt", "utf8")
    .split("\n")
    .map((line) => line.split(""));

  const antennaCoordMap = new Map<string, Array<{ i: number; j: number }>>();
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] !== ".") {
        const type = antennaCoordMap.get(map[i][j]) ?? [];
        antennaCoordMap.set(map[i][j], type.concat({ i, j }));
      }
    }
  }

  const antinodes = [];
  for (const [, coords] of antennaCoordMap.entries()) {
    for (let i = 0; i < coords.length; i++) {
      for (let j = i + 1; j < coords.length; j++) {
        let a = coords[i];
        let b = coords[j];

        let di = b.i - a.i;
        let dj = b.j - a.j;

        let antinodeA = { i: a.i - di, j: a.j - dj };
        let antinodeB = { i: a.i + di * 2, j: a.j + dj * 2 };

        antinodes.push(antinodeA);
        antinodes.push(antinodeB);
      }
    }
  }

  let res = 0;
  for (const node of antinodes) {
    if (isInGrid(node, map) && map[node.i][node.j] !== "#") {
      map[node.i][node.j] = "#";
      res += 1;
    }
  }

  return res;
};

const partTwo = () => {
  const map = fs
    .readFileSync("./08.txt", "utf8")
    .split("\n")
    .map((line) => line.split(""));

  const antennaCoordMap = new Map<string, Array<{ i: number; j: number }>>();
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] !== ".") {
        const type = antennaCoordMap.get(map[i][j]) ?? [];
        antennaCoordMap.set(map[i][j], type.concat({ i, j }));
      }
    }
  }

  const antinodes = [];
  for (const [, coords] of antennaCoordMap.entries()) {
    for (let i = 0; i < coords.length; i++) {
      for (let j = i + 1; j < coords.length; j++) {
        let a = coords[i];
        let b = coords[j];

        let di = b.i - a.i;
        let dj = b.j - a.j;

        // Add A and find all resonances behind A that are in the grid
        let resA = { i: a.i, j: a.j };
        do {
          antinodes.push(resA);
          resA = { i: resA.i - di, j: resA.j - dj };
        } while (isInGrid(resA, map));

        // Add B and find all resonances in front of B that are in the grid
        let resB = { i: b.i, j: b.j };
        do {
          antinodes.push(resB);
          resB = { i: resB.i + di, j: resB.j + dj };
        } while (isInGrid(resB, map));
      }
    }
  }

  let res = 0;
  for (const node of antinodes) {
    if (isInGrid(node, map) && map[node.i][node.j] !== "#") {
      map[node.i][node.j] = "#";
      res += 1;
    }
  }

  return res;
};

console.log(partOne());
console.log(partTwo());
