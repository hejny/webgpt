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
        unoptimized: true /* <- TODO: I don’t want only unoptimize images from cdn.midjourney.com, maybe just do not use <img there */,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.midjourney.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'collboard.fra1.cdn.digitaloceanspaces.com',
                port: '',
                pathname: '/**',
                // <- TODO: This should be really taken dynamically from CDN value in config
            },
        ],
    },
    webpack: (config) => {
        // Note: [📍] Allow here to import raw content of html and markdown files
        config.module.rules.push({
            test: /\.html$/,
            use: 'raw-loader',
        });
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        });
        config.module.rules.push({
            test: /\.txt$/,
            use: 'raw-loader' /* <- [👩‍🌾] */,
        });
        return config;
    },
    staticPageGenerationTimeout: 60 * 5 /* 5 minutes */,

    async redirects() {
        return [
            {
                source: '/wallpaper/:wallpaper*',
                destination: '/:wallpaper*',
                permanent: true,
                locale: false,
            },
        ];
    },
};

module.exports = removeImports(nextConfig);
