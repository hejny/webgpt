import { TransferableObject } from './TransferableObject';

export interface IMessageRequest<TRequest extends TransferableObject> {
    readonly type: 'REQUEST';
    readonly request: TRequest;
}
