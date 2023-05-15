import { useSkin } from '../../utils/hooks/useSkin';

/**
 * @@@
 */
export function SkinStyle() {
    const skin = useSkin();

    return (
        <style>{`
            :root {
                --normal-text-color: ${skin.normalTextColor.toHex()};
                --highlighted-text-color: ${skin.highlightedTextColor.toHex()};
                --highlighted-text-shaddow: ${skin.highlightedTextShaddow};
                --footer-text-color: ${skin.footerTextColor.toHex()};
                --main-background: ${skin.mainBackground};
                --footer-background: ${skin.footerBackground}
            }
        `}</style>
    );
}

/**
 * TODO: Allow partial ISkin
 */
