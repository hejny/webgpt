import { MeshBuilder } from 'babylonjs';
import { useEffect } from 'react';
import { Vector } from 'xyzt';
import { IS_DEVELOPMENT } from '../../../config';
import { useGraph } from '../../utils/hooks/useGraph';
import { Dialogues } from '../Dialogues/Dialogues';
import { WebgptTaskProgress } from './task/WebgptTaskProgress';
import styles from './TasksInProgress.module.css';

/**
 * Is <TasksInProgress/> component currently rendered
 * Is used to prevent multiple instances of TasksInProgress in the app
 * @private
 */
let isTasksInProgressRendered = false;

interface TaskInProgressProps {
    tasksProgress?: Array<WebgptTaskProgress>;
}

/**
 * Renders an animated "loading indicator" that is used to indicate that the app is working on something
 *
 * Note: This component renders internally <Dialogues/> component
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
            camera.beta = initialBeta;
            scene.registerBeforeRender(() => {
                camera.beta = (camera.beta - targetBeta) * 0.95 + targetBeta;
                camera.alpha += 0.02 /* <- TODO: Maybe stop spinning when dialogue is opened */;
            });
        },
        [
            /* Note: No dependencies - we want to have ONE continuous scene during the whole progress */
        ],
    );

    let translateBy = Vector.zero();
    const numberOfTasksToFitInPage = 5;
    if (tasksProgress && tasksProgress.length > numberOfTasksToFitInPage) {
        const numberOfTasksOutOfPage = tasksProgress.length - numberOfTasksToFitInPage;
        translateBy = translateBy.add({ y: -numberOfTasksOutOfPage * 20 });
    }

    return (
        <>
            <div className={styles.TasksInProgress}>
                <canvas
                    ref={sceneRef}
                    className={styles.scene}
                    style={{
                        // Note: In development we want to be able to click on the tasks
                        pointerEvents: IS_DEVELOPMENT ? 'none' : undefined,
                        transform: translateBy.isZero()
                            ? undefined
                            : `translate(${translateBy.x}px, ${translateBy.y}px)`,
                    }}
                />

                {tasksProgress && (
                    <div
                        className={styles.tasklist}
                        style={{
                            pointerEvents: IS_DEVELOPMENT ? 'all' : undefined,
                            transform: translateBy.isZero()
                                ? undefined
                                : `translate(${translateBy.x}px, ${translateBy.y}px)`,
                        }}
                    >
                        <ul>
                            {tasksProgress.map((taskProgress) => (
                                <li
                                    key={taskProgress.name}
                                    className={taskProgress.isDone ? styles.done : styles.pending}
                                    onClick={() => {
                                        console.info({ taskProgress });
                                    }}
                                >
                                    {taskProgress.title}
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
