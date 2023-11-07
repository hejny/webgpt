import { TextToImagePrompt } from '../../ai/text-to-image/interfaces/TextToImagePrompt';
import { TextToImagePromptResult } from '../../ai/text-to-image/interfaces/TextToImagePromptResult';
import { classNames } from '../../utils/classNames';
import { string_css_class } from '../../utils/typeAliases';
import styles from './TextToImagePromptResultsPicker.module.css';

interface TextToImagePromptResultsPickerProps {
    /**
     * Prompt which generated the results
     */
    readonly prompt: TextToImagePrompt;

    /**
     * Results from the text to image prompt
     */
    readonly results: Array<TextToImagePromptResult>;

    /**
     * Callback which is called when the user picks a result
     */
    onPick(result: TextToImagePromptResult): void;

    /**
     * Optional CSS class name which will be added to root element
     */
    readonly className?: string_css_class;
}

/**
 * Renders a @@
 */
export function TextToImagePromptResultsPicker(props: TextToImagePromptResultsPickerProps) {
    const { prompt, results, onPick, className } = props;
    return (
        <div className={classNames(className, styles.TextToImagePromptResultsPicker)}>
            {results.map((result, index) => (
                <div
                    key={index}
                    onClick={() => {
                        onPick(result);
                    }}
                    className={styles.result}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element*/}
                    <img src={result.imageSrc} alt={prompt.content} />
                </div>
            ))}
        </div>
    );
}
