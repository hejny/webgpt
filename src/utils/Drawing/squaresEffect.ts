import { IDestroyable, Registration } from 'destroyable';
import { forTime } from 'waitasecond';
import { Vector } from 'xyzt';
import { Drawing } from './Drawing';

/**
 * Creates a squares effect on an HTML element ⁘
 * 
 * @template TElement - The type of the HTML element.
 * @param {TElement} element - The HTML element to apply the effect on.
 * @returns {IDestroyable} An object that can destroy the effect.
 */
export function squaresEffect<TElement extends HTMLElement>(element: TElement): IDestroyable {
    let drawing: Drawing | null = null;

    const field = 15;
    let lastPoint: Vector | null = null;

/**
 * Restarts the drawing on the element ⁘
 */
    async function restart() {
        if (drawing) {
            await end();
        }

        drawing = new Drawing(element);
    }

/**
 * Moves the drawing to a new point ⁘
 * 
 * @param {Vector} point - The new point to move to.
 */
    async function move(point: Vector) {
        if (!drawing) {
            return;
        }

        const currentPoint = point.map((value) => Math.round(value / field));

        // TODO: LIB xyzt: some comparing method Vector.isEqual
        if (lastPoint === null || currentPoint.toString() !== lastPoint.toString()) {
            if (lastPoint && lastPoint.distance(currentPoint) > 1) {
                restart();
                return;
            }

            lastPoint = currentPoint;

            drawing.addPoint(currentPoint.scale(field));
        }
    }

/**
 * Ends the drawing on the element ⁘
 */
    async function end() {
        if (!drawing) {
            return;
        }

        lastPoint = null;

        // TODO: Do some nice over+beforeshoot and make it symetric
        await forTime(1);

        // TODO: Make here a propper queue
        if (drawing && !drawing.isDestroyed) {
            /* not await */ drawing.destroy();
            drawing = null;
        }
    }

    element.addEventListener('pointerenter', async (event) => {
        await restart();
        await move(Vector.fromObject(event, ['pageX', 'pageY']));
    });

    window.addEventListener('pointermove', async (event) => {
        await move(Vector.fromObject(event, ['pageX', 'pageY']));
    });

    element.addEventListener('pointerleave', async (event) => {
        // TODO: Add more events like leaving whole document / loose of focus /...
        await end();
    });

    return Registration.void(/* TODO: Same as in graph effect */);
}

/**
 * TODO: Dry with drawingEffect
 */
