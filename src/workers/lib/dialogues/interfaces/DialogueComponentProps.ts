export interface DialogueComponentProps<TRequest, TResponse> {
    readonly request: TRequest;
    onResponse(response: TResponse): void;
}

/**
 * TODO: Refactor: TODO: !!! Change onResponse to respond
 * TODO: !!! Annotate
 */
