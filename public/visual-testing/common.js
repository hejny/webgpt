// TODO: Do not show the Next.js errors in the iframes (they are not relevant in this case)
document.querySelectorAll('iframe').forEach((iframeElement) => {
    function hideNextjsErrors() {
        const iframeDocument = iframeElement.contentDocument;
        iframeDocument.body.innerHTML =
            iframeDocument.body.innerHTML +
            `   
            <style>
                body{
                    overflow: auto !important;
                }
                nextjs-portal, .aiai-controls {
                    display: none;
                    pointer-events: none;
                }
            </style>
            `;
    }

    hideNextjsErrors();
    iframeElement.addEventListener('load', hideNextjsErrors);
});
