import { useCallback, useMemo, useState } from 'react';
import spaceTrim from 'spacetrim';
import { USE_DALLE_VERSION } from '../../../../../config';
import { ImagePromptResult } from '../../../../ai/text-to-image/0-interfaces/ImagePromptResult';
import { DallePrompt } from '../../../../ai/text-to-image/dalle/interfaces/DallePrompt';
import { getImageGenerator } from '../../../../ai/text-to-image/getImageGenerator';
import { getPhotobank } from '../../../../ai/text-to-image/getPhotobank';
import { NothingImageGenerator } from '../../../../ai/text-to-image/nothing/NothingImageGenerator';
import { ImagePromptResultsPicker } from '../../../../components/ImagePromptResultsPicker/ImagePromptResultsPicker';
import { Modal } from '../../../../components/Modal/00-Modal';
import { WebgptTaskProgress } from '../../../../components/TaskInProgress/task/WebgptTaskProgress';
import { classNames } from '../../../../utils/classNames';
import { useClientId } from '../../../../utils/hooks/useClientId';
import { useInitialAction } from '../../../../utils/hooks/useInitialAction';
import { useStyleModule } from '../../../../utils/hooks/useStyleModule';
import { randomItem } from '../../../../utils/randomItem';
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
        if (!clientId) {
            return new NothingImageGenerator();
        }

        if (generatorType === 'PREGENERATED') {
            return getPhotobank(clientId);
        } else if (generatorType === 'DALLE') {
            return getImageGenerator(clientId);
        } else {
            throw new Error(`Unknown generator type: ${generatorType}`);
        }
    }, [generatorType, clientId]);

    // console.log('!!!', { imageGenerator });

    const prompt = useMemo<DallePrompt>(
        // TODO: [🧠] ImageGenerator should have (static) method to create best prompt - image prompt wizzard
        () => ({
            content: promptContent!,
            model: `dalle-${USE_DALLE_VERSION}`,
            modelSettings: {
                style: 'vivid',
                quality: `standard`,
            },
            // <- TODO: Refactor: TODO: !!! To config
            // <- TODO: !! Play with theeese to achieve best results
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

        try {
            const newResults = await imageGenerator.generate(prompt, (taskProgress: WebgptTaskProgress) => {
                // TODO: !! Use the progress
            });

            const srcs = new Set<string_url_image>();
            const joinedResults = [...results, ...newResults].filter(({ imageSrc }) => {
                if (srcs.has(imageSrc)) {
                    return false;
                }

                srcs.add(imageSrc);
                return true;
            });

            setResults(joinedResults);
            setRunnedImageGenerator((runnedImageGenerator) => runnedImageGenerator + 1);

            if (generatorType !== 'PREGENERATED' && newResults[0]) {
                // TODO: !!!! Make this work - this does not propagate into <ImagePromptResultsPicker/>
                setResults(newResults);
                setSelected(newResults[0]!);
            }
        } finally {
            setRunning(false);
        }
    }, [isRunning, results, generatorType, imageGenerator, prompt]);

    useInitialAction(() => clientId !== null, runImageGenerator);

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
                /*
                onKeyDown={(event) => {
                   
                    if (!(event.key === 'Enter' && event.shiftKey === false && event.ctrlKey === false)) {
                        return;
                    }

                    // TODO: [🧠] Do we want to start image generation by pressing [Enter]
                }}
                */
            />

            <div className={styles.results}>
                {isRunning && results.length === 0 ? (
                    <p>Generating...</p>
                ) : results.length === 0 ? (
                    <p>No images generated</p>
                ) : (
                    <ImagePromptResultsPicker
                        {...{ results, prompt, selected }}
                        onSelect={setSelected}
                        onPick={async (pickedImage) => {
                            // TODO: !!! Remove onPick
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

                {/*
                TODO: Probbably remove
                <button
                    className={classNames('button', styles.secondaryAction)}
                    onClick={() => {
                        setSelected(randomItem(...results));
                    }}
                >
                    Random
                </button>
                */}
            </div>
        </Modal>
    );
}

ImageGeneratorDialogueComponent.dialogueTypeName = 'IMAGE_GENERATOR';

/**
 * TODO: !!!! Design
 * TODO: !!! Annotate
 */
