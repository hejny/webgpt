import { ISkin } from '../../utils/skinFromWallpaper';

interface ISkinStyleProps {
    skin: ISkin;
}

/**
 * @@@
 */
export function SkinStyle(props: ISkinStyleProps) {
    const { skin } = props;

    return (
        <style>{`
            :root {
                --normal-text-color: ${skin.normalTextColor.toHex()};
                --highlighted-text-color: ${skin.highlightedTextColor.toHex()};
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
