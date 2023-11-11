import spaceTrim from 'spacetrim';
import { Promisable } from 'type-fest';
import { ImagePromptResult } from '../../../ai/text-to-image/0-interfaces/ImagePromptResult';
import { promptDialogue } from '../../../components/Dialogues/dialogues/promptDialogue';
import { ImagePromptResultsPicker } from '../../../components/ImagePromptResultsPicker/ImagePromptResultsPicker';
import { WebgptTaskProgress } from '../../../components/TaskInProgress/task/WebgptTaskProgress';
import { string_image_prompt } from '../../../utils/typeAliases';

export interface MockedMultitaskWithImageGeneratorRequest {
    /**
     * What to search for
     */
    imagePromptContent: string_image_prompt;
}

export interface MockedMultitaskWithImageGeneratorResult {
    /**
     * Which image was picked
     */
    pickedImage: ImagePromptResult;
}

/**
 * Mocked version of image generator
 *
 * @workerify Do not use directly, use mockedMultitaskWithImageGeneratorForBrowser instead
 * @private Use only withing the folder mockedMultitaskWithImageGenerator
 */
export async function mockedMultitaskWithImageGenerator(
    request: MockedMultitaskWithImageGeneratorRequest,
    onProgress: (taskProgress: WebgptTaskProgress) => Promisable<void>,
): Promise<MockedMultitaskWithImageGeneratorResult> {
    console.info(
        spaceTrim(`
            %cStart mockedMultitaskWithImageGenerator
            Note: This should be used only for development purposes.
        `), // <- TODO: Put only in one bracket
        spaceTrim(`
            display: block;
            background: #F1E314;
            border: 1px solid #7E7E7E;
            color: #000000;
            padding: 5px;
            border-radius: 3px;
        `),
    );

    const { imagePromptContent } = request;

    await onProgress({
        name: `picking-image`,
        title: 'Picking the image',
        isDone: false,
    });

    await promptDialogue({
        prompt: (
            <>
                <ImagePromptResultsPicker
                    prompt={{ content: imagePromptContent, model: 'test' }}
                    results={[]}
                    onPick={(result: ImagePromptResult) => {}}
                />
            </>
        ),

        defaultValue: '!!!',
    });

    await onProgress({
        name: `picking-image`,
        isDone: true,
    });

    return {
        pickedImage: {
            content: '!!!',
        } as any,
    };
}

/**
 * TODO: Maybe reflect response from promptDialogue in UI (like in TaskProgress)
 */
