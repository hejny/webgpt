import { WebgptTaskProgress } from '../../../components/TaskInProgress/task/WebgptTaskProgress';

export interface IMessageProgress {
    readonly type: 'PROGRESS';
    readonly taskProgress: WebgptTaskProgress;
}
