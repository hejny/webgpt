import { Registration } from 'destroyable';
import { Vector } from 'xyzt';
import { Effect } from './effect';

/**
 * An interface for defining the options of a parallax effect ⁘
 * 
 * @property {number} distance - The distance factor that determines how much the element moves relative to the cursor or scroll position.
 * @property {Array<'SCROLL' | 'POINTER'>} reactOn - The events that trigger the parallax effect. Can be either 'SCROLL', 'POINTER', or both.
 * @property {Object} [debug] - An optional object for logging debug information.
 * @property {string} debug.tag - A tag to identify the debug messages in the console.
 */
interface ParalaxEffectOptions {
    distance: number;
    reactOn: Array<'SCROLL' | 'POINTER'>;

    debug?: {
        tag: string;
    };
}

/**
 * A function that creates a parallax effect for a given HTML element ⁘
 * 
 * @param {ParalaxEffectOptions} options - The options for the parallax effect.
 * @returns {Effect<TElement>} A function that applies the parallax effect to the element and returns a registration object.
 * @template TElement
 */
export function createParalaxEffect<TElement extends HTMLElement>(options: ParalaxEffectOptions): Effect<TElement> {
    const { distance, reactOn, debug } = options;

    return (element: TElement) => {
        let windowSize: Vector;
        let elementSize: Vector;

        let scrollPosition: Vector = Vector.zero();
        let pointerPosition: Vector | null = null;

/**
 * A function that updates the window and element sizes ⁘
 */
        function resize() {
            windowSize = Vector.fromObject(window, ['innerWidth', 'innerHeight']);
            elementSize = Vector.fromObject(element.getBoundingClientRect(), ['width', 'height']);
        }

        window.addEventListener('resize', (event) => {
            resize();
            applyParalax();
        });

        if (reactOn.includes('SCROLL')) {
            window.addEventListener('scroll', (event) => {
                scrollPosition = new Vector(window.scrollX, window.scrollY);
                applyParalax();
            });
        }

        if (reactOn.includes('POINTER')) {
            window.addEventListener('pointermove', async (event) => {
                pointerPosition = Vector.fromObject(event, ['clientX', 'clientY']);
                applyParalax();
            });
        }

        let cursorRelativePosition: Vector = Vector.zero();

/**
 * A function that applies the parallax effect to the element by changing its transform property ⁘
 */
        function applyParalax() {
            // console.log(new Vector(0, window.scrollY), windowSize, new Vector(0, window.scrollY).divide(windowSize));

            let cursorRelativePosition: Vector;

            if (pointerPosition === null) {
                // Note: When pointer not moved, assume that it is right in the middle
                // TODO: DRY [0]
                cursorRelativePosition = scrollPosition.scale(10 /* <- DRY [0] */).divide(elementSize);
            } else {
                // TODO: DRY [0]
                cursorRelativePosition = pointerPosition
                    .add(scrollPosition.scale(10 /* <- DRY [0] */))
                    .divide(elementSize)
                    .subtract({ x: 0.5, y: 0.5 });
            }

            let offcenter = cursorRelativePosition
                .scale(-10)
                .scale(1 / distance)
                // TODO: LIB xyzt: Vector.extend, Vector.log, Vector.logGraphical, Vector.toStringAuto
                .apply((unlimitedOffcenter) => {
                    // console.log('unlimitedOffcenter', unlimitedOffcenter.toString2D());

                    /*
                    console.log(
                        '%c⚫',
                        spaceTrim(`
                            display: inline-block;
                
                            ${`` /* Note: width and height can not be used in console.log* /}
                            padding-left: 10px;
                            padding-right: 90px;
                            padding-top: 30px;
                            padding-bottom: 70px;

                            background-color: red;
                            border: 2px solid black
                    
                        `)
                            .split('\n')
                            .join(''),
                    );
                    */
                    return unlimitedOffcenter;
                });

            //.add(new Vector(0, window.scrollY).divide(windowSize).scale(-50));

            if (debug) {
                console.info(debug.tag, { pointerPosition, scrollPosition, cursorRelativePosition, offcenter });
            }

            // scale(1.01) translate(...
            element.style.transform = `translate(${offcenter.x}px,${offcenter.y}px)`;
        }

        resize();
        applyParalax();

        return Registration.void(/* [1] */);
    };
}

/**
 * TODO: [1] Propper effect cleanup
 * TODO: [1] LIB destroyable better way how to work with addEventListener/removeEventListener
 * TODO: [🥟] Have windowSize on one place automatically updated
 */
