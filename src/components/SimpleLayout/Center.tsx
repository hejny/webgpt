import type { ReactNode } from 'react';
import { classNames } from '../../utils/classNames';
import { string_css_class } from '../../utils/typeAliases';
import styles from './Center.module.css';

interface CenterProps {
    /**
     * Content which will be centered
     */
    children?: ReactNode;

    /**
     * Optional CSS class name which will be added to root element
     */
    className?: string_css_class;
}

/**
 * Centers the content in both directions using flexbox
 *
 * Note: The <Center/> element itself stretches to 100% width and height of the parent element
 */
export function Center(props: CenterProps) {
    const { children, className } = props;
    return <div className={classNames(className, styles.Center)}>{children}</div>;
}
