import { ReactNode, useEffect, useRef, useState } from 'react';
import { useNumericStateInLocalstorage } from '../../utils/hooks/useNumericStateInLocalstorage';
import { string_css_class, string_title } from '../../utils/typeAliases';
import styles from './Hint.module.css';

interface HintProps {
    id: string;
    title: string_title;
    children?: ReactNode;

    reapearCount: number;

    className?: string_css_class;
}

/**
 * @@
 */
export function Hint(props: HintProps) {
    const { id, title, children, reapearCount, className } = props;

    const [isClicked, setClicked] = useState(false);
    const [clickedCount, setClickedCount, isLoadedClickedCount] = useNumericStateInLocalstorage(
        `hint-clicks-on-${id}`,
        0,
    );
    const hintTargetRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const hintTarget = hintTargetRef.current;

        if (!hintTarget) {
            return;
        }

        if (isClicked || !isLoadedClickedCount || clickedCount > reapearCount) {
            return;
        }

        const hint = window.document.createElement('div');
        window.document.body.appendChild(
            hint, // <- TODO: [🧠] Is this better to append in body or hintElement
        );
        hint.innerText = title;

        hint.className = styles.hint!;
        const { top, left, width, height } = hintTarget.getBoundingClientRect();
        const right = window.document.body.clientWidth - left;
        const bottom = window.document.body.clientHeight - top;

        hint.style.position = 'fixed';
        hint.style.bottom = bottom - height / 2 + 'px';
        hint.style.right = right + 'px';
        const highlightPadding = 5; /* <- TODO: [🧠] TO CSS/config  */
        const highlight = window.document.createElement('div');
        window.document.body.appendChild(
            highlight,
            // <- TODO: [🧠] Is this better to append in body or hintElement
            // <- Note: hintHighlightElement really should be sibling of hintContainer
        );
        highlight.className = styles.highlight!;
        highlight.style.position = 'fixed';
        highlight.style.bottom = bottom - height - highlightPadding + 'px';
        highlight.style.right = right - width - highlightPadding + 'px';
        highlight.style.width = width + 2 * highlightPadding + 'px';
        highlight.style.height = height + 2 * highlightPadding + 'px';

        const hintTargetClickHandler = () => {
            console.info(` 🗯 Complete hint ${title} `);
            setClicked(true);
            setClickedCount(clickedCount + 1);
        };
        hintTarget.addEventListener('click', hintTargetClickHandler);

        /*
            element.addEventListener('mouseenter', () => {
                hintContainer.style.opacity = '1';
            });

            element.addEventListener('mouseleave', () => {
                hintContainer.style.opacity = '0';
            });
            */

        return () => {
            window.document.body.removeChild(hint);
            window.document.body.removeChild(highlight);
            hintTarget.removeEventListener('click', hintTargetClickHandler);
        };
    }, [
        hintTargetRef,
        title,
        isClicked,
        setClicked,
        clickedCount,
        setClickedCount,
        isLoadedClickedCount,
        reapearCount,
    ]);

    return (
        <div ref={hintTargetRef} {...{ title, className }}>
            {children}
        </div>
    );
}

/**
 * TODO: Hint: Fade animation after interaction
 * TODO: Hint: Allow to configure number of interactions to remove hint permanently
 * TODO: Hint: Invalidate hint click count in localstorage after certain time
 * TODO: Hint: data-ai-hint-after
 * Hint: Reapear after mouseover [🧠] or maybe title is enough
 */
