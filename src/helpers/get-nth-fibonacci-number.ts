function getNthFibonacciNumber(n: number): number {
  return n <= 1
    ? n
    : getNthFibonacciNumber(n - 1) + getNthFibonacciNumber(n - 2);
}

export { getNthFibonacciNumber };
