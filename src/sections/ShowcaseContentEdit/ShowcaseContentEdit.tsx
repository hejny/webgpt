import { useRouter } from 'next/dist/client/router';
import { ControlPanel } from '../../components/ControlPanel/ControlPanel';
import { EditModal } from '../../components/EditModal/EditModal';
import { ExportModal } from '../../components/ExportModal/ExportModal';
import { useSsrDetection } from '../../utils/hooks/useSsrDetection';
import { IWallpaper } from '../../utils/IWallpaper';

interface ShowcaseContentWithEditProps {
    randomWallpaper: IWallpaper;
}

export function ShowcaseContentEdit(props: ShowcaseContentWithEditProps) {
    const { randomWallpaper } = props;
    const router = useRouter();
    const isReady = router.isReady; /* <- !!! Is this help */

    const isServerRender = useSsrDetection();

    const modal = router.query.modal || null;

    return (
        <>
            {modal === 'edit' && <EditModal />}
            {modal === 'export' && <ExportModal />}
            {isReady && !isServerRender && <ControlPanel {...{ randomWallpaper }} />}
        </>
    );
}

/**
 * TODO: [🧠] This is not a section nor a component - figure out where to put it
 */
