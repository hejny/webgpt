import { useRouter } from 'next/dist/client/router';
import { ControlPanel } from '../../components/ControlPanel/ControlPanel';
import { EditModal } from '../../components/EditModal/EditModal';
import { IWallpaper } from '../../utils/IWallpaper';

interface ShowcaseContentWithEditProps {
    randomWallpaper: IWallpaper;
}

export function ShowcaseContentEdit(props: ShowcaseContentWithEditProps) {
    const { randomWallpaper } = props;
    const router = useRouter();
    const isPresenting = router.query.mode === 'presentation'; /* <- TODO: Make hook useMode */

    const modal = router.query.modal || null;

    return (
        <>
            {modal === 'edit' && (
                <EditModal
                    turnOffEditing={() => {
                        router.push({
                            pathname: router.pathname,
                            query: {
                                ...router.query,
                                modal: null,
                            },
                        });
                    }}
                />
            )}
            {!isPresenting && (
                <ControlPanel
                    {...{ randomWallpaper }}
                    turnOnEditing={() => {
                        router.push({
                            pathname: router.pathname,
                            query: {
                                ...router.query,
                                modal: 'edit',
                            },
                        });
                    }}
                />
            )}
        </>
    );
}

/**
 * TODO: [🧠] This is not a section nor a component - figure out where to put it
 */
