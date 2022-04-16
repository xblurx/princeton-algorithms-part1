class Node {
  item = null;
  next = null;
}

class LinkedListStack {
  head = null;

  isEmpty() {
    return this.head === null;
  }

  push(item) {
    const oldHead = this.head;
    this.head = new Node();
    this.head.item = item;
    this.head.next = oldHead;
  }

  pop() {
    if (this.isEmpty()) return;

    const item = this.head.item;
    this.head = this.head.next;

    return item;
  }

  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current.item;
      current = current.next;
    }
  }
}

class MaxLinkedList {
  items = new LinkedListStack();
  max = new LinkedListStack();

  push(item) {
    if (this.max.isEmpty() || item > this.max.head.item) this.max.push(item);
    this.items.push(item);
  }

  getMax() {
    return this.max.head.item;
  }

  pop() {
    let item = this.items.pop();
    if (item === this.max.head.item) this.max.pop();
  }
}

class TwoStacksQueue {
  stack = new LinkedListStack();
  reversedStack = new LinkedListStack();

  isEmpty() {
    return this.stack.isEmpty() && this.reversedStack.isEmpty()
  }

  enqueue(item) {
    this.stack.push(item);
  }

  /*
   * We get O(1) amortized complexity of dequeue
   * because stack Linked List is going to be emptied and reversed only if we get to the point
   * when the reversed Linked List is empty
   */
  dequeue() {
    if (this.isEmpty()) return;

    if (this.reversedStack.isEmpty()) {
      while (this.stack.head) {
        this.reversedStack.push(this.stack.pop());
      }
    }

    return this.reversedStack.pop();
  }

  *[Symbol.iterator]() {
    let current = this.stack.isEmpty()
      ? this.reversedStack.head
      : this.stack.head;

    while (current) {
      yield current.item;
      current = current.next;
    }
  }
}

const Q = new TwoStacksQueue();
Q.enqueue(1);
Q.enqueue(2);
Q.enqueue(3);
Q.enqueue(4);
Q.enqueue(5);
Q.enqueue(6);
Q.enqueue(7);

const firstDequeue = Q.dequeue();
console.assert(firstDequeue === 1, `expected 1, got ${firstDequeue}` )

const secondDequeue = Q.dequeue();
console.assert(secondDequeue === 2, `expected 2, got ${secondDequeue}` )
