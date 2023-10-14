export function createAllPermutationsOf<T>(...elements: T[]): T[][] {
    if (elements.length === 0) {
        return [[]];
    }

    const permutations: T[][] = [];

    function permute(currentPermutation: any, remainingElements: any) {
        if (remainingElements.length === 0) {
            permutations.push(currentPermutation);
            return;
        }

        for (let i = 0; i < remainingElements.length; i++) {
            const element = remainingElements[i];
            const newPermutation = [...currentPermutation, element];
            const remaining = [...remainingElements.slice(0, i), ...remainingElements.slice(i + 1)];
            permute(newPermutation, remaining);
        }
    }

    permute([], elements);
    return permutations;
}
