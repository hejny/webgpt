import { useContext } from 'react';
import { Vector } from 'xyzt';
import { DebugContext } from '../../pages/_app';
import styles from './DebugGrid.module.css';

/**
 * A component that renders a grid of cells with numbers for debugging purposes ⁘
 * 
 * @param {DebugGridProps} props - The props for the component
 * @returns {JSX.Element} The rendered grid or an empty fragment if showGrid is false
 */
interface DebugGridProps {
    size: Vector;
}

/**
 * @@@
 */
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
