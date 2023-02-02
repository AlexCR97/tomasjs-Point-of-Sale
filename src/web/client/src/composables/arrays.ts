export function useArrays() {
  return {
    flatten<T>(a: T[][]): T[] {
      return a.reduce((accumulator, value) => accumulator.concat(value), []);
    },
  };
}
