import { Head, Html, Main, NextScript } from 'next/document';
import { AnalyticsAndIntegrations } from '../components/AnalyticsAndIntegrations/AnalyticsAndIntegrations';

export default function Document() {
    return (
        <Html>
            <Head />
            <AnalyticsAndIntegrations />
            {/* TODO: Why is <AnalyticsAndIntegrations /> not working here? */}
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
