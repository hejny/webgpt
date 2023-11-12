import spaceTrim from 'spacetrim';
import { Promisable } from 'type-fest';
import { ImagePromptResult } from '../../../../ai/text-to-image/0-interfaces/ImagePromptResult';
import { WebgptTaskProgress } from '../../../../components/TaskInProgress/task/WebgptTaskProgress';
import { string_image_prompt } from '../../../../utils/typeAliases';
import { simpleTextDialogue } from '../../../dialogues/simple-text/simpleTextDialogue';

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

    let { imagePromptContent } = request;

    await onProgress({
        name: `picking-image`,
        title: 'Picking the image',
        isDone: false,
    });

    const isContinuing = await confirmDialogue({
        prompt: `Do you want to pick an image?`,
    });

    if (!isContinuing) {
        throw new Error('User cancelled');
    }

    const { answer: imagePromptContentConfirmed } = await simpleTextDialogue({
        prompt: `Confirm image prompt`, // <- TODO: !!! Change prompt to something more meaningful
        defaultValue: imagePromptContent,
        // TODO: !!! Implement> isRequired: true, // <- TODO: Go through all usages of promptDialogue and leverage isRequired
    });

    imagePromptContent = imagePromptContentConfirmed;

    const ImagePromptResult = await imageGeneratorDialogue({
        prompt: `Pick the image`, // <- TODO: !!! Change prompt to something more meaningful
        imagePromptContent,
        /*
        TODO: !!! Delete
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
        */
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
