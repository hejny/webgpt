import { constants } from 'fs';
import { access, stat } from 'fs/promises';

export async function isFolderExisting(folderPath: string): Promise<boolean> {
    try {
        await access(folderPath, constants.R_OK);
        const fileStat = await stat(folderPath);
        return fileStat.isDirectory();
    } catch (error) {
        return false;
    }
}
