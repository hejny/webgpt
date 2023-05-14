import { isFolderExisting } from './isFolderExisting';

describe(`isFolderExisting`, () => {
    it(`exists`, () => expect(isFolderExisting(__dirname)).resolves.toEqual(true));

    it(`NOT exists`, () => expect(isFolderExisting('non-existing-file')).resolves.toEqual(false));

    it(`exists but it is a file`, () => expect(isFolderExisting(__filename)).resolves.toEqual(false));
});
