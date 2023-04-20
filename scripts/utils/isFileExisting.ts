import { constants } from 'fs';
import { access, stat } from 'fs/promises';

export async function isFileExisting(filePath: string): Promise<boolean> {
    try {
        await access(filePath, constants.R_OK);
        const fileStat = await stat(filePath);
        return fileStat.isFile();
    } catch (error) {
        return false;
    }
}
