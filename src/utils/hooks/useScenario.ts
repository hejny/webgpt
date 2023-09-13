import { normalizeToKebabCase, normalizeTo_SCREAMING_CASE } from 'n12';
import { useRouter } from 'next/router';
import spaceTrim from 'spacetrim';
import { TupleToUnion } from 'type-fest';
import { useSsrDetection } from './useSsrDetection';

const SCENARIOS = ['FROM_SOMETHING', 'GALLERY'] as const;

/**
 * Scenario determines what how the app behaves when user goes through it
 * There are several scenarios:
 * - "FROM" user is creating new wallpaper from something (image, text, video, etc.) so will not be distracted by other wallpapers
 * - "GALLERY" user is browsing through the gallery of wallpapers so will be able to see other wallpapers and react to them
 */
export type Scenario = TupleToUnion<typeof SCENARIOS>;

export const DEFAULT_SCENARIO: Scenario = 'FROM_SOMETHING';

/**
 * Hook for getting current scenario from GET params
 *
 * @returns Current scenario from GET params
 */
export function useScenario(): Scenario {
    const isServerRender = useSsrDetection();
    const router = useRouter();

    if (isServerRender) {
        return DEFAULT_SCENARIO;
    }

    if (typeof router.query.scenario !== 'string') {
        // This is a situation when there is no ?scenario=... in GET params
        return DEFAULT_SCENARIO;
    }

    const scenario = normalizeTo_SCREAMING_CASE(router.query.scenario);

    if (!SCENARIOS.includes(scenario)) {
        throw new Error(
            spaceTrim(
                (block) => `
                    Invalid scenario in GET params "?scenario=${router.query.mode}"

                    You can use one of these scenarios:
                    ${block(SCENARIOS.map((scenario) => `- "${normalizeToKebabCase(scenario)}"`).join('\n'))}
                `,
            ),
        );
    }

    return scenario as Scenario;
}

/**
 * TODO: Validate here the ownership
 */
