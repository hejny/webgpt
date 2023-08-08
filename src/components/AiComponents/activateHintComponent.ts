import spaceTrim from 'spacetrim';
import styles from './activateHintComponent.module.css';

export function activateHintComponent(hintTarget: HTMLElement) {
    const hintText = hintTarget.getAttribute('title');
    if (!hintText) {
        throw new Error('Hint must have title attribute');
    }
    hintTarget.removeAttribute('title');

    const hint = document.createElement('div');
    document.body.appendChild(
        hint, // <- TODO: [🧠] Is this better to append in body or hintElement
    );

    hint.className = styles.hint;

    const { top, left, width, height } = hintTarget.getBoundingClientRect();
    const right = document.body.clientWidth - left;
    const bottom = document.body.clientHeight - top;

    hint.style.position = 'fixed';
    hint.style.bottom = bottom - height / 2 + 'px';
    hint.style.right = right + 'px';

    hint.innerHTML += spaceTrim(
        // Note: Rectangle label with text, rouded corners and arrow pointing to the element to the right
        `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
                
            >
                <rect x="0" y="0" width="100" height="100" rx="10" ry="10" fill="white" />
                <text x="50" y="50" dominant-baseline="middle" text-anchor="middle" font-size="20px" fill="black">${hintText}</text>
                <path d="M 100 50 L 90 50 L 90 40 L 80 50 L 90 60 L 90 50 L 100 50" fill="black" />
            </svg>

        `,
    );

    const highlight = document.createElement('div');
    document.body.appendChild(
        highlight,
        // <- TODO: [🧠] Is this better to append in body or hintElement
        // <- Note: hintHighlightElement really should be sibling of hintContainer
    );
    highlight.className = styles.highlight;
    highlight.style.position = 'fixed';
    highlight.style.bottom = bottom - height + 'px';
    highlight.style.right = right - width + 'px';
    highlight.style.width = width + 'px';
    highlight.style.height = height + 'px';

    /* 
    element.addEventListener('mouseenter', () => {
        hintContainer.style.opacity = '1';
    });

    element.addEventListener('mouseleave', () => {
        hintContainer.style.opacity = '0';
    });

    */
}

/**
 * TODO: !!!!! Hint: Placement
 * TODO: !!!!! Hint: Better design
 * TODO: !!!!! Hint: Fade after interaction
 * TODO: !!!!! Hint: Save number of interactions in localStorage and reapear on next load ONLY if less then 5 interationns
 * TODO: !!!!! Hint: Reapear (or put back title) after mouseover certain time
 * TODO: !!!!! Hint: data-ai-hint-highlight with the box and color
 * TODO: !!!!! Hint: data-ai-hint-after
 * TODO: !!!! ACRY use window.document, window.localStorage,...
 */
