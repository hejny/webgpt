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

    return (
        <div className={styles.ColorInput}>
            <input
                type="color"
                value={color.toHex()}
                onChange={(event) => {
                    const color = Color.fromHex(event.target.value);
                    setColor(color);
                    onChange(color);
                }}
            />
            <input
                type="text"
                value={color.toHex()}
                onChange={(event) => {
                    const color = Color.fromHex(event.target.value);
                    setColor(color);
                    onChange(color);
                }}
            />
        </div>
    );
}
