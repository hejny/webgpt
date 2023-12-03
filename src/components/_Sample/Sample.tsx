import type { ReactNode } from 'react';
import { classNames } from '../../utils/classNames';
import type { string_css_class } from '../../utils/typeAliases';
import styles from './Sample.module.css';

interface SampleProps {
    /**
     * Content of @@
     */
    children?: ReactNode;

    /**
     * Optional CSS class name which will be added to root element
     */
    className?: string_css_class;
}

/**
 * Renders a @@
 */
export function Sample(props: SampleProps) {
    const { children, className } = props;

    // Use or remove:
    //> const styles = useStyleModule(import('./Sample.module.css'));

    return <div className={classNames(className, styles.Sample)}>{children}</div>;
}

/**
 * TODO: [🧠] Should be the props readonly (for all react components)?
 */
