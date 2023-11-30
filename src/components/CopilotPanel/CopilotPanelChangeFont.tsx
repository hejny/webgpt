import { useCallback, useMemo } from 'react';
import { FONTS } from '../../../config';
import { useCurrentWallpaper } from '../../utils/hooks/useCurrentWallpaper';
import { randomItem } from '../../utils/randomItem';
import { changeFontsInContent } from '../ImportFonts/changeFontInContent';
import { ImportFonts } from '../ImportFonts/ImportFonts';

/**
 * Renders the co-pilot panel for text commands to edit the page.
 */
export function CopilotPanelChangeFont() {
    const [wallpaper, modifyWallpaper] = useCurrentWallpaper();
    const randomFont = useMemo(
        () => randomItem(...FONTS) /* <- TODO: [🧠][🔠] Some better heurictic than pure random */,
        // Note: Wallpaper is dependency because we want to offer new font after each change of the font
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
        [wallpaper],
    );
    const modifyWallpaperFont = useCallback(() => {
        modifyWallpaper((modifiedWallpaper) => {
            modifiedWallpaper.content = changeFontsInContent(modifiedWallpaper.content, randomFont.fontFamily);
            modifiedWallpaper.saveStage = 'EDITED';
            return modifiedWallpaper;
        });
    }, [modifyWallpaper, randomFont]);

    return (
        <>
            <ImportFonts
                fonts={
                    new Set([randomFont.fontFamily])
                } /* <- TODO: This should (or maybe already is) be excluded from export by ignoring all <CopilotPanel/> */
            />
            <button onClick={modifyWallpaperFont}>
                Change <span style={{ fontFamily: `'${randomFont}'` }}>font</span>
            </button>
        </>
    );
}
