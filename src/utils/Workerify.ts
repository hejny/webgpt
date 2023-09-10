import { Promisable } from 'type-fest';
import { TaskProgress } from '../components/TaskInProgress/task/TaskProgress';

interface IWorkerifyableFunction<TOptions, TResult> {
    (options: TOptions, onProgress: (taskProgress: TaskProgress) => Promisable<void>): Promise<TResult>;
}

export class Workerify<TFunction extends IWorkerifyableFunction<TOptions, TResult>, TOptions, TResult> {
    public runWorker(): void {}

    public makeConnector(): TFunction {}
}

/*

new Workeryfy<Symbol...>()


createNewWallpaperWorkeryfy.runWorker
.makeConnector


*/
