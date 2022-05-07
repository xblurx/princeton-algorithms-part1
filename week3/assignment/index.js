import { Point, savePlotToPng, processStdinFile } from "./point.js";
import { BruteCollinearPoints } from "./BruteCollinearPoints.js";

const args = await processStdinFile();
const points = [];

for (let { x, y } of args) {
  const point = new Point(x, y);
  points.push(point);
  point.draw();
}

const bruteCP = new BruteCollinearPoints(points);
const lines = bruteCP.getSegments();

for (let line of lines) {
  line.draw();
}
