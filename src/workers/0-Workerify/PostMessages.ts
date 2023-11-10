import { Promisable } from 'type-fest';
import { IPromptDialogueOptions } from '../../components/Dialogues/dialogues/promptDialogue';
import { WebgptTaskProgress } from '../../components/TaskInProgress/task/WebgptTaskProgress';

export type TransferableObject = any /* <-[0] */;

export type IWorkerifyableFunction<TRequest extends TransferableObject, TResult extends TransferableObject> = (
    request: TRequest,
    onProgress: (taskProgress: WebgptTaskProgress) => Promisable<void>,
) => Promise<TResult>;

export type IMessageMainToWorker<TRequest extends TransferableObject> =
    | IMessageRequest<TRequest>
    | IMessagePromptDialogueAnswer;

export interface IMessageRequest<TRequest extends TransferableObject> {
    readonly type: 'REQUEST';
    readonly request: TRequest;
}

export interface IMessagePromptDialogueAnswer {
    readonly type: 'PROMPT_DIALOGUE_ANSWER';
    readonly promptAnswer: string | null /* <-[🍁] */;
}

export type IMessageWorkerToMain<TResult extends TransferableObject> =
    | IMessageProgress
    | IMessageResult<TResult>
    | IMessageError
    | IMessagePromptDialogue;

export interface IMessageProgress {
    readonly type: 'PROGRESS';
    readonly taskProgress: WebgptTaskProgress;
}

export interface IMessageResult<TResult extends TransferableObject> {
    readonly type: 'RESULT';
    readonly result: TResult;
}

export interface IMessageError {
    readonly type: 'ERROR';
    readonly message: string;
}

export interface IMessagePromptDialogue {
    readonly type: 'PROMPT_DIALOGUE';
    readonly promptOptions: IPromptDialogueOptions;
}
