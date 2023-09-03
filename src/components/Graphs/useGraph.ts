import type { Material } from 'babylonjs';
import { ArcRotateCamera, Color3, Color4, Engine, HemisphericLight, Scene, StandardMaterial, Vector3 } from 'babylonjs';
import { DependencyList, MutableRefObject, useEffect, useRef } from 'react';

/**
 * Function that creates meshes the scene and optionally some effects and extra stuff like camera rotation
 */
export type ICreateSceneMeshes = (assets: {
    scene: Scene;
    camera: ArcRotateCamera;
    wireframeMaterial: Material;
}) => void;

export function useGraph(
    createSceneMeshes: ICreateSceneMeshes,
    deps: DependencyList,
): {
    sceneRef: MutableRefObject<HTMLCanvasElement | null>;
} {
    const sceneRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(
        () => {
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
            const camera = new ArcRotateCamera('camera', 0, (Math.PI / 2) * 0.6, 6, Vector3.Zero(), scene);
            camera.attachControl(canvas, false);

            // Create a light
            const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

            // scene.debugLayer.show();

            // Create a material for the ribbon
            const wireframeMaterial = new StandardMaterial('ribbonMaterial', scene);
            wireframeMaterial.emissiveColor = Color3.White();
            wireframeMaterial.backFaceCulling = false;
            wireframeMaterial.wireframe = true;

            createSceneMeshes({ scene, camera, wireframeMaterial });

            //==============================================

            // Render the scene
            engine.runRenderLoop(() => {
                scene.render();
            });

            // Handle window resize
            const resizeHandler = () => {
                engine.resize();
            };
            window.addEventListener('resize', resizeHandler);

            return () => {
                // Remove event listener
                window.removeEventListener('resize', resizeHandler);

                // Dispose of the scene
                scene.dispose();
            };
        },
        // Note: Dependencies are passed to avoid re-creating the scene on every render
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [sceneRef, ...deps],
    );

    return { sceneRef };
}
