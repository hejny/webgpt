import { WebgptTaskProgress } from '../../../components/TaskInProgress/task/WebgptTaskProgress';
import { ImageGenerator } from '../0-interfaces/ImageGenerator';
import { ImagePrompt } from '../0-interfaces/ImagePrompt';
import { ImagePromptResult } from '../0-interfaces/ImagePromptResult';

/**
 *
 * @singleton
 */
export class NothingImageGenerator implements ImageGenerator {
    public constructor() {}

    public async generate(
        prompt: ImagePrompt,
        onProgress: (taskProgress: WebgptTaskProgress) => void,
    ): Promise<Array<ImagePromptResult>> {
        return [];
    }
}

/**
 * TODO: !!! Annotate
 */
