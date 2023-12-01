import { ControlPanel } from '../../components/ControlPanel/ControlPanel';
import { ExportModal } from '../../components/ExportModal/ExportModal';
import { useModal } from '../../utils/hooks/useModal';
import { useScenario } from '../../utils/hooks/useScenario';
import { supportDialogues } from '../../workers/dialogues';
import { Dialogues } from '../../workers/lib/dialogues/Dialogues';
import { ColorsModal } from '../ColorsModal/ColorsModal';
import { CopilotPanel } from '../CopilotPanel/CopilotPanel';
import { EditContentModal } from '../EditContentModal/EditContentModal';
import { ExportCodeModal } from '../ExportCodeModal/ExportCodeModal';
import { ExportPreviewModal } from '../ExportPreviewModal/ExportPreviewModal';
import { PublishModal } from '../PublishModal/PublishModal';
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
            <Dialogues {...{ supportDialogues }} />

            {modal === 'publish' && <PublishModal />}
            {modal === 'export' && <ExportModal />}
            {modal === 'export-code' && <ExportCodeModal />}
            {modal === 'export-preview' && <ExportPreviewModal />}
            {modal === 'colors' && <ColorsModal />}
            {modal === 'edit-content' && <EditContentModal />}
            {/* Note: <EditModal/> was removed in commit a4a37573299fa262ee335ecb1a5b480c409f8627 */}

            {modal === null && scenario === 'FROM_SOMETHING' && <CopilotPanel />}
            {modal === null && scenario === 'GALLERY' && <ControlPanel />}
            {/* 
            Note: [📿] <ColorsPanel /> and its components are not used anymore
            modal === null && scenario === 'GALLERY' && <ColorsPanel />
            */}
        </>
    );
}

/**
 * TODO: !! Lazy load modals
 * TODO: [📿][🧠] How to show <ColorsPanel />
 * TODO: [🧠] This is not a section nor a component - figure out where to put it
 */
