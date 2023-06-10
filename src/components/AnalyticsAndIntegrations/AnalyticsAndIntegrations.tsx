import spaceTrim from 'spacetrim';
import { useMode } from '../../utils/hooks/useMode';

interface AnalyticsAndIntegrationsProps {
    isSmartsuppHidden?: boolean;
}

/**
 * @@
 */
export function AnalyticsAndIntegrations(props: AnalyticsAndIntegrationsProps) {
    const { isSmartsuppHidden } = props;
    const { isPresenting } = useMode();

    // TODO: !! Also isCookiesAllowed
    // TODO: !!! Allow widget on gallery page

    console.log('AnalyticsAndIntegrations', { isPresenting });

    return (
        <>
            {JSON.stringify({ isPresenting })}
            {/* ===[ SmartsUpp: ]=== */}

            <script
                // id="smartsupp"
                dangerouslySetInnerHTML={{
                    __html: spaceTrim(`

                        if(${isPresenting ? 'true' : 'false'}) {
                            console.log('🔃 NOT Loading SmartsUpp');
                            return;
                        }

                        console.log('🔃 Loading SmartsUpp');

                        var _smartsupp = _smartsupp || {};
                        _smartsupp.key = 'f2e0946d05c186b5a6686ba408581ea863a710d4';

                        // --- Customization ---
                        _smartsupp.color = '#303030';
                        _smartsupp.hideWidget = ${isSmartsuppHidden ? 'true' : 'false'};

                        window.smartsupp||(function(d) {
                        var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
                        s=d.getElementsByTagName('script')[0];c=d.createElement('script');
                        c.type='text/javascript';c.charset='utf-8';c.async=true;
                        c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
                        })(document);

                        
                        
                    `),
                }}
            />
            <style
                data-export-ignore
                dangerouslySetInnerHTML={{
                    // TODO: !!! This should be excluded from export
                    __html: spaceTrim(`
                        #chat-application{
                            color-scheme: light; /* <- Note: To enable transparent iframe borders */
                        }
                    `),
                }}
            />
            {/* ===[ /SmartsUpp ]=== */}

            {/* ===[ SmartLook: ]=== */}
            <script
                // key="smartlook"
                dangerouslySetInnerHTML={{
                    __html: spaceTrim(`

                        console.log('🔃 Loading SmartLook');

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

            {/* ===[ Senry: ]=== */}
            {/* Note: Installing sentry via browser <script> to separate main bundle and external service */}
            {/* The sentry script is tinytiny so it is ok to be sync */}
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <script
                // key="sentry"
                src="https://js.sentry-cdn.com/c7941e970cfe4a899d64b41c3cecc601.min.js"
                crossOrigin="anonymous"
            />
            {/* ===[ /Senry ]=== */}

            {/* ===[ Log: ]=== */}
            <script
                // key="log"
                dangerouslySetInnerHTML={{
                    __html: spaceTrim(`
                        console.log('🔃 Loaded scripts integrations', ${JSON.stringify({
                            isPresenting,
                            isSmartsuppHidden,
                        })});
                    `),
                }}
            />
            {/* ===[ /Log ]=== */}
        </>
    );
}

/**
 * TODO: !! API key in config - but it temporarly does not matter if it is in source code because it is public key
 * TODO: !!!! Do not include ANY of this in export
 */
