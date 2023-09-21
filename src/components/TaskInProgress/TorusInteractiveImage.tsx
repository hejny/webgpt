import { MeshBuilder } from 'babylonjs';
import { SPEED } from '../../../config';
import { useGraph } from '../../utils/hooks/useGraph';
import type { number_positive, string_css_class } from '../../utils/typeAliases';

interface TorusInteractiveProps {
    /**
     * Width of the canvas
     */
    width: number_positive;

    /**
     * Height of the canvas
     */
    height: number_positive;

    /**
     * Optional CSS class name which will be added to root <canvas/> element
     */
    className?: string_css_class;
}

/**
 * Renders <canvas/> with a torus mesh and a camera that rotates around it
 * It is use as indicator that the app is working on something and as a "mascot" of the 1-2i app
 */
export function TorusInteractiveImage(props: TorusInteractiveProps) {
    const { width, height, className } = props;
    const { sceneRef } = useGraph(
        ({ scene, camera, wireframeMaterial }) => {
            // TODO: [🍩] DRY

            let ribbon = MeshBuilder.CreateSphere(
                'ribbon',
                {
                    diameter: 3,
                    segments: 1,
                },
                scene,
            );
            /*
            let ribbon = MeshBuilder.CreateTorus(
                'ribbon',
                {
                    diameter: 1,
                    thickness: 0.5,
                    tessellation: 8,
                },
                scene,
            );
            */
            ribbon.material = wireframeMaterial;

            // Note: Rotate the the camera around the mesh
            scene.registerBeforeRender(() => {
                camera.alpha += 0.02 * SPEED;
            });
        },
        [
            /* Note: No dependencies - we want to have ONE continuous scene during the whole progress */
        ],
    );

    return <canvas ref={sceneRef} {...{ width, height, className }} style={{ outline: 'none' }} />;
}

/**
 * TODO: !! Rename to correct mesh shape name
 * TODO: Size of babylonjs in bundle - maybe prerecord as video
 * TODO: Maybe work with xyzt
 */
