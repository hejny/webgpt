import { useContext } from 'react';
import { Vector } from 'xyzt';
import { DebugContext } from '../../pages/_app';
import styles from './DebugGrid.module.css';

interface DebugGridProps {
    size: Vector;
}

export function DebugGrid(props: DebugGridProps) {
    const { size } = props;

    const { showGrid } = useContext(DebugContext);

    if (!showGrid) {
        return <></>;
    }

    return (
        <>
            {Array.apply(null, Array(size.x * size.y)).map((_, index) => {
                const y = Math.floor(index / size.x);
                const x = index - y * size.x;
                return (
                    <div
                        key={index}
                        className={styles.outline}
                        style={{
                            gridColumn: `${x + 1} / span 1`,
                            gridRow: `${y + 1} / span 1`,
                        }}
                    >
                        {index}
                    </div>
                );
            })}
        </>
    );
}

/**
 * TODO: LIB xyzt: Make loop via Vector.someMethodForEach((x,y)=>...) instead
 */
