import { forImmediate } from 'waitasecond';
import type { string_url } from './typeAliases';

/**
 * Load and run an external script
 * @param src url of the script to load
 * @returns a promise that resolves when the script is loaded
 */
export function loadAndRunExternalScript(src: string_url): Promise<void> {
    return new Promise((resolve, reject) => {
        console.info(`Loading external script "${src}"`);
        const scriptElement = window.document.createElement('script');
        scriptElement.src = src;
        const headElement = window.document.getElementsByTagName('head')[0];

        if (!headElement) {
            throw new Error(`Head element not found!`);
        }

        headElement.appendChild(scriptElement);

        scriptElement.addEventListener('load', async () => {
            await forImmediate(/* to make time for the script to process its first frame of event-loop */);
            resolve();
        });
        // Note: this util returns void because there is no universal way how to destroy what was included by script
        // TODO: Probably cleanup in HTML
    });
}

/**
 * TODO: Checksums
 * TODO: loadAndRunExternalScriptOnce
 */
