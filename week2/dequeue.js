const assert = require("assert");

class Node {
  item = null;
  next = null;
  prev = null;
}

class Dequeue {
  first = null;
  last = null;
  size = 0;

  isEmpty() {
    return this.first === null;
  }

  getSize() {
    return this.size;
  }

  addFirst(item) {
    const oldFirst = this.first;
    this.first = new Node();
    this.first.item = item;
    this.first.next = oldFirst;

    if (oldFirst !== null) {
      oldFirst.prev = this.first;
    }

    if (this.last === null) this.last = this.first;
    this.size++;
  }

  addLast(item) {
    const oldLast = this.last;
    this.last = new Node();
    this.last.item = item;
    this.last.prev = oldLast;

    if (oldLast !== null) {
      oldLast.next = this.last;
    }

    if (this.first === null) this.first = this.last;
    this.size++;
  }

  removeFirst() {
    const item = this.first.item;
    this.first = this.first.next;

    if (this.first !== null) {
      this.first.prev = null;
    } else this.last = null;

    this.size--;

    return item;
  }

  removeLast() {
    const item = this.last.item;
    this.last = this.last.prev;

    if (this.last !== null) {
      this.last.next = null;
    } else this.first = null;

    this.size--;

    return item;
  }

  *[Symbol.iterator]() {
    let current = this.first;

    while (current) {
      yield current.item;
      current = current.next;
    }
  }
}

const D = new Dequeue();

D.addFirst(1);
D.addFirst(2);
D.addFirst(3);
D.addFirst(4);
D.addFirst(5);
assert.strictEqual(D.first.item, 5);
assert.strictEqual(D.last.item, 1);
assert.strictEqual(D.getSize(), 5);

assert.strictEqual(D.removeLast(), 1);
assert.strictEqual(D.first.item, 5);
assert.strictEqual(D.last.item, 2);
assert.strictEqual(D.getSize(), 4);

D.addLast(6);
assert.strictEqual(D.first.item, 5);
assert.strictEqual(D.last.item, 6);
assert.strictEqual(D.getSize(), 5);

D.addFirst(7);
assert.strictEqual(D.first.item, 7);
assert.strictEqual(D.last.item, 6);
assert.strictEqual(D.getSize(), 6);

assert.strictEqual(D.removeFirst(), 7);
assert.strictEqual(D.first.item, 5);
assert.strictEqual(D.last.item, 6);
assert.strictEqual(D.getSize(), 5);

D.removeFirst();
D.removeLast();
assert.strictEqual(D.first.item, 4);
assert.strictEqual(D.last.item, 2);
assert.strictEqual(D.getSize(), 3);

D.removeLast();
D.removeLast();
assert.strictEqual(D.first.item, 4);
assert.strictEqual(D.last.item, 4);
assert.strictEqual(D.getSize(), 1);

D.removeFirst();
assert.strictEqual(D.isEmpty(), true);
assert.strictEqual(D.last, null);
assert.strictEqual(D.first, null);
assert.strictEqual(D.getSize(), 0);

D.addFirst(1);
D.addLast(4);
D.removeLast();
D.removeLast();
assert.strictEqual(D.isEmpty(), true);
assert.strictEqual(D.last, null);
assert.strictEqual(D.first, null);
assert.strictEqual(D.getSize(), 0);

D.addFirst(1);
D.addLast(4);
D.removeFirst();
D.removeFirst();
assert.strictEqual(D.isEmpty(), true);
assert.strictEqual(D.last, null);
assert.strictEqual(D.first, null);
assert.strictEqual(D.getSize(), 0);
