import { ReactNode } from 'react';
import { classNames } from '../../utils/classNames';
import { string_css_class } from '../../utils/typeAliases';
import styles from './Sample.module.css';

interface SampleProps {
    /**
     * @@
     */
    Sample: string;

    /**
     * Content which will is hinted
     * This is the subject of the hint
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
    const { Sample, children, className } = props;
    return (
        <div className={classNames(className, styles.Sample)}>
            {Sample}
            {children}
        </div>
    );
}
