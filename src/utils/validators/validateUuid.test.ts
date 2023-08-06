import { describe, expect, it } from '@jest/globals';
import { validateUuid } from './validateUuid';

describe(`validation of UUIDs`, () => {
    it(`is valid`, () => {
        expect(validateUuid(`6c815d9e-b1b0-4768-86ef-8d8e3635984a`)).toBe(`6c815d9e-b1b0-4768-86ef-8d8e3635984a`);
        expect(validateUuid(`9de47735-e949-41f4-9819-012af1e76aeb`)).toBe(`9de47735-e949-41f4-9819-012af1e76aeb`);
        expect(validateUuid(`53b5a203-1b6a-4db2-b4df-f1ec37ce01ee`)).toBe(`53b5a203-1b6a-4db2-b4df-f1ec37ce01ee`);
        expect(validateUuid(`0f3bbeb6-19d3-42f2-9436-500b8d418c8d`)).toBe(`0f3bbeb6-19d3-42f2-9436-500b8d418c8d`);
        expect(validateUuid(`e1921419-74e7-40a7-b288-edbc4a06037a`)).toBe(`e1921419-74e7-40a7-b288-edbc4a06037a`);
        expect(validateUuid(`a4873faf-8504-40d5-a098-482b7cd5f214`)).toBe(`a4873faf-8504-40d5-a098-482b7cd5f214`);
        expect(validateUuid(`724f0e12-7390-4510-b6f5-df414f69b432`)).toBe(`724f0e12-7390-4510-b6f5-df414f69b432`);
        expect(validateUuid(`30f4d3db-60a0-4100-918e-e68bd7fe585b`)).toBe(`30f4d3db-60a0-4100-918e-e68bd7fe585b`);
        expect(validateUuid(`d132ff5f-48ab-4f32-bff0-533f761ee978`)).toBe(`d132ff5f-48ab-4f32-bff0-533f761ee978`);
        expect(validateUuid(`b4821d3c-5c73-4048-a07d-a8ff730a6d3c`)).toBe(`b4821d3c-5c73-4048-a07d-a8ff730a6d3c`);
    });

    it(`is NOT valid`, () => {
        expect(() => validateUuid(``)).toThrowError();
        expect(() => validateUuid(`1`)).toThrowError();
        expect(() => validateUuid(`1.A`)).toThrowError();
        expect(() => validateUuid(`Hello`)).toThrowError();
        expect(() => validateUuid(`d132ff5f`)).toThrowError();
        expect(() => validateUuid(`b4821d3c-5c73-4048-a07d`)).toThrowError();
        expect(() => validateUuid(`9SeSQTupmQHwuSrLi`)).toThrowError();
        expect(() => validateUuid(`wqgbh5qgkohkjhtetvh7`)).toThrowError();
        expect(() => validateUuid(`uuyrr6h4niwaqfbmlb65`)).toThrowError();
    });
});
