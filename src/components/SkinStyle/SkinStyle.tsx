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
                --footer-background: ${skin.footerBackground};

                ${[...skin.palette, ...skin.palette, ...skin.palette, ...skin.palette /* <- 💩 */]
                    .flatMap((color, i) => [
                        // TODO: !! DRY [🎋]
                        `--palette-${i}: ${color.toHex()};`,
                        `--palette-${i}-red: ${color.red};`,
                        `--palette-${i}-green: ${color.green};`,
                        `--palette-${i}-blue: ${color.blue};`,
                        `--palette-${i}-triplet: ${color.red}, ${color.green}, ${color.blue};`,
                    ])
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
