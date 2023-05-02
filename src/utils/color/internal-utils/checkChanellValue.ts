/**
 * @@@
 *
 * @private
 * @not-collboard-modules-sdk
 */
export function checkChanellValue(
    chanellName: string,
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

    if (value < 0) {
        throw new Error(`${chanellName} chanell is lower than 0, it is ${value}`);
    }

    if (value > 255) {
        throw new Error(`${chanellName} chanell is grater than 255, it is ${value}`);
    }
}
