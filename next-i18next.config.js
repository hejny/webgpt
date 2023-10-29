const { join } = require('path');

module.exports = {
    i18n: {
        defaultLocale: 'cs', // <- TODO: !! When using domains, switch defaultLocale back to 'en'
        locales: ['en', 'cs'],
        localeDetection: false,
    },
    localePath: join(__dirname, 'locales'),
    localeExtension: 'yml',

    // TODO: !! Use here domains webgpt.cz, 1-2i.com
};

/**
 * TODO: Fallback locales @see https://github.com/i18next/next-i18next#fallback-locales
 * TODO: https://github.com/i18next/next-i18next#4-declaring-namespace-dependencies
 */
