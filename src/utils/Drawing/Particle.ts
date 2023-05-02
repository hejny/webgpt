import { Destroyable, IDestroyable } from 'destroyable';
import { forAnimationFrame, forTime } from 'waitasecond';
import { IVector } from 'xyzt';
import { Color } from '../color/Color';

/**
 * Class for creating and manipulating particles ⁘
 * 
 * @class
 * @extends Destroyable
 * @implements IDestroyable
 * @property {ParticleOptions} options - The options for the particle
 * @property {HTMLElement} particleElement - The element representing the particle
 */
interface ParticleOptions {
    place: HTMLElement;
    position: IVector;
    size: number;
    color: Color;
}

/**
 * @@@
 */
export class Particle extends Destroyable implements IDestroyable {

    public readonly particleElement: HTMLElement;

    public constructor(public readonly options: ParticleOptions) {
        super();

        this.particleElement = document.createElement('div');
        this.options.place.appendChild(this.particleElement);

        this.particleElement.style.pointerEvents = 'none';
        this.particleElement.style.position = 'absolute';

        this.particleElement.style.width = `${options.size}px`;
        this.particleElement.style.height = `${options.size}px`;
        this.particleElement.style.left = `${options.position.x || 0 - options.size / 2}px`;
        this.particleElement.style.top = `${options.position.y || 0 - options.size / 2}px`;

        this.particleElement.style.backgroundColor = options.color.toString();
        this.particleElement.style.borderRadius = '100%';
    }

    /**
     * Destroy the particle by fade-out
     */
    public async fadeOut(duration: number): Promise<void> {
        this.particleElement.style.opacity = '1';
        this.particleElement.style.transition = `opacity ${duration / 1000}s ease-in-out`;
        await forAnimationFrame();
        this.particleElement.style.opacity = '0';

        await forTime(duration);

        await this.destroy();
    }

    public async destroy(): Promise<void> {
        this.options.place.removeChild(this.particleElement);
        super.destroy();
    }
}

/**
 * TODO: LIB destroyable: Self-destroyable objects
 * TODO: LIB destroyable: isDestroyed vs isBeingDestroyed OR DestroyStatus - Creating, Existing, Destroying, Destroyied
 * TODO: LIB destroyable: Revivable objects = DestroyStatus can go in reverse
 */
