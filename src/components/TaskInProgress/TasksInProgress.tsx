import { useGraph } from '../Graphs/useGraph';
import { TaskProgress } from './task/TaskProgress';
import styles from './TaskInProgress.module.css';

interface TaskInProgressProps {
    tasksProgress?: Array<TaskProgress>;
}

/**
 * Renders an animated "loading indicator" that is used to indicate that the app is working on something
 */
export function TasksInProgress(props: TaskInProgressProps) {
    const { tasksProgress } = props;
    const { sceneRef } = useGraph();

    return (
        <div className={styles.TaskInProgress}>
            <canvas ref={sceneRef} className={styles.scene} />

            {tasksProgress && (
                <div className={styles.tasklist}>
                    <ul>
                        {tasksProgress.map(({ name, title, isDone }) => (
                            <li key={name} className={isDone ? styles.done : styles.pending}>
                                {title}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

/**
 * TODO: Play with shape and camera angle
 * TODO: Size of babylonjs in bundle - maybe prerecord as video
 * TODO: Maybe work with xyzt
 * TODO: !! Design in color window
 * TODO: !! Rename to loading OR split between loading and work in progress
 */
