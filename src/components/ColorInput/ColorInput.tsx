import { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Color } from '../../utils/color/Color';
import { textColor } from '../../utils/color/operators/furthest';
import { WithTake } from '../../utils/take/interfaces/ITakeChain';
import { take } from '../../utils/take/take';
import styles from './ColorInput.module.css';

interface ColorInputProps {
    defaultValue: Color;
    onChange(color: WithTake<Color>): void;
}

/**
 * @@
 */
export function ColorInput(props: ColorInputProps) {
    const { defaultValue, onChange } = props;

    const [color, setColor] = useState(take(defaultValue));
    const [isOpen, setOpen] = useState(false);

    return (
        <div className={styles.ColorInput}>
            <div
                // TODO: ACRY aria
                className={styles.colorPreview}
                style={{ backgroundColor: color.toHex(), border: `2px solid ${color.then(textColor).toHex()}` }}
                onClick={() => setOpen(!isOpen)}
            />

            {isOpen && (
                <SketchPicker
                    color={color}
                    onChange={({ rgb: { r, g, b } }) => {
                        setColor(Color.fromValues(r, g, b));
                    }}
                    onChangeComplete={({ rgb: { r, g, b } }) => {
                        onChange(Color.fromValues(r, g, b));
                    }} /*presetColors*/
                />
            )}
        </div>
    );
}

/**
 * !!!! debounce here
 */
