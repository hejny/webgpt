import { restNonce } from './forARest';
import { useGraph } from '../Graphs/useGraph';
import styles from './WorkInProgress.module.css';

export interface PlotFunction {
    (t: number, u: number, v: number): [x: number, y: number, z: number];
    range: [u: number, v: number];
}

/**
 * Renders an animated "loading indicator" that is used to indicate that the app is working on something
 */
export function WorkInProgress() {
    /*/
    TODO: !!! Use or remove
    const [nonce, setNonce] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setNonce((nonce) => nonce + 1);
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [setNonce, nonce]);
    /**/

    const { sceneRef } = useGraph();

    return (
        <div className={styles.WorkInProgress}>
            {restNonce}
            <canvas ref={sceneRef} className={styles.scene} />
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
