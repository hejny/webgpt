import { string_url_image } from '@promptbook/types';
import { useState } from 'react';
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
    const { results, onSelect, onPick, className } = props;

    const styles = useStyleModule(import('./ImagePromptResultsPicker.module.css'));

    const [selected, setSelected] = useState<null | string_url_image>(null);

    return (
        <div className={classNames(className, styles.ImagePromptResultsPicker)}>
            <div className={styles.actions}>
                {selected && (
                    <button
                        className={styles.pick}
                        onClick={() => {
                            onPick(results.find((result) => result.imageSrc === selected)!);
                        }}
                    >
                        Pick
                    </button>
                )}
            </div>
            <div className={styles.gallery}>
                {results.map((result) => (
                    <div
                        key={result.imageSrc}
                        onClick={() => {
                            if (result.imageSrc !== selected) {
                                setSelected(result.imageSrc);
                                onSelect(result);
                            } else {
                                setSelected(null);
                                onSelect(null);
                            }
                        }}
                        className={classNames(styles.result, selected === result.imageSrc && styles.isPicked)}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element*/}
                        <img src={result.imageSrc} alt={result.normalizedPrompt.content} draggable={false} />
                    </div>
                ))}
            </div>{' '}
        </div>
    );
}
