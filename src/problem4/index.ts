// Problem 4 - Three ways to sum to n

// Solution 1 - using a for loop
const sum_to_n_a = (n: number): number => {
    let total = 0;
    for (let i = 1; i <= n; i++) {
        total += i;
    }
    return total;
};

// Solution 2 - using math formula
const sum_to_n_b = (n: number): number => {
    return n * (n + 1) / 2;
};

// Solution 3 - using recursion
function sum_to_n_c(n: number): number {
    if (n <= 1) {
        return n;
    }
    return n + sum_to_n_c(n - 1);
}
