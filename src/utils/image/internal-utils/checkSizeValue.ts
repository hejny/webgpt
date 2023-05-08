/**
 * @@@
 *
 * @private
 * @not-collboard-modules-sdk
 */
export function checkSizeValue(
    chanellName: 'width' | 'height',
    value: number,
): asserts value is number /* <- TODO: Some propper number_chanell type */ {
    if (typeof value !== 'number') {
        throw new Error(`${chanellName} chanell value is not number but ${typeof value}`);
    }
    if (isNaN(value)) {
        throw new Error(`${chanellName} chanell value is NaN`);
    }

    if (Math.round(value) !== value) {
        throw new Error(`${chanellName} chanell is not whole number, it is ${value}`);
    }

    if (value < 1) {
        throw new Error(`${chanellName} chanell is lower than 1, it is ${value}`);
    }
}
