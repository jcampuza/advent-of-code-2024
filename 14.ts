import fs from "node:fs";

let WIDTH = 101;
let HEIGHT = 103;

const tp = (a: number, b: number) => {
  return a - b * Math.floor(a / b);
};

const partOne = () => {
  let robots = fs
    .readFileSync("./14.txt", "utf8")
    .split("\n")
    .map((line) => {
      const [_, p, v] = line.match(/p=([\d,-]+) v=([\d,-]+)/)!;
      const [px, py] = p.split(",").map(Number);
      const [vx, vy] = v.split(",").map(Number);

      return { p: { x: px, y: py }, v: { x: vx, y: vy } };
    });

  const simulate = (input: typeof robots) => {
    return input.map((robot) => {
      const { p, v } = robot;
      return {
        p: {
          x: tp(p.x + v.x, WIDTH),
          y: tp(p.y + v.y, HEIGHT),
        },

        v,
      };
    });
  };

  for (let i = 0; i < 100; i++) {
    robots = simulate(robots);
  }

  const res = { q1: 0, q2: 0, q3: 0, q4: 0 };
  for (let robot of robots) {
    const { p } = robot;

    if (p.x < Math.floor(WIDTH / 2) && p.y < Math.floor(HEIGHT / 2)) {
      res.q1 += 1;
    }
    if (p.x > Math.floor(WIDTH / 2) && p.y < Math.floor(HEIGHT / 2)) {
      res.q2 += 1;
    }
    if (p.x < Math.floor(WIDTH / 2) && p.y > Math.floor(HEIGHT / 2)) {
      res.q3 += 1;
    }
    if (p.x > Math.floor(WIDTH / 2) && p.y > Math.floor(HEIGHT / 2)) {
      res.q4 += 1;
    }
  }

  return res.q1 * res.q2 * res.q3 * res.q4;
};

const draw = (robots: Array<{ p: { x: number; y: number } }>, i: number) => {
  const m = Array.from({ length: HEIGHT }, (v, i) => Array.from({ length: WIDTH }, (v, i) => "."));

  for (let robot of robots) {
    m[robot.p.y][robot.p.x] = "#";
  }

  // This was the original solution, but don't wanna always write ot a huge file
  // fs.appendFileSync(`14-write.txt`, `iteration: ${i}\n`);
  // fs.appendFileSync(`14-write.txt`, m.map((line) => line.join("")).join("\n"));
  // fs.appendFileSync(`14-write.txt`, "\n");

  // This just draws it once to the console prove that iteration is the solution
  console.log(`iteration: ${i}\n`);
  console.log(m.map((line) => line.join("")).join("\n"));
};

const partTwo = () => {
  let robots = fs
    .readFileSync("./14.txt", "utf8")
    .split("\n")
    .map((line) => {
      const [_, p, v] = line.match(/p=([\d,-]+) v=([\d,-]+)/)!;
      const [px, py] = p.split(",").map(Number);
      const [vx, vy] = v.split(",").map(Number);

      return { p: { x: px, y: py }, v: { x: vx, y: vy } };
    });

  const simulate = (input: typeof robots) => {
    return input.map((robot) => {
      const { p, v } = robot;
      return {
        p: {
          x: tp(p.x + v.x, WIDTH),
          y: tp(p.y + v.y, HEIGHT),
        },
        v,
      };
    });
  };

  // The number below was found through writing to one file a bunch of times, then just cmd+f for the longest string of '#' characters.
  // In the original
  for (let i = 1; i <= 7383; i++) {
    robots = simulate(robots);
    // This was the original solution but don't want to always write to a huge file
    // draw(robots, i);
  }

  draw(robots, 7383);
};

console.log(partOne());
console.log(partTwo());
