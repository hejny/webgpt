/**
 * Note: This script @@@
 */

// TODO: This should be dynamically taken from NEXT_PUBLIC_URL
// const REGISTER_URL = 'https://app.ai.hejny.org';
const REGISTER_URL = new URL('https://localhost:4444');

register();

async function register() {
    console.info(`🔌 Registering your page`);

    console.info('hostname', window.location.hostname);
    console.info('host', window.location.host);

    const response = await fetch(`${REGISTER_URL.href}/api/register`, {
        method: 'POST',
        body: JSON.stringify({ host: window.location.host }),
    });
    const { message } = await response.json();

    console.info(`🔌`, { message });
}

/**
 * TODO: !!! Info about the registration into console
 * TODO: !!! Popup form
 */
