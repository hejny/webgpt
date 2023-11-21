import { ImagePromptResult } from '../../ai/text-to-image/0-interfaces/ImagePromptResult';
import { classNames } from '../../utils/classNames';
import { useStyleModule } from '../../utils/hooks/useStyleModule';
import { string_css_class } from '../../utils/typeAliases';

interface ImagePromptResultsPickerProps {
    /**
     * Results from the text to image prompt
     */
    readonly results: Array<ImagePromptResult>;

    /**
     * The selected result
     */
    selected: ImagePromptResult | null;

    /**
     * Callback which is called when the user marks a result
     */
    onSelect(result: ImagePromptResult | null): void;

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
    const { results, selected, onSelect, onPick, className } = props;

    const styles = useStyleModule(import('./ImagePromptResultsPicker.module.css'));

    return (
        <div className={classNames(className, styles.ImagePromptResultsPicker)}>
            <div className={styles.actions}>
                {/*
                TODO: !!! Cleanup: Keep or remove
                selected && (
                    <button
                        className={styles.pick}
                        onClick={() => {
                            onPick(results.find((result) => result.imageSrc === selected)!);
                        }}
                    >
                        Pick
                    </button>
                    )*/}
            </div>
            <div className={styles.gallery}>
                {results.map((result) => (
                    <div
                        key={result.imageSrc}
                        onClick={() => {
                            if (result.imageSrc !== selected?.imageSrc) {
                                onSelect(result);
                            } else {
                                onSelect(null);
                            }
                        }}
                        className={classNames(styles.result, selected?.imageSrc === result.imageSrc && styles.isPicked)}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element*/}
                        <img src={result.imageSrc} alt={result.normalizedPrompt.content} draggable={false} />
                    </div>
                ))}
            </div>
        </div>
    );
}
