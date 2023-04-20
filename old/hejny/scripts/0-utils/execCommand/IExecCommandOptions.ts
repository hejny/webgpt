type RequiredAndOptional<TBase, TRequired extends keyof TBase, TOptional extends keyof TBase> = Pick<TBase, TRequired> &
    Partial<Pick<TBase, TOptional>>;

export type IExecCommandOptions =
    | string
    | RequiredAndOptional<IExecCommandOptionsAdvanced, 'command', 'args' | 'cwd' | 'crashOnError' | 'timeout'>;
// TODO: | RequiredAndOptional<IExecCommandOptionsAdvanced, 'commands', 'args' | 'cwd' | 'crashOnError'>;

export interface IExecCommandOptionsAdvanced {
    command: string;
    args: string[];
    // TODO: commands: {command: string, args?: string[]}[];
    cwd: string;
    crashOnError: boolean;
    timeout: number;
}
