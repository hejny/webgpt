import { ReactNode, useEffect, useRef } from 'react';
import { string_css_class, string_title } from '../../utils/typeAliases';
import styles from './Hint.module.css';

interface HintProps {
    title: string_title;
    children?: ReactNode;
    className?: string_css_class;
}

/**
 * @@
 */
export function Hint(props: HintProps) {
    const { title, children, className } = props;

    const hintTargetRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const hintTarget = hintTargetRef.current;

        if (!hintTarget) {
            return;
        }

        const hint = document.createElement('div');
        document.body.appendChild(
            hint, // <- TODO: [🧠] Is this better to append in body or hintElement
        );
        hint.innerText = title;

        hint.className = styles.hint;
        const { top, left, width, height } = hintTarget.getBoundingClientRect();
        const right = document.body.clientWidth - left;
        const bottom = document.body.clientHeight - top;

        hint.style.position = 'fixed';
        hint.style.bottom = bottom - height / 2 + 'px';
        hint.style.right = right + 'px';
        const highlightPadding = 5; /* <- TODO: !!!! [🧠] TO CSS + Tweak  */
        const highlight = document.createElement('div');
        document.body.appendChild(
            highlight,
            // <- TODO: [🧠] Is this better to append in body or hintElement
            // <- Note: hintHighlightElement really should be sibling of hintContainer
        );
        highlight.className = styles.highlight;
        highlight.style.position = 'fixed';
        highlight.style.bottom = bottom - height - highlightPadding + 'px';
        highlight.style.right = right - width - highlightPadding + 'px';
        highlight.style.width = width + 2 * highlightPadding + 'px';
        highlight.style.height = height + 2 * highlightPadding + 'px';

        hintTarget.addEventListener('click', () => {
            console.info(` 🗯 Complete hint ${title} `);
            hint.style.opacity = '0';
            highlight.style.opacity = '0';
        });

        /* 
        element.addEventListener('mouseenter', () => {
            hintContainer.style.opacity = '1';
        });

        element.addEventListener('mouseleave', () => {
            hintContainer.style.opacity = '0';
        });
        */

        return () => {
            document.body.removeChild(hint);
            document.body.removeChild(highlight);
        };
    }, [hintTargetRef, title]);

    return (
        <div ref={hintTargetRef} {...{ className }}>
            {children}
        </div>
    );
}

/**
 * TODO: !!!!! Hint: Fade after interaction
 * TODO: !!!!! Hint: Save number of interactions in localStorage and reapear on next load ONLY if less then 5 interationns
 * TODO: !!!!! Hint: Reapear (or put back title) after mouseover certain time
 * TODO: !!!!! Hint: data-ai-hint-highlight with the box and color
 * TODO: !!!!! Hint: data-ai-hint-after
 * TODO: !!!! ACRY use window.document, window.localStorage,...
 */
