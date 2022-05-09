import pkg from "canvas";
import * as fs from "fs";
import * as readline from "node:readline";
import * as path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname } from "path";

const { createCanvas, loadImage } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const WIDTH = 327;
const canvas = createCanvas(WIDTH, WIDTH);
const ctx = canvas.getContext("2d");

ctx.font = "10px serif";
ctx.strokeStyle = "blue";
ctx.fillStyle = "rgba(1,1,1,1)";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "white";

export class Point {
  constructor(x, y) {
    this.x = Number(x);
    this.y = WIDTH - Number(y);
  }

  draw() {
    ctx.fillRect(this.x, this.y, 3, 3);
  }

  drawTo(that) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(that.x, that.y);
    ctx.stroke();
  }

  /**
   * Returns true if this point is greater than that one being compared to, otherwise returns false.
   */
  compareTo(that) {
    return this.y >= that.y && this.x > that.x;
  }

  slopeTo(that) {
    // if the line is degenerate (line between a point and itself) or vertical
    if (this.x == that.x) {
      return this.y == that.y ? -Infinity : +Infinity;
    }
    // if line is horizontal
    else if (this.y == that.y) return 0;

    return (that.y - this.y) / (that.x - this.x);
  }

  /**
   * Returns whether first point is greater than second point by the slopes they make
   * with the invoking point.
   */
  slopeOrder(first, second) {
    return this.slopeTo(first) > this.slopeTo(second);
  }
}

export class LineSegment {
  constructor(p, q) {
    this.p = p;
    this.q = q;
  }

  draw() {
    this.p.drawTo(this.q);
  }
}

LineSegment.prototype.toString = function () {
  const calcY = (y) => (WIDTH - y >= 0 ? WIDTH - y : y - WIDTH);
  return `
    LineSegment {
        p: Point { x: ${this.p.x}, y: ${calcY(this.p.y)} },
        q: Point { x: ${this.q.x}, y: ${calcY(this.q.y)} }
      }
 `;
};

/**
 * read a file argument with coordinates from input
 */
export const processStdinFile = async () => {
  const fileStream = fs.createReadStream(process.argv[2]);
  const rl = readline.createInterface({
    input: fileStream,
  });
  const args = [];

  for await (const line of rl) {
    const [x, y] = line.split(" ");
    args.push({ x, y });
  }

  return args;
};

export const savePlotToPng = () => {
  canvas
    .createPNGStream({ backgroundIndex: 1 })
    .pipe(fs.createWriteStream(path.join(__dirname, "plot.png")));
};
