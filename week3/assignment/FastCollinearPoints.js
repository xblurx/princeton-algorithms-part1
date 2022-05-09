import { segmentsMixin } from "./mixin.js";
import { LineSegment } from "./point.js";

const merge = (left, right, cb) => {
  const aux = [];

  let i = 0;
  let j = 0;
  const l = left.length + right.length;
  for (let k = i; k < l; k++) {
    if (i >= left.length) aux[k] = right[j++];
    else if (j >= right.length) aux[k] = left[i++];
    else if (cb(left[i], right[j])) aux[k] = right[j++];
    else aux[k] = left[i++];
  }

  return aux;
};

/**
 * Merge sort.
 */
const ms = (points, cb) => {
  if (points.length === 1) return points;
  else if (points.length === 2)
    return cb(points[0], points[1]) ? [points[1], points[0]] : points;

  const mid = Math.floor(points.length / 2);

  return merge(ms(points.slice(0, mid), cb), ms(points.slice(mid), cb), cb);
};

export class FastCollinearPoints {
  segments = [];

  constructor(points) {
    for (let i = 0; i < points.length; i++) {
      const origin = points[i];
      /**
       * Merge sort points accordint to the slopes
       * they make with an origin point.
       */
      const sortedPoints = ms(points, (a, b) => origin.slopeOrder(a, b));

      for (let j = 1, k = j + 1; k < sortedPoints.length; j++, k++) {
        if (
          origin.slopeTo(sortedPoints[j]) === origin.slopeTo(sortedPoints[k])
        ) {
          this.segments.push(new LineSegment(origin, sortedPoints[j]));
        }
      }
    }
  }
}

Object.assign(FastCollinearPoints.prototype, segmentsMixin);
