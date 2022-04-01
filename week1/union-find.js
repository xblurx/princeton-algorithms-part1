class UF {
    id = [];
    size = [];
    constructor(n) {
        for (let i = 0; i < n; i++) {
            this.id[i] = i;
            this.size[i] = 1;
        }
    }

    slowUnion(p, q) {
        let pid = this.id[p];
        let qid = this.id[q];

        for (let i = 0; i <= this.id.length; i++) {
            if (this.id[i] == pid) this.id[i] = qid;
        }
    }

    root(i) {
        let start = i;
        while (this.id[start] != start) {
            start = this.id[start];
            this.id[i] = this.id[this.id[i]];
        }

        return start;
    }

    union(i, j) {
        let iRoot = this.root(i);
        let jRoot = this.root(j);

        if (this.size[jRoot] > this.size[iRoot]) {
            this.id[iRoot] = jRoot;
            this.size[jRoot] += this.size[iRoot];
        } else {
            this.id[jRoot] = iRoot;
            this.size[iRoot] += this.size[jRoot];
        }
    }

    find(i, j) {
        return this.root(i) == this.root(j);
    }

    count() {
        return this.id.reduce((acc, cv) => acc.add(this.root(cv)), new Set()).size;
    }

    print(arr) {
        let indexes = [];
        let entries = [];

        for (let [i, e] of arr.entries()) {
            indexes.push(i);
            entries.push(e);
        }

        console.log(indexes.join(" | "));
        console.log(entries.join(" | "));
    }
}

module.exports = UF;
