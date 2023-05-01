import { createGraphEffect } from './createGraphEffect';

/**
 * Creates a graph effect that draws a circle ⁘
 * 
 * @param {Object} options - The options for the graph effect.
 * @param {Object} options.range - The range of the parameter t.
 * @param {number} options.range.min - The minimum value of t.
 * @param {number} options.range.max - The maximum value of t.
 * @param {number} options.range.step - The step size of t.
 * @returns {GraphEffect} A graph effect object that can be used to plot the circle.
 */
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
