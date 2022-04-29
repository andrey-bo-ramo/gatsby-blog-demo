import { useWebWorker } from "./useWebWorker";
import { getNthFibonacciNumber } from "../helpers/get-nth-fibonacci-number";

export const useFibonacci = () => {
  return useWebWorker(getNthFibonacciNumber);
};
