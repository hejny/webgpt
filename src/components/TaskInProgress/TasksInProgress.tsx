import { MeshBuilder } from 'babylonjs';
import { useEffect } from 'react';
import { Dialogues } from '../Dialogues/Dialogues';
import { useGraph } from '../Graphs/useGraph';
import { TaskProgress } from './task/TaskProgress';
import styles from './TasksInProgress.module.css';

/**
 * Is <TasksInProgress/> component currently rendered
 * Is used to prevent multiple instances of TasksInProgress in the app
 * @private
 */
let isTasksInProgressRendered = false;

interface TaskInProgressProps {
    tasksProgress?: Array<TaskProgress>;
}

/**
 * Renders an animated "loading indicator" that is used to indicate that the app is working on something
 *
 * Note: This component renders internally <Dialogues /> component
 * Note: There can be only one instance of this component in the app
 */
export function TasksInProgress(props: TaskInProgressProps) {
    const { tasksProgress } = props;
    useEffect(
        () => {
            if (isTasksInProgressRendered) {
                throw new Error('There can be only one instance of TasksInProgress in the app');
            }
            isTasksInProgressRendered = true;
            return () => {
                isTasksInProgressRendered = false;
            };
        },
        [
            // Note: Check only once on mount
        ],
    );
    const { sceneRef } = useGraph(
        ({ scene, camera, wireframeMaterial }) => {
            // TODO: [🍩] DRY
            let ribbon = MeshBuilder.CreateTorus(
                'ribbon',
                {
                    diameter: 1,
                    thickness: 0.5,
                    tessellation: 20,
                },
                scene,
            );
            ribbon.material = wireframeMaterial;

            // Note: Rotate the the camera around the mesh and make it look down initially
            const initialBeta = Math.PI * 2;
            const targetBeta = (Math.PI / 2) * (1.8 / 3);
            let beta = initialBeta;
            scene.registerBeforeRender(() => {
                beta = (beta - targetBeta) * 0.95 + targetBeta;
                camera.beta = beta;
                camera.alpha += 0.02 /* <- TODO: Maybe stop spinning when dialogue is opened */;
            });
        },
        [
            /* Note: No dependencies - we want to have ONE continuous scene during the whole progress */
        ],
    );

    return (
        <>
            <div className={styles.TasksInProgress}>
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
            <Dialogues />
        </>
    );
}

/**
 * TODO: Size of babylonjs in bundle - maybe prerecord as video
 * TODO: Maybe work with xyzt
 * TODO: !! Design in color window
 * TODO: !! Rename to loading OR split between loading and work in progress
 * TODO: [🔏] DRY Locking mechanism | useLock hook
 */
