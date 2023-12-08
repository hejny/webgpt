import { useCallback, useMemo } from 'react';
import { FONTS } from '../../../config';
import { useCurrentWallpaper } from '../../utils/hooks/useCurrentWallpaper';
import { randomItem } from '../../utils/randomItem';
import { changeFontsInContent } from '../ImportFonts/changeFontInContent';
import { ImportFonts } from '../ImportFonts/ImportFonts';

/**
 * Renders the co-pilots panel for changing the font of the page.
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
            // TODO: !!! Somewhere is font wrapped by double quotes

            console.log('!!! Content before change', modifiedWallpaper.content);
            console.log('!!!', { randomFont, modifiedWallpaper });
            modifiedWallpaper.content = changeFontsInContent(modifiedWallpaper.content, randomFont.fontFamily);
            console.log('!!! Content after change', modifiedWallpaper.content);

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
                {/* Note: To allow fulltext search putting here "Change font" */}
                Change <span style={{ fontFamily: `'${randomFont}'` }}>font</span>
            </button>
        </>
    );
}
