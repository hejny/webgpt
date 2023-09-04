import { ReactNode } from 'react';
import { classNames } from '../../utils/classNames';
import { string_css_class } from '../../utils/typeAliases';
import styles from './GraphButton.module.css';
import { useGraph } from './useGraph';

interface GraphButtonProps {
    /**
     * Optional content of the section
     */
    children?: ReactNode;

    /**
     * Optional CSS class name which will be added to root element
     */
    className?: string_css_class;
}

/**
 * Renders a square button with an interactive graph inside
 *
 * Note: It should be nested inside a <Link href="..."/>, <a href="..."/> or <... onClick/> component to be active
 */
export function GraphButton(props: GraphButtonProps) {
    const { children, className } = props;
    const { sceneRef } = useGraph();
    return (
        <div className={classNames(styles.GraphButton, className)}>
            <canvas className={styles.scene} ref={sceneRef} />
            {children}
        </div>
    );
}
