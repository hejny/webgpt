import { $randomString } from '../randomString';
import type { string_token } from '../typeAliases';

/**
 * Generates random verification code
 */
export function $generateVerificationCode(): string_token {
    return $randomString(10, '0123456789');
}

/**
 * TODO: !!! Use common util for generateVerificationCode, generating wallpaper URI
 */
