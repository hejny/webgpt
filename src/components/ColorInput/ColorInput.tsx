import { useState } from 'react';
import { SketchPicker } from 'react-color';
import { PresetColor } from 'react-color/lib/components/sketch/Sketch';
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

    // !!!! Close on click outside

    return (
        <>
            <div
                // TODO: ACRY aria
                className={classNames(className, styles.colorPreview)}
                style={{
                    backgroundColor: color.toHex(),
                    border: `2px solid ${color.then(textColor).toHex()}`,
                    outline: `2px solid ${color.toHex()}`,
                }}
                onClick={() => setOpen(!isOpen)}
            ></div>
            {isOpen && (
                <SketchPicker
                    {...{ color, presetColors }}
                    className={styles.colorPicker}
                    onChange={({ rgb: { r, g, b } }) => {
                        setColor(Color.fromValues(r, g, b));
                    }}
                    onChangeComplete={({ rgb: { r, g, b } }) => {
                        onChange(Color.fromValues(r, g, b));
                    }}
                    disableAlpha={true}
                />
            )}
        </>
    );
}
