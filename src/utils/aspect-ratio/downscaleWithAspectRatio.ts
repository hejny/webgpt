import { Vector } from 'xyzt';

/**
 * Downscale size and preserve aspect ratio of the original size
 *
 * @param size original size
 * @param preferredSize as a container to fit in
 * @returns new size fitting in the container
 */
export function downscaleWithAspectRatio(size: Vector, preferredSize: Vector): Vector {
    if (size.x <= preferredSize.x && size.y <= preferredSize.y) {
        return size;
    }

    const sizeRatio = size.x / size.y;
    const preferredSizeRatio = preferredSize.x / preferredSize.y;

    if (sizeRatio > preferredSizeRatio) {
        return new Vector(preferredSize.x, preferredSize.x / sizeRatio);
    } else if (sizeRatio < preferredSizeRatio) {
        return new Vector(preferredSize.y * sizeRatio, preferredSize.y);
    } else {
        return preferredSize;
    }
}
