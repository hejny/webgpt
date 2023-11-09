import type { TaskProgress } from '@promptbook/types';

/**
 * Socket.io progress for remote image generation
 *
 * This is sent from server to client arbitrarily and may be sent multiple times
 */
export interface Imgs_Progress {

    /**
     * The progress of image generation
     */
    readonly taskProgress: TaskProgress;
}
