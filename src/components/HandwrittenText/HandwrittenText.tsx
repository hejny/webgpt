import { Passions_Conflict } from '@next/font/google';
import Image from 'next/image';
import aiai from '../../../public/handwritten/aiai/aiai.svg';
import { classNames } from '../../utils/classNames';
import styles from './HandwrittenText.module.css';

interface HandwrittenTextProps {
    children: string /* <- TODO: [🎎] Allow to have there full JSX children */;
}

const passionsConflictFont = Passions_Conflict({ weight: '400', style: 'normal', subsets: ['latin', 'latin-ext'] });

/**
 * @@@
 */
export function HandwrittenText(props: HandwrittenTextProps) {
    const { children } = props;
    return (
        <div className={styles.HandwrittenText}>
            <Image
                className={styles.primaryImage}
                alt={children}
                src={aiai}
                draggable="false"
                placeholder="empty" /* <- TODO: Blur */
            />
            <span className={classNames(passionsConflictFont.className, styles.textFallback)}>{children}</span>
        </div>
    );
}

// TODO: !!! Integrate https://www.calligrapher.ai/ on frontend (or at least at backend)
// TODO: [🎎] alt={removeMarkdownFormatting(removeMarkdownLinks(
