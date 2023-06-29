/**
 * Generates random string of given length
 *
 * @collboard-modules-sdk
 */
export function randomString(length: number, chars: string): string {
    let result = '';
    for (let i = length; i > 0; --i)
        result += chars[Math.floor(Math.random(/* <- TODO: [🐉] Probbably use seed random */) * chars.length)];
    return result;
}
