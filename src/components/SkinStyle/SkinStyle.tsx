import { darken } from '../../utils/color/operators/darken';
import { useWallpaper } from '../../utils/hooks/useWallpaper';

/**
 * @@@
 */
export function SkinStyle() {
    const [wallpaper] = useWallpaper();
    const {
        colorStats: { version, palette },
    } = wallpaper;

    return (
        <style>{`
            :root {

                /* 🎨 Note: This is a color palette computed by ${version} algorithm */

                ${[...palette, ...palette, ...palette, ...palette /* <- 💩 */]
                    .flatMap((color, i) => {
                        if (i < palette.length) {
                            return [
                                `/* Note: --palette-${i} is ${color.note} */`,
                                `--palette-${i}: ${color.value.toHex()};`,
                                `--palette-${i}-darken: ${color.value.then(darken(0.5)).toHex()};`,
                                `--palette-${i}-triplet: ${color.value.red}, ${color.value.green}, ${color.value.blue};`,
                            ];
                        } else {
                            const j = i % palette.length;
                            // TODO: Add whitespace + here note:
                            //       Note: Following colors are just a repeat of first ${palette.length} colors
                            return [
                                ...(i !== palette.length
                                    ? []
                                    : [
                                          '',
                                          '',
                                          `/* Note: Following are just copies of previously defined palette colors: */`,
                                      ]),
                                `--palette-${i}: var(--palette-${j});`,
                                `--palette-${i}-darken: var(--palette-${j}-darken);`,
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
 * TODO: !! Make repeat in palette to guarantee at least 10 colors
 */
