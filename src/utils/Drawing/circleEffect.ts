import { createGraphEffect } from './createGraphEffect';

export const circleEffect = createGraphEffect({
    range: {
        min: -Math.PI,
        max: Math.PI,
        step: 0.1,
        /*
        TODO:
        min: -Math.PI,
        max: Math.PI,
        step: Math.PI / 100,
        */
    },
    plot({ t, seed }) {
        const x = Math.cos(t) * 30; //* Math.cos(seed.x / 10);
        const y = Math.sin(t) * 30; //* Math.cos(seed.x / 10);
        return { x, y };
    },
});
