import { createGraphEffect } from './createGraphEffect';
import { noEffect } from './noEffect';

export const allMyProjectsEffect = noEffect;
export const birdsEffect = noEffect;
export const collboardEffect = noEffect; // TODO: drawingEffect;
export const czechEventsEffect = noEffect;
export const functionsEffect = createGraphEffect({
    range: {
        min: -100,
        max: 100,
        step: 2,
    },
    plot({ t, seed }) {

        // TODO: Draw here some exponential graph

        const x = t;
        let y = Math.sin(x / 10) * 30 + Math.cos(x / 50 + seed.x / 50) * 30 + Math.sin(x / 10 + seed.y / 50) * 5;

        y = Math.min(y, 100);
        y = Math.max(y, -100);

        return { x, y };
    },
});
export const hEduEffect = noEffect; // TODO: squaresEffect;
export const librariesEffect = noEffect;
export const mapsEffect = noEffect;
export const modulesEffect = noEffect;
export const townsEffect = noEffect;
export const vrArEffect = noEffect;
export const yourProjectEffect = noEffect;

/**
 * TODO: In future this should be maybe also generated from the markdown but now it is good enough
 */
