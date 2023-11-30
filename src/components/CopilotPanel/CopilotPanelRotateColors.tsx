import { useCallback } from 'react';
import { useCurrentWallpaper } from '../../utils/hooks/useCurrentWallpaper';
import { rotateItems } from '../../utils/rotateItems';

/**
 * Renders the co-pilots panel for rotating the colors of the page.
 */
export function CopilotPanelRotateColors() {
    const [wallpaper, modifyWallpaper] = useCurrentWallpaper();
    const modifyWallpaperFont = useCallback(() => {
        modifyWallpaper((modifiedWallpaper) => {
            modifiedWallpaper.colorStats.palette = rotateItems(modifiedWallpaper.colorStats.palette, { count: -1 });
            modifiedWallpaper.saveStage = 'EDITED';

            return modifiedWallpaper;
        });
    }, [modifyWallpaper]);

    return (
        <>
            <button onClick={modifyWallpaperFont}>
                Change
                {
                    ' '
                    /**/
                }
                {/* TODO: !! Put here colors of the page */}
                <span style={{ color: '#ff0000' }}>c</span>
                <span style={{ color: '#ff6622' }}>o</span>
                <span style={{ color: '#ffff00' }}>l</span>
                <span style={{ color: '#55cc66' }}>o</span>
                <span style={{ color: '#9999ff' }}>r</span>
                <span style={{ color: '#9955ff' }}>s</span>
            </button>
        </>
    );
}
