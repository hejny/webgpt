import cityscapeBottom from '../../../public/patterns/splitted/Pavol_Hejn_A_tiled_background_featuring_a_futuristic_cityscape__d68f41f8-1374-4a58-9cf3-36e9ad9f9d03.bottom.png';
import cityscapeTop from '../../../public/patterns/splitted/Pavol_Hejn_A_tiled_background_featuring_a_futuristic_cityscape__d68f41f8-1374-4a58-9cf3-36e9ad9f9d03.top.png';
import { TiledBackgroundPlayground } from '../TiledBackgroundPlayground/TiledBackgroundPlayground';
import styles from './TiledBackground.module.css';

export function TiledBackground() {
    return (
        <div className={styles.tiledBackground}>
            <div
                className={styles.layer}
                style={{
                    zIndex: 20,
                    backgroundImage: `url(${cityscapeTop.src})`,
                    backgroundSize: `350px 350px`,
                    backgroundPosition: `center top`,
                    backgroundRepeat: `repeat no-repeat`,
                    opacity: 0,
                }}
            ></div>

            <div
                className={styles.layer}
                style={{
                    zIndex: 20,
                    backgroundImage: `url(${cityscapeBottom.src})`,
                    backgroundSize: `350px 350px`,
                    backgroundPosition: `center bottom`,
                    backgroundRepeat: `repeat no-repeat`,
                    opacity: 0,
                }}
            ></div>

            <div
                className={styles.layer}
                style={{
                    zIndex: 1000,
                    background: 'var(--main-background)',
                    opacity: 1,
                }}
            ></div>

            <div
                className={styles.layer}
                style={{
                    zIndex: 10,
                    opacity: 0,
                }}
            >
                <TiledBackgroundPlayground />
            </div>
        </div>
    );
}

/**
 * TODO: [🌾] Separate testing and usage into components
 * TODO: Figure out the best mask according to choosen background
 * TODO: Make this truly on top (now is for example behind the footer despite it is fixed)
 * TODO: [🌾] Extract background picker from this to separate LIB
 * TODO: LIB xyzt: Make loop via Vector.someMethodForEach((x,y)=>...) instead
 */
