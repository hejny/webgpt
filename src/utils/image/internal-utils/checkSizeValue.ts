/**
 * Checks if the provided value is a valid size value for the specified channel
 * 
 * @param channelName - The channel name to check the value for. Only 'width' or 'height' are valid values.
 * @param value - The value to check.
 * @throws {Error} When the value is not a number or NaN, or when it is not a whole number or less than 1.
 * 
 * @private
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


/**
 * TODO: [🧠][🚓] Is/which combination it better to use asserts/check, validate or is utility function?
 */