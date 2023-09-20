import type { Promisable } from 'type-fest';
import type { PromptDialogueOptions } from '../../components/Dialogues/interfaces/PromptDialogueOptions';
import type { TaskProgress } from '../../components/TaskInProgress/task/TaskProgress';

export type TransferableObject = any /* <-[0] */;

export type IWorkerifyableFunction<TRequest extends TransferableObject, TResult extends TransferableObject> = (
    request: TRequest,
    onProgress: (taskProgress: TaskProgress) => Promisable<void>,
) => Promise<TResult>;

export type IMessageMainToWorker<TRequest extends TransferableObject> =
    | IMessageRequest<TRequest>
    | IMessagePromptDialogueAnswer;

export interface IMessageRequest<TRequest extends TransferableObject> {
    type: 'REQUEST';
    request: TRequest;
}

export interface IMessagePromptDialogueAnswer {
    type: 'PROMPT_DIALOGUE_ANSWER';
    promptAnswer: string | null /* <-[🍁] */;
}

export type IMessageWorkerToMain<TResult extends TransferableObject> =
    | IMessageProgress
    | IMessageResult<TResult>
    | IMessageError
    | IMessagePromptDialogue;

export interface IMessageProgress {
    type: 'PROGRESS';
    taskProgress: TaskProgress;
}

export interface IMessageResult<TResult extends TransferableObject> {
    type: 'RESULT';
    result: TResult;
}

export interface IMessageError {
    type: 'ERROR';
    message: string;
}

export interface IMessagePromptDialogue {
    type: 'PROMPT_DIALOGUE';
    promptOptions: PromptDialogueOptions;
}
