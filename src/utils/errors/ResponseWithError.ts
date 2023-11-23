/**
 * API responses can be either a successful response or an error response.
 */
export type ResponseWithError<TResponse> = TResponse | ErrorResponse;

/**
 * The error response type.
 */
export type ErrorResponse = { error: { message: string } };

/**
 * Checks if the given response is an error response.
 *
 * @param response The response to check.
 * @returns True if the response is an error response, false otherwise.
 */
export function isErrorResponse<TResponse>(response: ResponseWithError<TResponse>): response is ErrorResponse {
    return (response as any).error !== undefined;
}

/**
 * Throws an error if the given response is an error response.
 *
 * @param response The response to check.
 */
export function throwIfErrorResponse<TResponse>(response: ResponseWithError<TResponse>): asserts response is TResponse {
    if (isErrorResponse(response)) {
        throw new Error(response.error.message);
    }
}

/**
 * TODO: !! Use this in all places where there is "ResponseWithError<T>"
 */
