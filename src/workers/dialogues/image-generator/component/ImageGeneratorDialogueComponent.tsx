import { useCallback, useMemo, useState } from 'react';
import spaceTrim from 'spacetrim';
import { USE_DALLE_VERSION } from '../../../../../config';
import { ImagePromptResult } from '../../../../ai/text-to-image/0-interfaces/ImagePromptResult';
import { DallePrompt } from '../../../../ai/text-to-image/dalle/interfaces/DallePrompt';
import { getImageGenerator } from '../../../../ai/text-to-image/getImageGenerator';
import { ImagePromptResultsPicker } from '../../../../components/ImagePromptResultsPicker/ImagePromptResultsPicker';
import { Modal } from '../../../../components/Modal/00-Modal';
import { WebgptTaskProgress } from '../../../../components/TaskInProgress/task/WebgptTaskProgress';
import { provideClientId } from '../../../../utils/supabase/provideClientId';
import { string_image_prompt } from '../../../../utils/typeAliases';
import { DialogueComponentProps } from '../../../lib/dialogues/interfaces/DialogueComponentProps';
import { ImageGeneratorDialogueRequest } from '../interfaces/ImageGeneratorDialogueRequest';
import { ImageGeneratorDialogueResponse } from '../interfaces/ImageGeneratorDialogueResponse';

/**
 * @private use only within imageGeneratorDialogue function
 */
export function ImageGeneratorDialogueComponent(
    props: DialogueComponentProps<ImageGeneratorDialogueRequest, ImageGeneratorDialogueResponse>,
) {
    const {
        request: { message, defaultImagePrompt },
        onResponse,
    } = props;

    const [promptContent, setPromptContent] = useState<string_image_prompt>(defaultImagePrompt);
    const prompt = useMemo<DallePrompt>(
        () => ({
            content: promptContent!,
            model: `dalle-${USE_DALLE_VERSION}`,
            modelSettings: {
                style: 'vivid',
            },
            // <- TODO: !!! To config
            // <- TODO: !!! Play with theeese to achieve best results
        }),

        [promptContent],
    );
    const [isReady, setReady] = useState<boolean>(true);
    const [results, setResults] = useState<Array<ImagePromptResult>>([]);
    const runImageGenerator = useCallback(async () => {
        setReady(false);

        const imageGenerator = getImageGenerator(
            await provideClientId({
                isVerifiedEmailRequired: true,
            }),
        );

        const results = await imageGenerator.generate(prompt, (taskProgress: WebgptTaskProgress) => {
            // !!! Use
        });

        setReady(true);
        setResults(results);
    }, [prompt]);

    return (
        <Modal title={message}>
            <textarea
                autoFocus
                defaultValue={promptContent}
                placeholder={defaultImagePrompt}
                onChange={(event) => {
                    const value = spaceTrim(event.target.value);
                    setPromptContent(value);
                }}
                onKeyDown={(event) => {
                    // TODO: DRY [1]
                    if (!(event.key === 'Enter' && event.shiftKey === false && event.ctrlKey === false)) {
                        return;
                    }

                    // !!! Implement
                }}
            />

            <button onClick={runImageGenerator}>Generate</button>
            <br />
            <br />
            <hr />
            <br />
            {isReady ? null : <p>Generating...</p>}
            {results.length === 0 && isReady && <p>No images generated</p>}
            <ImagePromptResultsPicker
                {...{ results, prompt }}
                onPick={async (result) => {
                    onResponse({ pickedImage: result });
                }}
            />
        </Modal>
    );
}

ImageGeneratorDialogueComponent.dialogueTypeName = 'IMAGE_GENERATOR';

/**
 * TODO: !!! first 4 images pregenerated then dynamically generate more
 * TODO: !!! Design
 * TODO: !!! Annotate
 */
