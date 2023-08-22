import {
    ArcRotateCamera,
    Color3,
    Color4,
    Engine,
    HemisphericLight,
    Mesh,
    MeshBuilder,
    Scene,
    StandardMaterial,
    Vector3,
} from 'babylonjs';
import { useEffect, useRef } from 'react';
import { randomItem } from '../../utils/randomItem';
import { plotHyperbolicParaboloid, plotSphere, plotTorus, plotWaves } from './definitions';
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

        /**/
        // Create a ribbon mesh for black hole topology
        let ribbon = MeshBuilder.CreateRibbon(
            'ribbon',
            {
                pathArray: generateRibbonPath(plotPoint, 0),
                sideOrientation: Mesh.DOUBLESIDE,
                updatable: true,
                closeArray: true, // add this parameter to close the ribbon between the last and first paths
                closePath: true, // add this parameter to close each path between the last and first points
            },
            scene,
        );

        const plotFunction: PlotFunction = randomItem(plotSphere, plotTorus, plotWaves, plotHyperbolicParaboloid);

        // Update the ribbon mesh each frame
        let t = 0;
        scene.registerBeforeRender(function () {
            ribbon = MeshBuilder.CreateRibbon(
                'ribbon',
                {
                    pathArray: generateRibbonPath(plotFunction, t++),
                    sideOrientation: Mesh.DOUBLESIDE,
                    instance: ribbon,
                    closeArray: true, // keep this parameter consistent with the initial creation
                    closePath: true, // keep this parameter consistent with the initial creation
                },
                scene,
            );
        });

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

        // Function to generate the path for the ribbon
        function generateRibbonPath(plot: PlotFunction, t: number) {
            let range = plot.range;

            if (!range) {
                range = [0, 1];
            }

            const path = [];
            const segments = 20;
            const step = (range[1] - range[0]) / segments;

            for (var v = range[0]; v <= range[1]; v += step) {
                const subPath = [];

                for (var u = range[0]; u <= range[1]; u += step) {
                    const [z, x, y] = plot(t, u, v);
                    subPath.push(new Vector3(x, y, z));
                }

                path.push(subPath);
            }

            return path;
        }

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
