import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head />

            {/* Note: <AnalyticsAndIntegrations /> is not working here */}
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
