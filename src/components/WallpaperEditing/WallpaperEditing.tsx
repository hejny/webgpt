import { useRouter } from 'next/router';
import { ControlPanel } from '../../components/ControlPanel/ControlPanel';
import { ExportModal } from '../../components/ExportModal/ExportModal';
import { useSsrDetection } from '../../utils/hooks/useSsrDetection';
import { ColorsModal } from '../ColorsModal/ColorsModal';
import { ColorsPanel } from '../ColorsPanel/ColorsPanel';
import { CopilotPanel } from '../CopilotPanel/CopilotPanel';
import { ExportCodeModal } from '../ExportCodeModal/ExportCodeModal';
import { ExportPreviewModal } from '../ExportPreviewModal/ExportPreviewModal';
import { PreventUnsavedChanges } from './PreventUnsavedChanges';

/**
 * Renders the wallpaper editing stuff (control panel, colors panel, modals)
 */
export function WallpaperEditing() {
    const router = useRouter();
    const isReady = router.isReady;

    const isServerRender = useSsrDetection();

    const modal = router.query.modal || null;

    return (
        <>
            <PreventUnsavedChanges />

            {modal === 'export' && <ExportModal />}
            {modal === 'export-code' && <ExportCodeModal />}
            {modal === 'export-preview' && <ExportPreviewModal />}
            {modal === 'colors' && <ColorsModal />}
            {/* Note: <EditModal/> was removed in commit a4a37573299fa262ee335ecb1a5b480c409f8627 */}

            {isReady && !isServerRender && <ControlPanel />}
            {isReady && !isServerRender && <ColorsPanel />}
            {isReady && !isServerRender && <CopilotPanel />}
        </>
    );
}

/**
 * TODO: !! Lazy load modals
 * TODO: [🧠] This is not a section nor a component - figure out where to put it
 */
