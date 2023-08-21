const removeImports = require('next-remove-imports')();

/** @type {import('next').NextConfig} */
const nextConfig = {
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
            // TODO: !!! Add CDN
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
