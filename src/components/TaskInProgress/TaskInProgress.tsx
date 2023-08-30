import { useGraph } from '../Graphs/useGraph';
import { TaskProgress } from './task/TaskProgress';
import styles from './TaskInProgress.module.css';

interface TaskInProgressProps {
    taskProgress?: TaskProgress;
}

/**
 * Renders an animated "loading indicator" that is used to indicate that the app is working on something
 */
export function TaskInProgress(props: TaskInProgressProps) {
    const { taskProgress } = props;
    const { sceneRef } = useGraph();

    return (
        <div className={styles.TaskInProgress}>
            <canvas ref={sceneRef} className={styles.scene} />
            <div className={styles.tasklist}>
                <ul>
                    <li>⏣ Computing colorstats</li>
                    <li>⭘ Computing foo</li>
                    <li>✓ Computing bar</li>
                    <li>✔ Computing bar</li>
                </ul>
            </div>
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
