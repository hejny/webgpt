import { Passions_Conflict } from '@next/font/google';
import Image from 'next/image';
import aiai from '../../../public/handwritten/aiai/aiai.svg';
import { classNames } from '../../utils/classNames';
import styles from './HandwrittenText.module.css';
import { handwriteText } from './utils/handwriteText';

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
            <canvas
                width={1000}
                height={1000}
                style={{ border: '1px solid red' }}
                ref={(canvasElement) => {
                    if (!canvasElement) {
                        return;
                    }
                    handwriteText({
                        text: 'AiAix',
                        speed: 7,
                        bias: 0.75,
                        width: 1.5,
                        style: 30,
                        canvasElement,
                    });
                }}
            />

            <span className={classNames(passionsConflictFont.className, styles.textFallback)}>{children}</span>
        </div>
    );
}

// TODO: !!! Integrate https://www.calligrapher.ai/ on frontend (or at least at backend)
// TODO: [🎎] alt={removeMarkdownFormatting(removeMarkdownLinks(
