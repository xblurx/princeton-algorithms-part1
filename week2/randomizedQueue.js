class RandomizedQueue {
  queue = [];

  constructor(items = []) {
    this.queue = [...items];
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  size() {
    return this.queue.length;
  }

  enqueue(item) {
    queue.push(item);
  }

  dequeue() {
    const item = this.queue[Math.floor(Math.random() * this.queue.length)];
    if (item === null) return;
    this.queue[Math.floor(Math.random() * this.queue.length)] = null;

    return item;
  }

  sample() {
    return this.queue[Math.floor(Math.random() * this.queue.length)];
  }

  *[Symbol.iterator]() {
    let passedIndexes = new Set();

    while (passedIndexes.size !== this.queue.length) {
      const index = Math.floor(Math.random() * this.queue.length);
      const item = this.queue[index];
      if (item !== null && !passedIndexes.has(index)) yield item;
      passedIndexes.add(index);
    }
  }
}

const R = new RandomizedQueue(["A", "B", "C", "D", "E", "F", "G", "H", "I"]);

for (let i of R) console.log(i);
