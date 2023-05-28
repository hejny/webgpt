/**
 * Converts an integer to its corresponding ordinal string.
 * @param {number} number - The input integer.
 * @returns {string} The ordinal string.
 */
export function getOrderString(number: number): string {
    const mod100 = number % 100;
    const mod10 = number % 10;

    if (mod10 === 1 && mod100 !== 11) {
        return number + 'st';
    } else if (mod10 === 2 && mod100 !== 12) {
        return number + 'nd';
    } else if (mod10 === 3 && mod100 !== 13) {
        return number + 'rd';
    } else {
        return number + 'th';
    }
}
