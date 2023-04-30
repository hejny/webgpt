import { Passions_Conflict } from '@next/font/google';
import { forTime } from 'waitasecond';
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
            {/* 
            <Image
                className={styles.primaryImage}
                alt={children}
                src={aiai}
                draggable="false"
                placeholder="empty" /* <- TODO: Blur * /
            />
            */}
            <svg
                className={styles.primaryImage}
                ref={async (svgElement) => {
                    if (!svgElement) {
                        return;
                    }

                    await forTime(1000 /* !!! Remove delayes after fix */);

                    console.log(svgElement);
                    await handwriteText({
                        // TODO: !!! Pass color here
                        // TODO: !!! Work with aspect ratio
                        text: children,
                        speed: 7,
                        bias: 0.75,
                        width: 1.5,
                        style: 'FancyTall',
                        svgElement,
                    });
                }}
            >
                {/* <path id="path" d=""></path> */}
            </svg>

            <span className={classNames(passionsConflictFont.className, styles.textFallback)}>{children}</span>
        </div>
    );
}

// TODO: !!! Integrate https://www.calligrapher.ai/ on frontend (or at least at backend)
// TODO: [🎎] alt={removeMarkdownFormatting(removeMarkdownLinks(
