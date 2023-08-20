import { ReactNode, useEffect, useRef, useState } from 'react';
import { classNames } from '../../utils/classNames';
import { useNumericStateInLocalstorage } from '../../utils/hooks/useNumericStateInLocalstorage';
import { string_css_class, string_title } from '../../utils/typeAliases';
import styles from './Hint.module.css';

interface HintProps {
    id: string;
    title: string_title;
    children?: ReactNode;

    reapearCount: number;


        /**
     * Optional CSS class name which will be added to root element
     */
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
            const right = window.document.body.clientWidth - left;
            const bottom = window.document.body.clientHeight - top;

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
