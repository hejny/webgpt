import { Passions_Conflict } from '@next/font/google';
import { useEffect } from 'react';
import { forTime } from 'waitasecond';
import { classNames } from '../../utils/classNames';
import { Color } from '../../utils/color/Color';
import { randomItem } from '../../utils/color/randomItem';
import styles from './HandwrittenText.module.css';
import { handwriteText } from './utils/handwriteText';

interface HandwrittenTextProps {
    color: Color;
    children: string /* <- TODO: [🎎] Allow to have there full JSX children */;
}

const passionsConflictFont = Passions_Conflict({ weight: '400', style: 'normal', subsets: ['latin', 'latin-ext'] });

/**
 * @@@
 */
export function HandwrittenText(props: HandwrittenTextProps) {
    const { children, color } = props;

    // TODO: Can be isMounted done better
    let isMounted: boolean;
    useEffect(() => {
        isMounted = true;
        return () => {
            isMounted = false;
        };
    }, [children, color]);

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

                    await forTime(500);

                    console.log('!!!!', 'HandwrittenText', color.toHex());

                    if (!isMounted) {
                        console.log('!!!!', 'Not mounted');
                        return;
                    }

                    console.log('!!!!', 'Mounted');

                    await handwriteText({
                        // TODO: !!! Center
                        // TODO: !!! Work with aspect ratio
                        text: children,
                        color,
                        speed: 3 /* 7 */,
                        bias: 0.75,
                        width: 1.5,
                        style: randomItem('Fancy', 'FancyTall'),
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
