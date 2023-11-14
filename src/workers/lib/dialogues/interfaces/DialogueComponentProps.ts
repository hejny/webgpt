export interface DialogueComponentProps<TRequest, TResponse> {
    readonly request: TRequest;
    onResponse(response: TResponse): void;
}

/**
 * TODO: !!!! Change onResponse to respond
 * !!! Annotate
 */
