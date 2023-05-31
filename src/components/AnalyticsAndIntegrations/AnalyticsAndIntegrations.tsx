import Script from 'next/script';
import spaceTrim from 'spacetrim';

/**
 * @@
 */
export function AnalyticsAndIntegrations() {
    return (
        <>
            <div style={{ display: 'none' }}>smartsupp</div>
            <Script id="smartsupp">
                {spaceTrim(`
                    var _smartsupp = _smartsupp || {};
                    _smartsupp.key = 'f2e0946d05c186b5a6686ba408581ea863a710d4';
                    window.smartsupp||(function(d) {
                    var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
                    s=d.getElementsByTagName('script')[0];c=d.createElement('script');
                    c.type='text/javascript';c.charset='utf-8';c.async=true;
                    c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
                    })(document);
                `)}
            </Script>
            <Script id="smartlook">
                {spaceTrim(`
                    window.smartlook||(function(d) {
                    var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
                    var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
                    c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
                    })(document);
                    smartlook('init', '3515f37080509c745223d0bd7158fa07f3b6bb73', { region: 'eu' });

            `)}
            </Script>
        </>
    );
}

/**
 * TODO: !!!! API key in config - but it temporarly does not matter if it is in source code because it is public key
 * TODO: !!!! Do not include ANY of this in export
 */
