import { WebgptTaskProgress } from '../../../components/TaskInProgress/task/WebgptTaskProgress';
import { ImageGenerator } from '../0-interfaces/ImageGenerator';
import { ImagePrompt } from '../0-interfaces/ImagePrompt';
import { ImagePromptResult } from '../0-interfaces/ImagePromptResult';

/**
 * Void image generator that does nothing but behaves like a real image generator
 */
export class NothingImageGenerator implements ImageGenerator {
    public constructor() {}

    /**
     * Whatever you do, it will always return an empty array
     */
    public async generate(
        prompt: ImagePrompt,
        onProgress: (taskProgress: WebgptTaskProgress) => void,
    ): Promise<Array<ImagePromptResult>> {
        return [];
    }
}
