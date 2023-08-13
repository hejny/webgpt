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
    hint.innerHTML = hintText;

    hint.className = styles.hint /* <- !!!!! Css file will be removed */;

    const { top, left, width, height } = hintTarget.getBoundingClientRect();
    const right = document.body.clientWidth - left;
    const bottom = document.body.clientHeight - top;

    hint.style.position = 'fixed';
    hint.style.bottom = bottom - height / 2 + 'px';
    hint.style.right = right + 'px';
    hint.style.padding = '10px';
    hint.style.paddingRight = '20px';
    hint.style.color = '#000000';
    hint.style.backgroundImage = 'url(/icons/hint.svg)';
    hint.style.backgroundSize = '100% 100%';

    const highlightPadding = 5; /* <- TODO: !!!! [🧠] Tweak */
    const highlight = document.createElement('div');
    document.body.appendChild(
        highlight,
        // <- TODO: [🧠] Is this better to append in body or hintElement
        // <- Note: hintHighlightElement really should be sibling of hintContainer
    );
    highlight.className = styles.highlight /* <- !!!!! Css file will be removed */;
    highlight.style.position = 'fixed';
    highlight.style.bottom = bottom - height - highlightPadding + 'px';
    highlight.style.right = right - width - highlightPadding + 'px';
    highlight.style.width = width + 2 * highlightPadding + 'px';
    highlight.style.height = height + 2 * highlightPadding + 'px';

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
 * TODO: !!!!! Hint: Fade after interaction
 * TODO: !!!!! Hint: Save number of interactions in localStorage and reapear on next load ONLY if less then 5 interationns
 * TODO: !!!!! Hint: Reapear (or put back title) after mouseover certain time
 * TODO: !!!!! Hint: data-ai-hint-highlight with the box and color
 * TODO: !!!!! Hint: data-ai-hint-after
 * TODO: !!!! ACRY use window.document, window.localStorage,...
 */
