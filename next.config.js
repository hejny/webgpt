const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n,
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    images: {
        /*
        remotePatterns: [
            {
                // [🧑]
                protocol: 'https',
                hostname: 'www.gravatar.com',
                port: '',
                pathname: '/avatar/**',
            },
        ],
        */
    },
};

module.exports = nextConfig;
