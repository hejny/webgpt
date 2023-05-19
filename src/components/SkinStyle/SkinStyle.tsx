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
                --footer-background: ${skin.footerBackground};

                ${[...skin.palette, ...skin.palette, ...skin.palette, ...skin.palette /* <- 💩 */]
                    .map((color, i) => `--palette-${i}: ${color.toHex()};`)
                    .join('\n')}
      
            }
        `}</style>
    );
}

/**
 * TODO: [🥼] Use ONLY --palette vars
 * TODO: !! Make repeat in palette to guarantee at least 10 colors
 * TODO: Allow partial ISkin
 */
