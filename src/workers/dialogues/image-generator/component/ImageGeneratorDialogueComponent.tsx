import { useCallback, useMemo, useState } from 'react';
import spaceTrim from 'spacetrim';
import { USE_DALLE_MODEL_SETTINGS, USE_DALLE_VERSION } from '../../../../../config';
import { ImagePromptResult } from '../../../../ai/text-to-image/0-interfaces/ImagePromptResult';
import { DallePrompt } from '../../../../ai/text-to-image/dalle/interfaces/DallePrompt';
import { getImageGenerator } from '../../../../ai/text-to-image/getImageGenerator';
import { getPhotobank } from '../../../../ai/text-to-image/getPhotobank';
import { NothingImageGenerator } from '../../../../ai/text-to-image/nothing/NothingImageGenerator';
import { ImagePromptResultsPicker } from '../../../../components/ImagePromptResultsPicker/ImagePromptResultsPicker';
import { Modal } from '../../../../components/Modal/00-Modal';
import { Select } from '../../../../components/Select/Select';
import { LoadingInteractiveImage } from '../../../../components/TaskInProgress/LoadingInteractiveImage';
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

    const [generatorType, setGeneratorType] = useState<'PHOTOBANK' | 'GENERATOR'>('PHOTOBANK');
    const clientId = useClientId({ isVerifiedEmailRequired: true });
    const imageGenerator = useMemo(() => {
        if (!clientId) {
            return new NothingImageGenerator();
        }

        if (generatorType === 'PHOTOBANK') {
            return getPhotobank(clientId);
        } else if (generatorType === 'GENERATOR') {
            return getImageGenerator(clientId);
        } else {
            throw new Error(`Unknown generator type: ${generatorType}`);
        }
    }, [generatorType, clientId]);

    const prompt = useMemo<DallePrompt>(
        // TODO: [🧠] ImageGenerator should have (static) method to create best prompt - image prompt wizzard
        () => ({
            content: promptContent!,
            model: `dalle-${USE_DALLE_VERSION}`,
            modelSettings: USE_DALLE_MODEL_SETTINGS,
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

            if (generatorType !== 'PHOTOBANK' && newResults[0]) {
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
            setGeneratorType('GENERATOR');
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
                        {isAdvanced && runnedCount >= 1 && (
                            <Select
                                value={generatorType}
                                onChange={(generatorType) => {
                                    setGeneratorType(generatorType);
                                }}
                                visibleButtons={0}
                                options={{
                                    PHOTOBANK: 'Photobank',
                                    GENERATOR: 'Generate',
                                }}
                            />
                        )}
                        <button
                            className={classNames('button', styles.callToAction)}
                            onClick={runImageGenerator}
                            disabled={isRunning}
                        >
                            {/* TODO: [🧠][👳‍♂️] Some way how to preserve width of the button even with changing texts */}

                            {isRunning && <LoadingInteractiveImage width={55} height={35} style={{ margin: -10 }} />}
                            {!isRunning && generatorType === 'PHOTOBANK' && <>Search</>}
                            {isRunning && generatorType === 'PHOTOBANK' && <>Searching</>}
                            {!isRunning && generatorType === 'GENERATOR' && <>Generate</>}
                            {isRunning && generatorType === 'GENERATOR' && <>Generating</>}
                        </button>

                        {!isAdvanced ? (
                            <button
                                className={classNames('button', styles.secondaryAction)}
                                onClick={() => setAdvanced(true)}
                            >
                                More
                            </button>
                        ) : (
                            <button
                                className={classNames('button', styles.secondaryAction)}
                                onClick={() => setAdvanced(false)}
                            >
                                Simple
                            </button>
                        )}
                    </>
                ) : (
                    <button
                        className={classNames('button', styles.callToAction)}
                        style={{
                            backgroundImage: `url(${selected.imageSrc})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            color: `#ffffff`,
                            textShadow: `1px 1px 2px #000000, 0 0 1em #3d0606, 0 0 0.2em #03182c`,
                        }}
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
 * TODO: !!! Annotate
 */
