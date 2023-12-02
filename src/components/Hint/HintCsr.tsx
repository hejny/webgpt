import { useEffect, useRef, useState } from 'react';
import { classNames } from '../../utils/classNames';
import { useNumericStateInLocalstorage } from '../../utils/hooks/useNumericStateInLocalstorage';
import styles from './Hint.module.css';
import type { HintProps } from './HintProps';

/**
 * Renders any content wrapped in a hint
 *
 * @private only used in <Hint/> component
 */
export function HintCsr(props: HintProps) {
    const { id, title, children, reapearCount, className, isDisabled } = props;

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

        if (isDisabled || isClicked || !isLoadedClickedCount || clickedCount > reapearCount) {
            return;
        }

        const root = window.document.getElementById('ui-root')!;

        for (const oldHintElement of root.querySelectorAll(`.hint-${id}`)) {
            oldHintElement.parentElement!.removeChild(oldHintElement);
        }

        // Hint:
        const hint = window.document.createElement('div');
        root.appendChild(
            hint, // <- TODO: [🧠] Is this better to append in root or hintElement
        );
        hint.innerText = title;
        hint.className = classNames(`hint-${id}`, styles.hint!);

        // Highlight:
        const highlight = window.document.createElement('div');
        root.appendChild(
            highlight,
            // <- TODO: [🧠] Is this better to append in root or hintElement
            // <- Note: hintHighlightElement really should be sibling (not child) of hintContainer
        );
        highlight.className = classNames(`hint-${id}`, styles.highlight!);

        const updatePositionInterval = setInterval(() => {
            const { top, left, width, height } = hintTarget.getBoundingClientRect();

            // Common
            // Note: Using body.scrollWidth to be aware of scrollbars on desktops
            const right = window.document.body.scrollWidth - left;
            // Note: Using window.innerHeight to be aware of top navigation bar on mobiles
            const bottom = window.innerHeight - top;

            // Hint:
            hint.style.position = 'fixed';
            hint.style.bottom = bottom - height / 2 + 'px';
            hint.style.right = right + 'px';

            // Highlight:
            const highlightPadding = 4; /* <- TODO: [🧠] TO CSS/config  */
            highlight.style.position = 'fixed';
            highlight.style.bottom = bottom - height - highlightPadding + 'px';
            highlight.style.right = right - width - highlightPadding + 'px';
            highlight.style.width = width + 2 * highlightPadding + 'px';
            highlight.style.height = height + 2 * highlightPadding + 'px';
        }, 100);

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
            clearInterval(updatePositionInterval);
            try {
                root.removeChild(hint);
                root.removeChild(highlight);
                hintTarget.removeEventListener('click', hintTargetClickHandler);
            } catch (error) {
                if (!(error instanceof Error)) {
                    throw error;
                }

                if (error.message.includes(`Failed to execute 'removeChild'`)) {
                    // Note: Swallow the error - React has already removed the element
                    return;
                }

                throw error;
            }
        };
    }, [
        isDisabled,
        id,
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
