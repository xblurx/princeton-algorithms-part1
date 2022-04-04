const UF = require("./union-find");

class Percolation {
    sites = [];
    openSites = 0;

    constructor(n) {
        this.gridWidth = n;
        this.grid = new UF(n * n + 2);
        this.virtualTop = this.grid.id[0];
        this.virtualBottom = this.grid.id[n * n + 1];

        for (let i = 1; i <= n; i++) {
            this.sites[i] = [];
            for (let j = 1; j <= n; j++) {
                this.sites[i][j] = false;
            }
        }
    }

    map2dIndexTo1d(row, col) {
        return (row - 1) * this.gridWidth + col;
    }

    getNeighbors(row, col) {
        const grid = this.grid;
        const topRow = row > 1 ? row - 1 : row;
        const rightCol = col < this.gridWidth ? col + 1 : col;
        const bottomRow = row < this.gridWidth ? row + 1 : row;
        const leftCol = col > 1 ? col - 1 : col;

        return {
            top: grid.id[this.map2dIndexTo1d(topRow, col)],
            right: grid.id[this.map2dIndexTo1d(row, rightCol)],
            bottom: grid.id[this.map2dIndexTo1d(bottomRow, col)],
            left: grid.id[this.map2dIndexTo1d(row, leftCol)],
            topRow,
            rightCol,
            bottomRow,
            leftCol,
        };
    }

    open(row, col) {
        if (this.isOpen(row, col)) return;

        const { top, right, bottom, left, topRow, rightCol, bottomRow, leftCol } = this.getNeighbors(row, col);
        const grid = this.grid;
        const site = grid.id[this.map2dIndexTo1d(row, col)];

        this.sites[row][col] = true;
        this.openSites += 1;

        if (topRow == row) {
            grid.union(this.virtualTop, site);
        }

        if (bottomRow == row) {
            if (this.isFull(row, col)) {
                grid.union(this.virtualTop, this.virtualBottom);
                return;
            }

            grid.union(this.virtualBottom, site);
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

    isOpen(row, col) {
        return this.sites[row][col];
    }

    isFull(row, col) {
        // if this.grid[row][col] site have a connection to open site in a top row via a chain of neighboring open sites
        if (!this.isOpen(row, col)) return;

        const { top, right, bottom, left } = this.getNeighbors(row, col);
        const isLeft = this.grid.find(left, this.virtualTop);
        const isRight = this.grid.find(right, this.virtualTop);
        const isTop = this.grid.find(top, this.virtualTop);
        const isBottom = this.grid.find(bottom, this.virtualTop);

        return isLeft || isRight || isTop || isBottom;
    }

    numberOfOpenSites() {
        return this.openSites;
    }

    percolates() {
        return this.grid.find(this.virtualBottom, this.virtualTop);
    }
}

module.exports = Percolation;
