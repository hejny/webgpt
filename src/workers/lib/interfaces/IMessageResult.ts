import { TransferableObject } from './TransferableObject';

export interface IMessageResult<TResult extends TransferableObject> {
    readonly type: 'RESULT';
    readonly result: TResult;
}
