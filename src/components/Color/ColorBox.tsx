import { Color } from '../../utils/color/Color';
import { textColor } from '../../utils/color/operators/furthest';
import { WithTake } from '../../utils/take/interfaces/ITakeChain';
import styles from './ColorBox.module.css';

interface ColorBoxProps {
    value: WithTake<Color>;
}

/**
 * @@
 */
export function ColorBox(props: ColorBoxProps) {
    const { value } = props;

    return (
        <div
            className={styles.ColorBox}
            style={{ color: value.then(textColor).toHex(), backgroundColor: value.toHex() }}
        >
            {value.toHex()}
        </div>
    );
}
