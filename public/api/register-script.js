register();

async function register() {
    console.info(`🔌 Registering your page`);

    console.info('hostname', window.location.hostname);
    console.info('host', window.location.host);

    const response = await fetch('https://app.ai.hejny.org/api/register', {
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
