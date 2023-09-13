import { ColorsPanel } from '../../components/ColorsPanel/ColorsPanel';
import { ControlPanel } from '../../components/ControlPanel/ControlPanel';
import { ExportModal } from '../../components/ExportModal/ExportModal';
import { useModal } from '../../utils/hooks/useModal';
import { useScenario } from '../../utils/hooks/useScenario';
import { ColorsModal } from '../ColorsModal/ColorsModal';
import { CopilotPanel } from '../CopilotPanel/CopilotPanel';
import { ExportCodeModal } from '../ExportCodeModal/ExportCodeModal';
import { ExportPreviewModal } from '../ExportPreviewModal/ExportPreviewModal';
import { PreventUnsavedChanges } from './PreventUnsavedChanges';

/**
 * Renders the wallpaper editing stuff (control panel, colors panel, modals)
 */
export function WallpaperEditing() {
    const scenario = useScenario();
    const modal = useModal();

    return (
        <>
            <PreventUnsavedChanges />

            {modal === 'export' && <ExportModal />}
            {modal === 'export-code' && <ExportCodeModal />}
            {modal === 'export-preview' && <ExportPreviewModal />}
            {modal === 'colors' && <ColorsModal />}
            {/* Note: <EditModal/> was removed in commit a4a37573299fa262ee335ecb1a5b480c409f8627 */}

            {modal === null && scenario === 'FROM_SOMETHING' && <CopilotPanel />}
            {modal === null && scenario === 'GALLERY' && <ControlPanel />}
            {modal === null && scenario === 'GALLERY' && <ColorsPanel />}
        </>
    );
}

/**
 * TODO: !! Lazy load modals
 * TODO: [🧠] How to show <ColorsPanel />
 * TODO: [🧠] This is not a section nor a component - figure out where to put it
 */
