const { join } = require('path');

module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'cs'],
        localeDetection: false,
    },
    localePath: join(__dirname, 'locales'),
    localeExtension: 'yml',
};

/**
 * TODO: Fallback locales @see https://github.com/i18next/next-i18next#fallback-locales
 * TODO: https://github.com/i18next/next-i18next#4-declaring-namespace-dependencies
 */
