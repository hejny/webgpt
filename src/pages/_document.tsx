import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head />

            {/* TODO: Why is <AnalyticsAndIntegrations /> not working here? */}
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
