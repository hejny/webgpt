import { Head, Html, Main, NextScript } from 'next/document';
import { AnalyticsAndIntegrations } from '../components/AnalyticsAndIntegrations/AnalyticsAndIntegrations';

export default function Document() {
    return (
        <Html>
            <Head />
            <AnalyticsAndIntegrations />
            <body>
                <Main />

                <NextScript />
            </body>
        </Html>
    );
}
