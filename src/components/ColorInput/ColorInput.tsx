import { useEffect, useRef, useState } from 'react';
import SketchPicker, { PresetColor } from 'react-color/lib/components/sketch/Sketch';
import { classNames } from '../../utils/classNames';
import { Color } from '../../utils/color/Color';
import { textColor } from '../../utils/color/operators/furthest';
import { WithTake } from '../../utils/take/interfaces/ITakeChain';
import { take } from '../../utils/take/take';
import styles from './ColorInput.module.css';

interface ColorInputProps {
    className?: string;
    defaultValue: Color;
    onChange(color: WithTake<Color>): void;
    presetColors?: Array<PresetColor>;
}

/**
 * @@
 */
export function ColorInput(props: ColorInputProps) {
    const { className, defaultValue, onChange, presetColors } = props;

    const [color, setColor] = useState(take(defaultValue));
    const [isOpen, setOpen] = useState(false);

    const colorPreviewRef = useRef<HTMLDivElement | null>(null);
    const colorPickerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const clickHandler = (event: Event) => {
            if (!colorPreviewRef.current || !colorPickerRef.current) {
                return;
            }
            if (
                colorPreviewRef.current.contains(event.target as Node) ||
                colorPickerRef.current.contains(event.target as Node)
            ) {
                return;
            }

            setOpen(false);
        };
        window.document.addEventListener('click', clickHandler);
        return () => {
            window.document.removeEventListener('click', clickHandler);
        };
    });

    return (
        <>
            <div
                // TODO: ACRY aria
                className={classNames(className, styles.colorPreview)}
                ref={colorPreviewRef}
                style={{
                    backgroundColor: color.toHex(),
                    border: `2px solid ${color.then(textColor).toHex()}`,
                    outline: `2px solid ${color.toHex()}`,
                }}
                onClick={() => setOpen(!isOpen)}
            ></div>

            <div className={styles.colorPicker} ref={colorPickerRef}>
                {isOpen && (
                    <SketchPicker
                        {...{ color, presetColors }}
                        onChange={({ rgb: { r, g, b } }) => {
                            setColor(Color.fromValues(r, g, b));
                        }}
                        onChangeComplete={({ rgb: { r, g, b } }) => {
                            onChange(Color.fromValues(r, g, b));
                        }}
                        disableAlpha={true}
                    />
                )}
            </div>
        </>
    );
}
