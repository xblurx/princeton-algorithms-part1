import { Point, savePlotToPng, processStdinFile } from "./point.js";
import { BruteCollinearPoints } from "./BruteCollinearPoints.js";
import { FastCollinearPoints } from "./FastCollinearPoints.js";

const args = await processStdinFile();
const points = [];

for (let { x, y } of args) {
  const point = new Point(x, y);
  points.push(point);
  point.draw();
}

// const bruteCP = new BruteCollinearPoints(points);
const fastCP = new FastCollinearPoints(points);
const lines = fastCP.getSegments();

for (let line of lines) {
  line.draw();
}

savePlotToPng();
