class UF {
    id = [];
    size = [];
    constructor(n) {
        for (let i = 0; i < n; i++) {
            this.id[i] = i;
            this.size[i] = 1;
        }
    }

    root(start) {
        let i = start;

        /*
         * Path compression - halving path length
         * i.e i = 9; id[i] = 6; id[id[i]] = 3;
         * 9 -> 6 -> 3
         * set id[i] from its parent to grandparent
         * 9 -> 3
         * therefore shorten the path
         */
        while (i != this.id[i]) {
            this.id[i] = this.id[this.id[i]];

            // skip a parent, start again with its grandparent
            i = this.id[i];
        }

        return i;
    }

    union(i, j) {
        let iRoot = this.root(i);
        let jRoot = this.root(j);

        if (iRoot == jRoot) return;

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
