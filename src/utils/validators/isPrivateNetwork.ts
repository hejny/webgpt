import { string_hostname } from '../typeAliases';

/**
 * Checks if an IP address or hostname is reserved for private networks or localhost.
 *
 * @param {string} ipAddress - The IP address to check.
 * @returns {boolean} Returns true if the IP address is reserved for private networks or localhost, otherwise false.
 */
export function isPrivateNetwork(hostname: string_hostname): boolean {
    if (hostname === 'localhost' || hostname.endsWith('.localhost') || hostname === '127.0.0.1' || hostname === '::1') {
        return true;
    }
    if (hostname.includes(':')) {
        // IPv6
        const ipParts = hostname.split(':');
        return ipParts[0] === 'fc00' || ipParts[0] === 'fd00' || ipParts[0] === 'fe80';
    } else {
        // IPv4
        const ipParts = hostname.split('.').map((part) => parseInt(part, 10));
        return (
            ipParts[0] === 10 ||
            (ipParts[0] === 172 && ipParts[1] >= 16 && ipParts[1] <= 31) ||
            (ipParts[0] === 192 && ipParts[1] === 168)
        );
    }
}
