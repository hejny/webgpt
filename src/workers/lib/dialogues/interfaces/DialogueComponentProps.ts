
export interface DialogueComponentProps<TRequest,TResponse>{
    readonly request: TRequest;
    onResponse(response: TResponse): void;
}


/**
 * !!! Annotate
 */