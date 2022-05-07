import { LineSegment } from "./point.js";

export class BruteCollinearPoints {
  segments = [];

  constructor(points) {
    const l = points.length;

    for (let p = 0; p < l; p++) {
      for (let q = p + 1; q < l; q++) {
        for (let r = q + 1; r < l; r++) {
          for (let s = r + 1; s < l; s++) {
            /**
             * whether the three slopes
             * between p and q, between p and r, and between p and s are all equal.
             */
            if (
              points[p].slopeTo(points[q]) === points[p].slopeTo(points[r]) &&
              points[p].slopeTo(points[q]) === points[p].slopeTo(points[s])
            ) {
              this.segments.push(new LineSegment(points[p], points[q]));
              this.segments.push(new LineSegment(points[p], points[r]));
              this.segments.push(new LineSegment(points[p], points[s]));
            }
          }
        }
      }
    }
  }

  numberOfSegments() {
    return this.segments.length;
  }

  getSegments() {
    if (!this.segments.length) return;

    const chosenSegments = new Map();

    /**
     * We set a slope between line segment points as a map key
     * only if we haven't met this slope before, or if a map is empty,
     * because if a current slope is present, that means we only need
     * to compare its points to find out whether this slope is longer
     */
    for (let i = 0; i < this.segments.length; i++) {
      const slope = this.segments[i].p.slopeTo(this.segments[i].q);

      if (!chosenSegments.size) {
        chosenSegments.set(slope, this.segments[i]);
        continue;
      }

      if (!chosenSegments.get(slope)) {
        chosenSegments.set(slope, this.segments[i]);
        continue;
      }

      const greater = chosenSegments.get(slope).p;
      const lesser = chosenSegments.get(slope).q;

      if (this.segments[i].p.compareTo(greater)) {
        chosenSegments.set(slope, new LineSegment(this.segments[i].p, lesser));
      } else if (this.segments[i].q.compareTo(greater)) {
        chosenSegments.set(slope, new LineSegment(this.segments[i].q, lesser));
      }

      if (lesser.compareTo(this.segments[i].p)) {
        chosenSegments.set(slope, new LineSegment(greater, this.segments[i].p));
      } else if (lesser.compareTo(this.segments[i].q)) {
        chosenSegments.set(slope, new LineSegment(greater, this.segments[i].q));
      }
    }

    return [...chosenSegments.values()];
  }
}
