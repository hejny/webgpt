import { describe, expect, it } from '@jest/globals';
import { generateImport } from './generateImport';

describe('generating import statements', () => {
    it('will import entity from same folder', () => {
        expect(
            generateImport({
                entityName: 'foo',
                entityPath: '/Users/me/work/some-project/src/utils/foo.ts',
                itselfPath: '/Users/me/work/some-project/src/utils/bar.ts',
                isNamedImport: false,
            }),
        ).toBe(`import foo from './foo';`);
    });

    it('will import entity from parent folder', () => {
        expect(
            generateImport({
                entityName: 'foo',
                entityPath: '/Users/me/work/some-project/src/utils/foo.ts',
                itselfPath: '/Users/me/work/some-project/src/utils/blob/blobToString.ts',
                isNamedImport: false,
            }),
        ).toBe(`import foo from '../foo';`);
    });

    it('will import entity from subfolder', () => {
        expect(
            generateImport({
                entityName: 'foo',
                entityPath: '/Users/me/work/some-project/src/utils/foo.ts',
                itselfPath: '/Users/me/work/some-project/src/main.ts',
                isNamedImport: false,
            }),
        ).toBe(`import foo from './utils/foo';`);
    });

    it('will import entity different location', () => {
        expect(
            generateImport({
                entityName: 'foo',
                entityPath: '/Users/me/work/some-project/src/utils/foo.ts',
                itselfPath: '/Users/me/work/some-project/src/model/interfaces/AppData.ts',
                isNamedImport: false,
            }),
        ).toBe(`import foo from '../../utils/foo';`);
    });

    it('can work with js/jsx/tsx files', () => {
        expect(
            generateImport({
                entityName: 'foo',
                entityPath: '/Users/me/work/some-project/src/utils/foo.js',
                itselfPath: '/Users/me/work/some-project/src/utils/bar.js',
                isNamedImport: false,
            }),
        ).toBe(`import foo from './foo';`);
        expect(
            generateImport({
                entityName: 'foo',
                entityPath: '/Users/me/work/some-project/src/utils/foo.jsx',
                itselfPath: '/Users/me/work/some-project/src/utils/bar.jsx',
                isNamedImport: false,
            }),
        ).toBe(`import foo from './foo';`);
        expect(
            generateImport({
                entityName: 'foo',
                entityPath: '/Users/me/work/some-project/src/utils/foo.tsx',
                itselfPath: '/Users/me/work/some-project/src/utils/bar.tsx',
                isNamedImport: false,
            }),
        ).toBe(`import foo from './foo';`);
    });

    it('can work with non-ts files', () => {
        expect(
            generateImport({
                entityName: 'fooImage',
                entityPath: '/Users/me/work/some-project/src/utils/foo.png',
                itselfPath: '/Users/me/work/some-project/src/utils/bar.ts',
                isNamedImport: false,
            }),
        ).toBe(`import fooImage from './foo.png';`);

        expect(
            generateImport({
                entityName: 'fooData',
                entityPath: '/Users/me/work/some-project/src/utils/foo.json',
                itselfPath: '/Users/me/work/some-project/src/utils/bar.ts',
                isNamedImport: false,
            }),
        ).toBe(`import fooData from './foo.json';`);
    });

    /*
    it('can work with windows backslash in path', () => {
        expect(
            generateImport({
                entityName: 'foo',
                entityPath: 'C:\\Users\\me\\work\\some-project\\src\\utils\\foo.ts',
                itselfPath: 'C:\\Users\\me\\work\\some-project\\src\\utils\\bar.ts',
                isNamedImport: false
            }),
        ).toBe(`import foo from './foo';`);
    });
    */
});

/**
 * TODO: Test windows and linux paths - look on commit 06dbfcdce86802a9a6099699a7445defbd86d524
 */
