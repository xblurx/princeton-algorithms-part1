const RandomizedQueue = require("./randomizedQueue");

class Permutation {
  constructor(n, items) {
    this.n = n;
    this.rq = new RandomizedQueue(items);
  }

  static main() {
    for (let i = 0; i < this.n; i++) {
      console.log(this.rq.sample());
    }
  }
}

if (!module.parent) {
  const [n, ...args] = process.argv.slice(2);
  const rq = new Permutation(n, args);
  ps.main();
}
