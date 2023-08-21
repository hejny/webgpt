import Script from 'next/script';
import spaceTrim from 'spacetrim';

/**
 * Renders the AnalyticsAndIntegrations component ⁘
 * 
 * @param {AnalyticsAndIntegrationsProps} props - The props for the component
 * @returns {JSX.Element} - The rendered component
 */
interface AnalyticsAndIntegrationsProps {}

/**
 * @@@
 */
export function AnalyticsAndIntegrations(props: AnalyticsAndIntegrationsProps) {
    const {} = props;

    return (
        <>
            {/* ===[ SmartLook: ]=== */}
            <script
                // key="smartlook"
                dangerouslySetInnerHTML={{
                    __html: spaceTrim(`

                        console.info('🔃 Loading SmartLook');

                        window.smartlook||(function(d) {
                        var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
                        var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
                        c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
                        })(document);
                        smartlook('init', '3515f37080509c745223d0bd7158fa07f3b6bb73', { region: 'eu' });
                    `),
                }}
            />
            {/* ===[ /SmartLook ]=== */}

            {/* ================================================================================= */}

            {/* ===[ Senry: ]=== */}
            {/* Note: Installing sentry via browser <script> to separate main bundle and external service */}
            {/* The sentry script is tinytiny so it is ok to be sync */}
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <script
                // key="sentry"
                src="https://js.sentry-cdn.com/c7941e970cfe4a899d64b41c3cecc601.min.js"
                crossOrigin="anonymous"
            />
            <script
                // key="log"
                dangerouslySetInnerHTML={{
                    __html: spaceTrim(`
                        console.info('🔃 Loaded Sentry');
                    `),
                }}
            />
            {/* ===[ /Senry ]=== */}

            {/* ================================================================================= */}

            {/* ===[ Google Analytics: ]=== */}

            {/* TODO: In export there CAN be an option for add misc integrations like Google Analytics, Sentry,  */}
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-LWLFJ4PBRH" />
            <Script id="google-analytics">
                {spaceTrim(`

                    console.info('🔃 Loading Google analytics');

                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
            
                    gtag('config', 'G-LWLFJ4PBRH');
                `)}
            </Script>
            {/* ===[ /Google Analytics ]=== */}
        </>
    );
}

/**
 * TODO: Unhardcode IDs like GA_MEASUREMENT_ID
 * TODO: !! Maybe use <InlineScript/> and/or <ExportCommentedBlock/> component
 * TODO: !! Also isCookiesAllowed - only activate if cookies are allowed
 */
