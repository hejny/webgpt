import { useState } from 'react';
import { Color } from '../../utils/color/Color';
import styles from './ColorInput.module.css';

interface ColorInputProps {
    defaultValue: Color;
    onChange(color: Color): void;
}

/**
 * @@
 */
export function ColorInput(props: ColorInputProps) {
    const { defaultValue, onChange } = props;

    const [color, setColor] = useState(defaultValue);
    const [colorString, setColorString] = useState(color.toHex());

    return (
        <div className={styles.ColorInput}>
            <input
                type="color"
                value={color.toHex()}
                onChange={(event) => {
                    const color = Color.fromHex(event.target.value);
                    setColor(color);
                    setColorString(color.toHex() /* <- TODO: Try to preserve the format use choosen */);
                    onChange(color);
                }}
            />
            <input
                type="text"
                value={colorString}
                onChange={(event) => {
                    setColorString(event.target.value);
                    try {
                        const color = Color.fromString(event.target.value);
                        setColor(color);
                        onChange(color);
                    } catch (error) {
                        // Note: Swallow error because it is not a valid color yet
                    }
                }}
            />
        </div>
    );
}
