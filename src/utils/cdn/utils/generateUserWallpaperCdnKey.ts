import hexEncoder from 'crypto-js/enc-hex';
import sha256 from 'crypto-js/sha256';
import { string_uri } from '../../typeAliases';
import { nameToSubfolderPath } from './nameToSubfolderPath';

/**
 * Generates a path for the user content
 *
 */

export function generateUserWallpaperCdnKey(wallpaperImage: Buffer): string_uri {
    const hash = sha256(hexEncoder.parse(wallpaperImage.toString('hex'))).toString(/* hex */);
    return `user/${nameToSubfolderPath(hash).join('/')}/${hash}`;
}

/**
 * TODO: Way how to garbage unused uploaded files
 * TODO: Probably saparate util countBufferHash
 */
