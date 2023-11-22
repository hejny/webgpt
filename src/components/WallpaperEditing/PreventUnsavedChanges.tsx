import { useEffect } from 'react';
import { useCurrentWallpaper } from '../../utils/hooks/useCurrentWallpaper';

/**
 * Helper component that prevents users from leaving the page if there are unsaved changes on the current wallpaper
 *
 * @returns Empty React fragment (+ internally using useEffect)
 */
export function PreventUnsavedChanges() {
    const [wallpaper] = useCurrentWallpaper();

    const isSaved = wallpaper.saveStage === 'SAVED';

    useEffect(() => {
        window.onbeforeunload = () => {
            // <- Note: It is not working by window.addEventListener('beforeunload', this.beforeunloadHandler);
            if (isSaved) {
                return undefined;
            } else {
                return 'You have unsaved changes. Are you sure you want to leave?';
                //     <- Note: There is no way how to pass reliably own message in todays browsers
            }
        };

        return () => {
            window.onbeforeunload = null;
        };
    }, [isSaved]);
    return <></>;
}

/**
 * TODO: [🔮] DRY singleton abstraction - PreventUnsavedChangesManager
 */
