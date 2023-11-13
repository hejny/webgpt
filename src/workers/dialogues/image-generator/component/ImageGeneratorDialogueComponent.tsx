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
import { string_image_prompt, string_url_image } from '../../../../utils/typeAliases';
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

    const [generatorType, setGeneratorType] = useState<'PREGENERATED' | 'DALLE'>('PREGENERATED');
    const clientId = useClientId({ isVerifiedEmailRequired: true });
    const imageGenerator = useMemo(() => {
        if (generatorType === 'PREGENERATED') {
            return getPhotobank();
        } else if (generatorType === 'DALLE') {
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
    const [isRunning, setRunning] = useState<boolean>(false);
    const [results, setResults] = useState<Array<ImagePromptResult>>([]);
    const [runnedImageGenerator, setRunnedImageGenerator] = useState(0);
    const [selected, setSelected] = useState<null | ImagePromptResult>(null);
    const runImageGenerator = useCallback(async () => {
        if (isRunning) {
            console.warn(`Image generator is already running`);
            return;
        }

        setRunning(true);
        const newResults = await imageGenerator.generate(prompt, (taskProgress: WebgptTaskProgress) => {
            // !!! Use
        });

        const srcs = new Set<string_url_image>();
        const joinedResults = [...results, ...newResults].filter(({ imageSrc }) => {
            if (srcs.has(imageSrc)) {
                return false;
            }

            srcs.add(imageSrc);
            return true;
        });

        console.log('!!!', { results, newResults, joinedResults });

        setRunning(false);
        setResults(joinedResults);
        setRunnedImageGenerator((runnedImageGenerator) => runnedImageGenerator + 1);

        if (generatorType !== 'PREGENERATED' && newResults[0]) {
            setSelected(newResults[0]!);
        }
    }, [isRunning, results, generatorType, imageGenerator, prompt]);

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
                {isRunning ? (
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
                    <>
                        <button
                            className={classNames('button', styles.secondaryAction)}
                            onClick={runImageGenerator}
                            disabled={isRunning}
                        >
                            Generate more
                            {generatorType === 'DALLE' && (
                                <>
                                    {' '}
                                    with <b>Dalle-{USE_DALLE_VERSION}</b>
                                </>
                            )}
                        </button>
                        {runnedImageGenerator > 2 &&
                            (generatorType !== 'DALLE' ? (
                                <button
                                    className={classNames('button', styles.secondaryAction)}
                                    onClick={() => {
                                        setGeneratorType('DALLE');
                                    }}
                                >
                                    Switch to Dalle-{USE_DALLE_VERSION}
                                </button>
                            ) : (
                                <button
                                    className={classNames('button', styles.secondaryAction)}
                                    onClick={() => {
                                        setGeneratorType('PREGENERATED');
                                    }}
                                >
                                    Switch to MidJourney
                                </button>
                            ))}
                    </>
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
