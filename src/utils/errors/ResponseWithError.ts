export type ResponseWithError<TResponse> = TResponse | ErrorResponse;

export type ErrorResponse = { error: { message: string } };

export function isErrorResponse<TResponse>(response: ResponseWithError<TResponse>): response is ErrorResponse {
    return (response as any).error !== undefined;
}

export function throwIfErrorResponse<TResponse>(response: ResponseWithError<TResponse>): asserts response is TResponse {
    if (isErrorResponse(response)) {
        throw new Error(response.error.message);
    }
}

/**
 * TODO: !!! Annotate all
 * TODO: !! Use this in all places where there is "ResponseWithError<T>"
 */
