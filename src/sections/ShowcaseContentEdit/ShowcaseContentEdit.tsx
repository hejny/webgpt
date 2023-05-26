import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { ControlPanel } from '../../components/ControlPanel/ControlPanel';
import { EditModal } from '../../components/EditModal/EditModal';
import { IWallpaper } from '../../utils/IWallpaper';

interface ShowcaseContentWithEditProps {
    randomWallpaper: IWallpaper;
}

export function ShowcaseContentEdit(props: ShowcaseContentWithEditProps) {
    const { randomWallpaper } = props;
    const [isEditing, setEditing] = useState(false);
    const router = useRouter();
    const isPresenting = router.query.mode === 'presentation'; /* <- TODO: Make hook useMode */

    return (
        <>
            {isEditing && <EditModal turnOffEditing={setEditing.bind(null, false)} />}
            {!isPresenting && <ControlPanel {...{ randomWallpaper }} turnOnEditing={setEditing.bind(null, true)} />}
        </>
    );
}

/**
 * TODO: [🧠] This is not a section nor a component - figure out where to put it
 */
