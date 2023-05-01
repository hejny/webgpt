import { Registration } from 'destroyable';
import { forTime } from 'waitasecond';
import { IVector, Vector } from 'xyzt';
import { Drawing } from './Drawing';
import { Effect } from './effect';

/**
 * An interface for defining options for a graph effect ⁘
 * 
 * @interface
 * @property {Object} range - The range of the input parameter t.
 * @property {number} range.min - The minimum value of t.
 * @property {number} range.max - The maximum value of t.
 * @property {number} range.step - The increment of t.
 * @property {Function} plot - A function that takes an input object and returns a vector.
 */
interface GraphEffectOptions {
    range: { min: number; max: number; step: number };
    plot(input: { t: number; seed: Vector }): IVector;
}

/**
 * A function that creates a graph effect for a given HTML element ⁘
 * 
 * @param {GraphEffectOptions} formula - The options for the graph effect.
 * @returns {Effect<TElement>} - A function that takes an HTML element and returns a registration object.
 */
export function createGraphEffect<TElement extends HTMLElement>(formula: GraphEffectOptions): Effect<TElement> {
    return (element: TElement) => {
        return Registration.create(
            async (
                {
                    /* TODO: LIB: destroyable @@addSubdestroyable */
                },
            ) => {
                await forTime(1000);

                // TODO: await forDocumentReady();
                //  console.log(element.getBoundingClientRect());
                let origin: Vector;

                function resize() {
                    origin = Vector.fromObject(window, ['pageXOffset', 'pageYOffset'])
                        .add(Vector.fromObject(element.getBoundingClientRect(), ['x', 'y']))
                        .add(Vector.fromObject(element.getBoundingClientRect(), ['width', 'height']).half());
                }

                resize();

                let drawing = new Drawing(element);

                /*
                drawing
                    .addPoint(origin)
                    .addPoint(origin.add({ x: 5, y: 5 }))
                    .addPoint(origin.add({ x: -5, y: 5 }));
                */

                function graph(seed: Vector) {
                    drawing.clean();

                    for (let t = formula.range.min; t <= formula.range.max; t += formula.range.step) {
                        const point = formula.plot({ t, seed });

                        // console.log(point);

                        if (point.x === Infinity) {
                            point.x = 1000;
                        }

                        if (point.x === -Infinity) {
                            point.x = -1000;
                        }
                        if (point.y === Infinity) {
                            point.y = 1000;
                        }

                        if (point.y === -Infinity) {
                            point.y = -1000;
                        }

                        // TODO: How to plot asymptotes

                        drawing.addPoint(origin.add(point));
                    }
                }

                let seedPosition = Vector.zero();
                graph(seedPosition);

                element.addEventListener('mousemove', (event) => {
                    // TODO: LIB xyzt: addInPlace

                    seedPosition = seedPosition.add(Vector.fromObject(event, ['movementX', 'movementY']));

                    graph(seedPosition);
                });

                window.addEventListener('resize', (event) => {
                    resize();
                    graph(seedPosition);
                });

                /*
                window.addEventListener('scroll', (event) => {
                    // TODO: React here on window.scrollY

                    seedPosition = seedPosition.add({ x: 5 });
                    graph(seedPosition);
                });
                */

                /* 
                window.addEventListener('touchmove', (event) => {
                    const targetTouch = event.targetTouches[0];
                    const seedPositionAtractor = seedPosition.add(
                        Vector.fromObject(targetTouch, ['clientX', 'clientY']),
                    );

                    seedPosition = Vector.add(seedPosition.scale(0.99), seedPositionAtractor.scale(0.01));

                    graph(seedPosition);
                });
                */
            },
        );
    };
}

/**
 * TODO: createPolarGraphEffect
 * TODO: createYGraphEffect
 * TODO: LIB xyzt: addInPlace
 * TODO: LIB xyzt: Some util for Weighted arithmetic mean of Vector
 * TODO: Idea: Multiple touches creates multiple graphs> Array.from(event.targetTouches)
 * TODO: [🥟] Have windowSize on one place automatically updated
 */
