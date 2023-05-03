import {} from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { execCommand } from './execCommand/execCommand';

export async function organizeImports(fileContents: string): Promise<string> {
    const tmpFilePathRelative = '.tmp/file-to-import-organize.ts';
    const tmpFilePath = join(process.cwd(), tmpFilePathRelative);

    await writeFile(tmpFilePath, fileContents, 'utf8');

    await execCommand({
        command: `npx organize-imports-cli ${tmpFilePathRelative}`,
        crashOnError: true,
        cwd: process.cwd(),
    });

    return await readFile(tmpFilePath, 'utf8');
}
