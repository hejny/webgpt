import { dirname, relative } from 'path';

interface ImportOptions {
    entityName: string;
    entityPath: string;
    itselfPath: string;
    isNamedImport: boolean;
    isDebug?: boolean;
}

export function generateImport(options: ImportOptions): string {
    const { entityName, entityPath, itselfPath, isNamedImport, isDebug } = options;

    let importPath = relative(dirname(itselfPath), entityPath).replace(/\\/g, '/');

    if (!/^\.\.?\//.test(importPath)) {
        importPath = './' + importPath;
    }

    importPath = importPath.replace(/\.(ts|js)x?$/i, '');

    let importStatement = isNamedImport
        ? `import { ${entityName} } from '${importPath}';`
        : `import ${entityName} from '${importPath}';`;

    if (isDebug) {
        importStatement += `/* <- ${JSON.stringify({
            entityName,
            entityPath,
            itselfPath,
        })} */`;
    }

    return importStatement;
}

/**
 * Note: entityPath and itselfPath are intentionally same length to be nicely alignet when used
 * TODO: Also allow named imports with discriminated import
 * TODO: Use in BPE
 * TODO: Use in Collboard
 */
