const removeImports = require('next-remove-imports')();
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n,
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    images: {
        remotePatterns: [
            {
                unoptimized: true,
                protocol: 'https',
                hostname: 'cdn.midjourney.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        });
        return config;
    },
    staticPageGenerationTimeout: 60 * 5 /* 5 minutes */,
};

module.exports = removeImports(nextConfig);
