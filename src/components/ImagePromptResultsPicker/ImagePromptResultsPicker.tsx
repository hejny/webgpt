import { ImagePrompt } from '../../ai/text-to-image/0-interfaces/ImagePrompt';
import { ImagePromptResult } from '../../ai/text-to-image/0-interfaces/ImagePromptResult';
import { classNames } from '../../utils/classNames';
import { string_css_class } from '../../utils/typeAliases';
import styles from './ImagePromptResultsPicker.module.css';

interface ImagePromptResultsPickerProps {
    /**
     * Prompt which generated the results
     */
    readonly prompt: ImagePrompt;

    /**
     * Results from the text to image prompt
     */
    readonly results: Array<ImagePromptResult>;

    /**
     * Callback which is called when the user picks a result
     */
    onPick(result: ImagePromptResult): void;

    /**
     * Optional CSS class name which will be added to root element
     */
    readonly className?: string_css_class;
}

/**
 * Renders a @@
 */
export function ImagePromptResultsPicker(props: ImagePromptResultsPickerProps) {
    const { prompt, results, onPick, className } = props;
    return (
        <div className={classNames(className, styles.ImagePromptResultsPicker)}>
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
