const UF = require("./union-find");

class Percolation {
    indexes = [];
    sites = [];
    openSites = 0;

    constructor(n) {
        function* getNSquareNumbers(n) {
            for (let i = 1; i <= n * n; i++) {
                yield i;
            }
        }

        this.grid = new UF(n * n + 2);
        this.top = this.grid.id[0];
        this.bottom = this.grid.id[n * n + 1];

        let numbers = getNSquareNumbers(n);

        for (let i = 1; i <= n; i++) {
            this.indexes[i] = [];
            this.sites[i] = [];
        }

        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= n; j++) {
                this.indexes[i][j] = numbers.next().value;
                this.sites[i][j] = 0;
            }
        }
    }

    getNeighbors(row, col) {
        const grid = this.grid;
        const topRow = row > 1 ? row - 1 : row;
        const rightCol = col < this.indexes.length - 1 ? col + 1 : col;
        const bottomRow = row < this.indexes.length - 1 ? row + 1 : row;
        const leftCol = col > 1 ? col - 1 : col;
        return {
            top: grid.id[this.indexes[topRow][col]],
            right: grid.id[this.indexes[row][rightCol]],
            bottom: grid.id[this.indexes[bottomRow][col]],
            left: grid.id[this.indexes[row][leftCol]],
            topRow,
            rightCol,
            bottomRow,
            leftCol,
        };
    }

    open(row, col) {
        if (!this.isOpen(row, col)) {
            const { top, right, bottom, left, topRow, rightCol, bottomRow, leftCol } = this.getNeighbors(row, col);
            const grid = this.grid;
            const site = grid.id[this.indexes[row][col]];

            this.sites[row][col] = 1;
            this.openSites += 1;

            if (row == 1) {
                if (this.isOpen(bottomRow, col)) {
                    grid.union(site, bottom);
                }

                grid.union(this.top, site);
            }

            if (bottomRow == row) {
                if (this.isOpen(topRow, col)) {
                    grid.union(site, top);
                }

                grid.union(this.bottom, site);
            }

            // percolation  case
            if (row == this.indexes.length - 1) {
                if (this.isFull(row, col)) {
                    grid.union(this.top, this.bottom);
                    return;
                }
            }

            if (this.isOpen(topRow, col)) {
                grid.union(top, site);
            }

            if (this.isOpen(row, rightCol)) {
                grid.union(right, site);
            }

            if (this.isOpen(bottomRow, col)) {
                grid.union(bottom, site);
            }

            if (this.isOpen(row, leftCol)) {
                grid.union(left, site);
            }
        }
    }

    isOpen(row, col) {
        return this.sites[row][col] == 1;
    }

    isFull(row, col) {
        // if this.grid[row][col] site have a connection to open site in a top row via a chain of neighboring open sites
        if (this.isOpen(row, col)) {
            const { top, right, bottom, left } = this.getNeighbors(row, col);
            const isLeft = this.grid.find(left, this.top);
            const isRight = this.grid.find(right, this.top);
            const isTop = this.grid.find(top, this.top);
            const isBottom = this.grid.find(bottom, this.top);

            return isLeft || isRight || isTop || isBottom;
        }
    }

    numberOfOpenSites() {
        return this.openSites;
    }

    percolates() {
        return this.grid.find(this.bottom, this.top);
    }
}

module.exports = Percolation;
