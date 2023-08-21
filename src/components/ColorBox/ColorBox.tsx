import { Color } from '../../utils/color/Color';
import { textColor } from '../../utils/color/operators/furthest';
import { take } from '../../utils/take/take';
import styles from './ColorBox.module.css';

/**
 * Renders a color box component ⁘
 * 
 * @param {ColorBoxProps} props - The props object containing the color value
 * @returns {JSX.Element} - The rendered color box component
 */
interface ColorBoxProps {
    /**
     * Color to show in the box
     */
    value: Color;
}

/**
 * @@@
 */
export function ColorBox(props: ColorBoxProps) {
    const { value } = props;

    return (
        <div
            className={styles.ColorBox}
            style={{ color: take(value).then(textColor).toHex(), backgroundColor: value.toHex() }}
        >
            {value.toHex()}
        </div>
    );
}
