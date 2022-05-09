import { LineSegment } from "./point.js";

/**
 * Used to retrieve line segments of max length.
 * @description The method should include each line segment
 * containing 4 points exactly once.
 * If 4 points appear on a line segment in the order p→q→r→s,
 * then you should include either the line segment p→s or s→p (but not both)
 * and you should not include subsegments such as p→r or q→r.
 */
export const segmentsMixin = {
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
  },
};
