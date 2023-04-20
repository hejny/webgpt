import { useEffect, useState } from 'react';
import { DEBUG } from '../../../config';
import { generated_patterns } from '../../../public/patterns';
import { MidjourneyLink } from '../MidjourneyLink/MidjourneyLink';
import styles from './TiledBackgroundPlayground.module.css';

interface TiledBackgroundPlaygroundProps {
    // TODO: [🌾] Pass props
    // size: Vector;
}

export function TiledBackgroundPlayground(props: TiledBackgroundPlaygroundProps) {
    // const { size } = props;

    const [size, setSize] = useState(450 /* <- TODO: [🌾] This should be passed as prop */);

    // Good are: 12,26,27,51,53,67,68,72,81
    const [index, setIndexRaw] = useState(84 - 1 /* <- TODO: [🌾] This should be passed as prop */);

    // TODO: Add some prefix like tintColor
    const [color, setColor] = useState('#0f0a05' /* <- TODO: [🌾] This should be passed as prop */);
    const [colorOpacity, setColorOpacity] = useState(0.77 /* <- TODO: [🌾] This should be passed as prop */);

    const [filter, setFilter] = useState('blur(0px)' /* <- TODO: [🌾] This should be passed as prop */);

    const setIndex = (index: number) => {
        setIndexRaw((index + generated_patterns.length) % generated_patterns.length);
    };

    const [isPlaying, setPlaying] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            return () => {};
        }
        const interval = setInterval(() => {
            setIndex(index + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [index, isPlaying]);

    return (
        <div className={styles.tiledBackground}>
            {DEBUG.backgroundPatternPicker && (
                <div className={styles.picker}>
                    <div className={styles.pickerControls}>
                        <button
                            accessKey={'a'}
                            onClick={() => {
                                setPlaying(false);
                                setIndex(index - 1);
                            }}
                        >
                            ◀
                        </button>
                        {`${index + 1} / ${generated_patterns.length}`}
                        <button
                            accessKey={'d'}
                            onClick={() => {
                                setPlaying(false);
                                setIndex(index + 1);
                            }}
                        >
                            ▶
                        </button>

                        <button accessKey={'p'} onClick={() => setPlaying(!isPlaying)}>
                            {isPlaying ? '⏸' : '▶'}
                        </button>

                        <input
                            type={'number'}
                            value={size}
                            min={0}
                            step={50}
                            onChange={(event) => setSize(parseInt(event.target.value, 10))}
                        />

                        <input type={'color'} value={color} onChange={(event) => setColor(event.target.value)} />
                        {color}
                        <input
                            type={'number'}
                            value={colorOpacity * 100}
                            min={0}
                            step={1}
                            max={100}
                            onChange={(event) => setColorOpacity(parseInt(event.target.value, 10) / 100)}
                        />

                        <input type={'text'} value={filter} onChange={(event) => setFilter(event.target.value)} />
                    </div>
                    <div>
                        <MidjourneyLink>{generated_patterns[index].src.split('/').pop() || ''}</MidjourneyLink>
                    </div>
                </div>
            )}

            <div
                className={styles.layer}
                style={{
                    zIndex: 20,
                    backgroundImage: `url(${generated_patterns[index].src})`,
                    backgroundSize: `${size}px ${size}px`,
                    backgroundRepeat: `repeat`,
                    filter,
                }}
            ></div>

            {/* 
            <div
                className={styles.layer}
                style={{
                    zIndex: 30,
                    backgroundImage: `url(${ornaments_pattern.src})`,
                    opacity: 0.5,
                    backgroundSize: `100px 100px`,
                    backgroundRepeat: `repeat`,
                }}
            ></div>
            */}

            {/* 
            <div
                className={styles.layer}
                style={{
                    zIndex: 20,
                    backgroundImage: `url(${tile_pattern.src})`,
                    backgroundSize: `350px 350px`,
                    backgroundRepeat: `repeat`,
                }}
            ></div>
            */}

            <div
                className={styles.layer}
                style={{
                    zIndex: 1000,
                    backgroundColor: color,
                    opacity: colorOpacity,
                }}
            ></div>
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
