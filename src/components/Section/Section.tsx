import { ReactNode } from 'react';
import { classNames } from '../../utils/classNames';
import { string_css_class } from '../../utils/typeAliases';
import styles from './Section.module.css';

/**
 * A function component that renders a section element ⁘
 *
 * @param props - The props for the section component
 * @returns A JSX element representing the section
 */
interface SectionProps {
    children: ReactNode;

        /**
     * Optional CSS class name which will be added to root element
     */
    className?: string_css_class;
}

/**
 * @@@
 */
export function Section(props: SectionProps) {
    const { children, className } = props;
    return <div className={classNames(styles.section, className)}>{children}</div>;
}
