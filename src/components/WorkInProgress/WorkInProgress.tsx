import {
    ArcRotateCamera,
    Color3,
    Color4,
    Engine,
    HemisphericLight,
    MeshBuilder,
    Scene,
    StandardMaterial,
    Vector3,
} from 'babylonjs';
import { useEffect, useRef } from 'react';
import { restNonce } from './forARest';
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
    const sceneRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        // Get the canvas element
        const canvas = sceneRef.current;

        if (!canvas) {
            return;
        }

        // Create the Babylon.js engine
        const engine = new Engine(canvas, true);

        // Create a scene
        const scene = new Scene(engine);

        scene.clearColor = new Color4(0, 0, 0, 0);

        // Create a camera
        const camera = new ArcRotateCamera('camera', 0, 0, 10, Vector3.Zero(), scene);
        camera.attachControl(canvas, false);

        // Create a light
        const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

        // scene.debugLayer.show();

        //==============================================

        const plotPoint: PlotFunction = (t, u, v) => {
            return [0, 0, 0];
        };
        plotPoint.range = [0, 1];

        let ribbon = MeshBuilder.CreateTorus(
            'ribbon',
            {
                diameter: 1,
                thickness: 0.5,
                tessellation: 20,
                // sideOrientation: Mesh.DOUBLESIDE,
            },
            scene,
        );

        // Create a material for the ribbon
        const ribbonMaterial = new StandardMaterial('ribbonMaterial', scene);
        ribbonMaterial.emissiveColor = Color3.White();
        ribbonMaterial.backFaceCulling = false;
        ribbonMaterial.wireframe = true;
        ribbon.material = ribbonMaterial;

        /**/
        // Rotate the the ribbon
        scene.registerBeforeRender(function () {
            ribbon.rotation.y -= 0.01;
        });
        /**/

        //==============================================

        // Render the scene
        engine.runRenderLoop(function () {
            scene.render();
        });

        // Handle window resize
        window.addEventListener('resize', function () {
            engine.resize();
        });

        // !!!! Return
    }, [sceneRef]);

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
