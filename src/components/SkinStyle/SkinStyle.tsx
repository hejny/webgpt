import { useWallpaper } from '../../utils/hooks/useWallpaper';

/**
 * @@@
 */
export function SkinStyle() {
    const wallpaper = useWallpaper();
    const {
        colorStats: { palette },
    } = wallpaper;

    return (
        <style>{`
            :root {
                
                ${[...palette, ...palette, ...palette, ...palette /* <- 💩 */]
                    .flatMap((color, i) => {
                        if (i < palette.length) {
                            return [
                                // TODO: !! DRY [🎋]
                                `/* Note: --palette-${i} is ${color.note} */`,
                                `--palette-${i}: ${color.value.toHex()};`,
                                // `--palette-${i}-red: ${color.red};`,
                                // `--palette-${i}-green: ${color.green};`,
                                // `--palette-${i}-blue: ${color.blue};`,
                                `--palette-${i}-triplet: ${color.value.red}, ${color.value.green}, ${color.value.blue};`,
                            ];
                        } else {
                            const j = i % palette.length;
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
 * TODO: !! Make repeat in palette to guarantee at least 10 colors
 */
