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
                    .flatMap((color, i) => {
                        if (i < skin.palette.length) {
                            return [
                                // TODO: !! DRY [🎋]
                                `--palette-${i}: ${color.toHex()};`,
                                // `--palette-${i}-red: ${color.red};`,
                                // `--palette-${i}-green: ${color.green};`,
                                // `--palette-${i}-blue: ${color.blue};`,
                                `--palette-${i}-triplet: ${color.red}, ${color.green}, ${color.blue};`,
                            ];
                        } else {
                            const j = i % skin.palette.length;
                            return [
                                `--palette-${i}: var(--palette-${j});`,
                                `--palette-${i}-triplet: var(--palette-${j}-triplet);`,
                            ];
                        }
                    })
                    .join('\n')}

        

      
            }
        `}</style>
    );
}

/**
 * TODO: When CSS Relative colors will be supported, then we can get rid of --palette-x-triplet
 * TODO: [🥼] Use ONLY --palette vars
 * TODO: !! Make repeat in palette to guarantee at least 10 colors
 * TODO: Allow partial ISkin
 */
