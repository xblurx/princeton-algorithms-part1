import { segmentsMixin } from "./mixin.js";
import { LineSegment } from "./point.js";

export class BruteCollinearPoints {
  segments = [];

  constructor(points) {
    const l = points.length;

    for (let a = 0; a < l - 3; a++) {
      const ptA = points[a];

      for (let b = a + 1; b < l - 2; b++) {
        const ptB = points[b];
        const slopeAB = ptA.slopeTo(ptB);

        for (let c = b + 1; c < l - 1; c++) {
          const ptC = points[c];
          const slopeAC = ptA.slopeTo(ptC);

          if (slopeAB === slopeAC) {
            for (let d = c + 1; d < l; d++) {
              const ptD = points[d];
              const slopeAD = ptA.slopeTo(ptD);

              /**
               * whether the three slopes
               * between a and b, between b and c, and between c and d are all equal.
               */
              if (slopeAC == slopeAD) {
                this.segments.push(new LineSegment(points[a], points[b]));
                this.segments.push(new LineSegment(points[a], points[c]));
                this.segments.push(new LineSegment(points[a], points[d]));
              }
            }
          }
        }
      }
    }
  }

  numberOfSegments() {
    return this.segments.length;
  }
}

Object.assign(BruteCollinearPoints.prototype, segmentsMixin);
