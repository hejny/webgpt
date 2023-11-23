export interface DialogueComponentProps<TRequest, TResponse> {
    readonly request: TRequest;
    respond(response: TResponse): void;
}

/**
 * TODO: !!! Annotate
 */
