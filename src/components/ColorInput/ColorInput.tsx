import { useState } from 'react';
import SketchPicker, { PresetColor } from 'react-color/lib/components/sketch/Sketch';
import { Color } from '../../utils/color/Color';
import { useClickOutside } from '../../utils/hooks/useClickOutside';
import { WithTake } from '../../utils/take/interfaces/ITakeChain';
import { take } from '../../utils/take/take';
import { ColorPreview } from '../ColorPreview/ColorPreview';
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
    const { isOpen, buttonRef, windowRef } = useClickOutside();

    return (
        <>
            <div ref={buttonRef}>
                <ColorPreview {...{ className, color }} />
            </div>

            <div className={styles.colorPicker} ref={windowRef}>
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
