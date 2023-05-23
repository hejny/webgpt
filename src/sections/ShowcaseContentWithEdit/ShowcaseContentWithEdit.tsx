import { useState } from 'react';
import { Vector } from 'xyzt';
import { DebugGrid } from '../../components/DebugGrid/DebugGrid';
import { EditModal } from '../../components/EditModal/EditModal';
import { GetWebButton } from '../../components/GetWebButton/GetWebButton';
import { HeaderWallpaper } from '../../components/HeaderWallpaper/HeaderWallpaper';
import { TiledBackground } from '../../components/TiledBackground/TiledBackground';
import { useCurrentWallpaperId } from '../../utils/hooks/useCurrentWallpaperId';
import { useStateInLocalstorage } from '../../utils/hooks/useStateInLocalstorage';
import { IWallpaper } from '../../utils/IWallpaper';
import { ShowcaseWelcomeSection } from '../10-Welcome/ShowcaseWelcome';
import { FooterSection } from '../90-Footer/Footer';
import styles from './ShowcaseContentWithEdit.module.css';

export type LikedStatus = 'LOVE' | 'LIKE' | 'DISLIKE' | 'NONE';

interface ShowcaseContentWithEditProps {
    randomWallpaper: IWallpaper;
}

export function ShowcaseContentWithEdit(props: ShowcaseContentWithEditProps) {
    const { randomWallpaper } = props;
    const wallpaperId = useCurrentWallpaperId();
    const [isEditing, setEditing] = useState(false);
    const [isPresenting, setPresenting] = useState(false);
    const [likedStatus, setLikedStatus] = useStateInLocalstorage<LikedStatus>(`likedStatus_${wallpaperId}`, 'NONE');

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
            {!isPresenting && (
                <GetWebButton
                    {...{ randomWallpaper, likedStatus, setLikedStatus }}
                    turnOnEditing={setEditing.bind(null, true)}
                    turnOnPresenting={setPresenting.bind(null, true)}
                />
            )}

            <footer>
                <FooterSection />
            </footer>
        </div>
    );
}

/**
 * TODO: [🧠] This is not a section nor a component - figure out where to put it
 */
