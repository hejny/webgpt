import { useCallback, useMemo, useState } from 'react';
import spaceTrim from 'spacetrim';
import { USE_DALLE_VERSION } from '../../../../../config';
import { ImagePromptResult } from '../../../../ai/text-to-image/0-interfaces/ImagePromptResult';
import { DallePrompt } from '../../../../ai/text-to-image/dalle/interfaces/DallePrompt';
import { getImageGenerator } from '../../../../ai/text-to-image/getImageGenerator';
import { getPhotobank } from '../../../../ai/text-to-image/getPhotobank';
import { ImagePromptResultsPicker } from '../../../../components/ImagePromptResultsPicker/ImagePromptResultsPicker';
import { Modal } from '../../../../components/Modal/00-Modal';
import { WebgptTaskProgress } from '../../../../components/TaskInProgress/task/WebgptTaskProgress';
import { classNames } from '../../../../utils/classNames';
import { useClientId } from '../../../../utils/hooks/useClientId';
import { useStyleModule } from '../../../../utils/hooks/useStyleModule';
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

    const styles = useStyleModule(import('./ImageGeneratorDialogueComponent.module.css'));

    const [promptContent, setPromptContent] = useState<string_image_prompt>(defaultImagePrompt);

    const [generatorType, setGeneratorType] = useState<'PREGENERATED' | 'CUSTOM'>('PREGENERATED');
    const clientId = useClientId({ isVerifiedEmailRequired: true });
    const imageGenerator = useMemo(() => {
        if (generatorType === 'PREGENERATED') {
            return getPhotobank();
        } else if (generatorType === 'CUSTOM') {
            if (!clientId) {
                throw new Error(`clientId is required for Dalle generator`);
            }
            return getImageGenerator(clientId);
        } else {
            throw new Error(`Unknown generator type: ${generatorType}`);
        }
    }, [generatorType, clientId]);

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
        const results = await imageGenerator.generate(prompt, (taskProgress: WebgptTaskProgress) => {
            // !!! Use
        });

        setReady(true);
        setResults(results);
    }, [imageGenerator, prompt]);

    const [selected, setSelected] = useState<null | ImagePromptResult>(null);

    // !!! debugger;

    return (
        <Modal title={message} className={styles.ImageGeneratorDialogueComponent}>
            <textarea
                className={styles.prompt}
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

            <div className={styles.results}>
                {!isReady ? (
                    <p>Generating...</p>
                ) : results.length === 0 ? (
                    <p>No images generated</p>
                ) : (
                    <ImagePromptResultsPicker
                        {...{ results, prompt }}
                        onSelect={setSelected}
                        onPick={async (pickedImage) => {
                            onResponse({ pickedImage });
                        }}
                    />
                )}
            </div>

            <div className={styles.actions}>
                {!selected ? (
                    <button className={classNames('button')} onClick={runImageGenerator}>
                        Generate more
                    </button>
                ) : (
                    <button
                        className={classNames('button', styles.callToAction)}
                        onClick={() => {
                            onResponse({ pickedImage: selected });
                        }}
                    >
                        Pick
                    </button>
                )}
            </div>
        </Modal>
    );
}

ImageGeneratorDialogueComponent.dialogueTypeName = 'IMAGE_GENERATOR';

/**
 * TODO: !!! first 4 images pregenerated then dynamically generate more
 * TODO: !!! Design
 * TODO: !!! Annotate
 */
