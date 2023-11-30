/**
 * Socket.io error for remote image generation
 *
 * This is sent from server to client when error occurs and stops the process
 */
export interface Imgs_Error {
    /**
     * The error message which caused the error
     */
    readonly errorMessage: string;
}
