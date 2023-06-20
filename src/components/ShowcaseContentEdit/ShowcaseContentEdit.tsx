import { useRouter } from 'next/router';
import { ControlPanel } from '../../components/ControlPanel/ControlPanel';
import { EditModal } from '../../components/EditModal/EditModal';
import { ExportModal } from '../../components/ExportModal/ExportModal';
import { useSsrDetection } from '../../utils/hooks/useSsrDetection';
import { IWallpaper } from '../../utils/IWallpaper';
import { ExportCodeModal } from '../ExportCodeModal/ExportCodeModal';
import { ExportPreviewModal } from '../ExportPreviewModal/ExportPreviewModal';

interface ShowcaseContentWithEditProps {
    randomWallpaper: IWallpaper;
}

export function ShowcaseContentEdit(props: ShowcaseContentWithEditProps) {
    const { randomWallpaper } = props;
    const router = useRouter();
    const isReady = router.isReady;

    const isServerRender = useSsrDetection();

    const modal = router.query.modal || null;

    console.info('🔽', { modal });

    return (
        <>
            {modal === 'edit' && <EditModal />}
            {modal === 'export' && <ExportModal />}
            {modal === 'export-code' && <ExportCodeModal />}
            {modal === 'export-preview' && <ExportPreviewModal />}
            {isReady && !isServerRender && <ControlPanel {...{ randomWallpaper }} />}
        </>
    );
}

/**
 * TODO: !!! Lazy load modals
 * TODO: [🧠] This is not a section nor a component - figure out where to put it
 */
