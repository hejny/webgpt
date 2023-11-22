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
    const [isAdvanced, setAdvanced] = useState<boolean>(false);
    const [isRunning, setRunning] = useState<boolean>(false);
    const [results, setResults] = useState<Array<ImagePromptResult>>([]);
    const [runnedCount, setRunnedCount] = useState(0);
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
            setRunnedCount((runnedImageGenerator) => runnedImageGenerator + 1);

            if (generatorType !== 'PREGENERATED' && newResults[0]) {
                setResults(newResults);
                setSelected(newResults[0]!);
            }
        } finally {
            setRunning(false);
        }
    }, [isRunning, results, generatorType, imageGenerator, prompt]);

    useInitialAction(
        () => clientId !== null,
        async () => {
            await runImageGenerator();
            setGeneratorType('DALLE');
        },
    );

    return (
        <Modal
            title={
                !results[0]
                    ? message
                    : results[0]!.originalPrompt.model.startsWith('dalle')
                    ? 'Do you like images from our gallery'
                    : 'Images generated just for you'
            }
            className={classNames(styles.ImageGeneratorDialogueComponent, isAdvanced && styles.isAdvanced)}
        >
            {isAdvanced && (
                <textarea
                    className={styles.prompt}
                    defaultValue={promptContent}
                    placeholder={defaultImagePrompt}
                    onChange={(event) => {
                        const value = spaceTrim(event.target.value);
                        setPromptContent(value);
                    }}
                />
            )}

            <div className={styles.results}>
                {isRunning && results.length === 0 ? (
                    <p>Generating...</p>
                ) : results.length === 0 ? (
                    runnedCount === 0 ? (
                        // Note: This should never happen
                        <p>Preparing image generator...</p>
                    ) : (
                        // Note: This should never happen
                        <p>No images generated</p>
                    )
                ) : (
                    <>
                        <ImagePromptResultsPicker
                            {...{ results, prompt, selected }}
                            onSelect={setSelected}
                            onPick={async (pickedImage) => {
                                onResponse({ pickedImage });
                            }}
                        />
                    </>
                )}
            </div>

            <div className={styles.actions}>
                {!selected ? (
                    <>
                        <button
                            className={classNames('button', styles.callToAction)}
                            onClick={runImageGenerator}
                            disabled={isRunning}
                        >
                            Generate new one
                        </button>

                        {isAdvanced &&
                            runnedCount >= 1 &&
                            (generatorType === 'DALLE' ? (
                                <button
                                    className={classNames('button', styles.secondaryAction)}
                                    onClick={() => {
                                        setGeneratorType('PREGENERATED');
                                    }}
                                >
                                    Generating
                                </button>
                            ) : (
                                <button
                                    className={classNames('button', styles.secondaryAction)}
                                    onClick={() => {
                                        setGeneratorType('DALLE');
                                    }}
                                >
                                    Picking from photobank
                                </button>
                            ))}
                        {!isAdvanced ? (
                            <button
                                className={classNames('button', styles.secondaryAction)}
                                onClick={() => setAdvanced(true)}
                            >
                                More options
                            </button>
                        ) : (
                            <button
                                className={classNames('button', styles.secondaryAction)}
                                onClick={() => setAdvanced(false)}
                            >
                                Simple view
                            </button>
                        )}
                    </>
                ) : (
                    <button
                        className={classNames('button', styles.callToAction)}
                        style={{
                            background: `url(${selected.imageSrc})`,

                            // TODO: !!! Is this stretched propperly?
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
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
 * TODO: !!! UI: Hide place for the prompt if the prompt is not shown
 * TODO: !!! UI: Buttons overflow
 * TODO: !!! Annotate
 */
