import { RefCallback } from 'react';
import styles from './makeHintRef.module.css';

export function makeHintRef(hintText: string): RefCallback<HTMLElement> {
    return function (element) {
        if (!element) {
            return;
        }

        // !!!! Finish

        const hintContainer = document.createElement('div');
        hintContainer.className = styles.container;

        const { top, left, height } = element.getBoundingClientRect();
        hintContainer.style.position = 'fixed';
        hintContainer.style.top = top + height / 2 + 'px';
        hintContainer.style.left = left + 'px';
        document.body.appendChild(hintContainer);

        const hintTextElement = document.createElement('div');
        hintTextElement.className = styles.text;
        hintTextElement.textContent = hintText;
        hintContainer.appendChild(hintTextElement);

        const hintArrow = document.createElement('div');
        hintArrow.className = styles.arrow;
        hintContainer.appendChild(hintArrow);

        /* 
        element.addEventListener('mouseenter', () => {
            hintContainer.style.opacity = '1';
        });

        element.addEventListener('mouseleave', () => {
            hintContainer.style.opacity = '0';
        });

        */
    };
}
