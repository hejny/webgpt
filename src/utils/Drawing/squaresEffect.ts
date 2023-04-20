import { IDestroyable, Registration } from 'destroyable';
import { forTime } from 'waitasecond';
import { Vector } from 'xyzt';
import { Drawing } from './Drawing';

export function squaresEffect<TElement extends HTMLElement>(element: TElement): IDestroyable {
    let drawing: Drawing | null = null;

    const field = 15;
    let lastPoint: Vector | null = null;

    async function restart() {
        if (drawing) {
            await end();
        }

        drawing = new Drawing(element);
    }

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
