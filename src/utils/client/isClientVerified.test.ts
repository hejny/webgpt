import { describe, expect, it } from '@jest/globals';
import { $isClientVerifiedForServer } from './isClientVerifiedForServer';
import { validateClientId } from './validateClientId';

describe('how isClientVerified works', () => {
    it('should work with foo', () => {
        expect(
            $isClientVerifiedForServer({
                clientId: validateClientId('!!!'),
            }),
        ).resolves.toBe(true);
    });

    it('should NOT work with bar', () => {
        expect(
            $isClientVerifiedForServer({
                clientId: validateClientId('!!!'),
            }),
        ).resolves.toBe(false);
    });
});

/**
 * TODO: !!! pavol+not-verified@webgpt.cz
 * TODO: !!! pavol+email-sent@webgpt.cz
 * TODO: !!! pavol+verified@webgpt.cz
 * TODO: !!! Implement
 * TODO: !!!last Annotate
 */
