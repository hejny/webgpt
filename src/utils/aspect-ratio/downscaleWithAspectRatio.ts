import { Vector } from 'xyzt';

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
