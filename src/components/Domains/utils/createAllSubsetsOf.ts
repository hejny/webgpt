export function createAllSubsetsOf<T>(...array: T[]): T[][] {
    if (array.length === 0) {
        return [[]];
    }

    const result: T[][] = [[]];
    for (const item of array) {
        const newResult: T[][] = [];
        for (const subset of result) {
            newResult.push([...subset, item]);
        }
        result.push(...newResult);
    }

    return result;
}
