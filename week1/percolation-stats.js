const Percolation = require("./percolation");

class PercolationStats {
    constructor(n, trials) {
        this.n = Number(n);
        this.trials = Number(trials);
    }

    PercolationStats(n, trials) {
        const results = [];

        for (let i = 1; i <= trials; i++) {
            const percolationSystem = new Percolation(n);

            while (!percolationSystem.percolates()) {
                const row = Math.ceil(Math.random() * n);
                const col = Math.ceil(Math.random() * n);
                percolationSystem.open(row, col);
            }

            results.push(percolationSystem.numberOfOpenSites() / (percolationSystem.grid.id.length - 2));
        }

        this.results = results;

        return results;
    }

    mean() {
        this.mean = this.results.reduce((total, number) => (total += number), 0) / this.trials;

        return this.mean;
    }

    stddev() {
        this.stddev = Math.sqrt(this.results.reduce((acc, cv) => acc + (cv - this.mean) ** 2, 0) / (this.trials - 1));

        return this.stddev;
    }

    confidence() {
        this.confidenceLow = this.mean - (1.96 * this.stddev) / Math.sqrt(this.trials);
        this.confidenceHigh = this.mean + (1.96 * this.stddev) / Math.sqrt(this.trials);

        return [this.confidenceLow, this.confidenceHigh];
    }

    main() {
        this.PercolationStats(this.n, this.trials);
        console.log(`mean: \t ${this.mean()}`);
        console.log(`stddev: \t ${this.stddev()}`);
        console.log(`95% confidence interval: \t ${this.confidence()}`);
    }
}

if (!module.parent) {
    const [n, trials] = process.argv.slice(2);
    const ps = new PercolationStats(n, trials);
    ps.main();
}
