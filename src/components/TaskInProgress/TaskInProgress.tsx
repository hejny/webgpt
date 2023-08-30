import { useGraph } from '../Graphs/useGraph';
import styles from './TaskInProgress.module.css';

/**
 * Renders an animated "loading indicator" that is used to indicate that the app is working on something
 */
export function TaskInProgress() {
    const { sceneRef } = useGraph();

    return (
        <div className={styles.TaskInProgress}>
            <canvas ref={sceneRef} className={styles.scene} />
        </div>
    );
}

/**
 * TODO: !!! Torus Graph: Move up
 * TODO: !!! Torus Graph: Initial rotate effect
 * TODO: !!! Pass here TaskProgress and show
 * TODO: Play with shape and camera angle
 * TODO: Size of babylonjs in bundle - maybe prerecord as video
 * TODO: Maybe work with xyzt
 * TODO: !! Design in color window
 * TODO: !! Rename to loading OR split between loading and work in progress
 */
