import { normalizeToKebabCase, normalizeTo_SCREAMING_CASE } from 'n12';
import { useRouter } from 'next/router';
import { spaceTrim } from 'spacetrim';
import type { TupleToUnion } from 'type-fest';
import { useSsrDetection } from './useSsrDetection';

const ROLES = ['VISITOR', 'OWNER', 'OWNER_AS_VISITOR'] as const;

/**
 * Role determines what user can do with the app and how the app behaves
 * There are 3 roles:
 * - "VISITOR" user can only view the app and won't be able to change anything or even see the controls
 * - "OWNER" user can edit the app and see the controls
 * - "OWNER_AS_VISITOR" simmilar to "VISITOR" but with tools for turning into "OWNER"
 */
export type Role = TupleToUnion<typeof ROLES>;

export const DEFAULT_ROLE: Role = 'OWNER';

/**
 * Hook for getting current role from GET params
 *
 * @returns Current role from GET params
 */
export function useRole(): Role {
    const isServerRender = useSsrDetection();
    const router = useRouter();

    if (isServerRender) {
        // Note: On server-render we don't know the role so we assume it's "VISITOR"
        //       It is also useful for bots and crawlers like GoogleBot to see the app as "VISITOR"
        return 'VISITOR';
    }

    if (typeof router.query.role !== 'string') {
        // This is a situation when there is no ?role=... in GET params
        return DEFAULT_ROLE;
    }

    const role = normalizeTo_SCREAMING_CASE(router.query.role);

    if (!ROLES.includes(role)) {
        throw new Error(
            spaceTrim(
                (block) => `
                    Invalid role in GET params "?role=${router.query.mode}"

                    You can use one of these roles:
                    ${block(ROLES.map((role) => `- "${normalizeToKebabCase(role)}"`).join('\n'))}
                `,
            ),
        );
    }

    return role as Role;
}

/**
 * TODO: Validate here the ownership + default role should be "VISITOR" OR "OWNER" according to ownership
 * TODO: !! Some way how to toggle VISITOR role from UI
 * TODO: [🧠][🍛] There is a collision between role and <a role="..." /> html attribute
 */
