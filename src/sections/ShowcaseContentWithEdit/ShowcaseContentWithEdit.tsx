import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { Vector } from 'xyzt';
import { ControlPanel } from '../../components/ControlPanel/ControlPanel';
import { DebugGrid } from '../../components/DebugGrid/DebugGrid';
import { EditModal } from '../../components/EditModal/EditModal';
import { HeaderWallpaper } from '../../components/HeaderWallpaper/HeaderWallpaper';
import { TiledBackground } from '../../components/TiledBackground/TiledBackground';
import { IWallpaper } from '../../utils/IWallpaper';
import { ShowcaseWelcomeSection } from '../10-Welcome/ShowcaseWelcome';
import { FooterSection } from '../90-Footer/Footer';
import styles from './ShowcaseContentWithEdit.module.css';

interface ShowcaseContentWithEditProps {
    randomWallpaper: IWallpaper;
}

export function ShowcaseContentWithEdit(props: ShowcaseContentWithEditProps) {
    const { randomWallpaper } = props;
    const [isEditing, setEditing] = useState(false);
    const router = useRouter();
    const isPresenting = router.query.mode === 'presentation' /* <- TODO: Make hook useMode */;

    return (
        <div className={styles.page}>
            <DebugGrid size={new Vector(5, 5)} />
            {isEditing && <EditModal turnOffEditing={setEditing.bind(null, false)} />}
            <header>
                <HeaderWallpaper />
            </header>
            <div className={styles.background}>
                <TiledBackground />
            </div>
            <main>
                <ShowcaseWelcomeSection />
                {/*<ReferencesSection variant="SHORT" />*/}
            </main>
            {!isPresenting && <ControlPanel {...{ randomWallpaper }} turnOnEditing={setEditing.bind(null, true)} />}

            <footer>
                <FooterSection />
            </footer>
        </div>
    );
}

/**
 * TODO: [🧠] This is not a section nor a component - figure out where to put it
 */
