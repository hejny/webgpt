// TODO: Do not show the Next.js errors in the iframes (they are not relevant in this case)
window.document.querySelectorAll('iframe').forEach((iframeElement) => {
    function hideNextjsErrors() {
        const iframeDocument = iframeElement.contentDocument;
        iframeDocument.body.innerHTML =
            iframeDocument.body.innerHTML +
            `   
            <style>
                body{
                    overflow: auto !important;
                }
                nextjs-portal, .webgpt-controls {
                    display: none;
                    pointer-events: none;
                }
            </style>
            `;
    }

    hideNextjsErrors();
    iframeElement.addEventListener('load', hideNextjsErrors);
});
