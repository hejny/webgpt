import { isRunningInBrowser } from '../isRunningInWhatever';
import styles from './logDialogue.module.css';

let activeLogDiv: HTMLElement | null = null;

/**
 * Crates temporary div in document element and renders message into it
 * There can be only one log dialogue at a time
 */
export async function logDialogue(message: string): Promise<void> {
    //debugger;

    if (true === true) {
        // TODO: !!! Implement and remove this condition
        return;
    }

    if (!isRunningInBrowser()) {
        return;
    }

    if (activeLogDiv) {
        window.document.body.removeChild(activeLogDiv);
    }

    const logElement = window.document.createElement('div');
    logElement.innerText = message;
    logElement.className = styles.logDialogue!;

    window.document.body.appendChild(logElement);

    setTimeout(() => {
        if (!activeLogDiv) {
            return;
        }

        window.document.body.removeChild(activeLogDiv);
        activeLogDiv = null;
    }, 2000);
}

/**
 * TODO: !!! Just TS file
 * TODO: [🧠] Should this be awaited after element creation OR after element is removed?
 * TODO: In future use ILogDialogueOptions and IBaseMessage
 */
