import { Color } from '../../utils/color/Color';
import { textColor } from '../../utils/color/operators/furthest';
import { take } from '../../utils/take/take';
import styles from './ColorBox.module.css';

interface ColorBoxProps {
    /**
     * Color to show in the box
     */
    value: Color;
}

/**
 * @@
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
