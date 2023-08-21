import { ReactNode } from 'react';
import { classNames } from '../../utils/classNames';
import { string_css_class } from '../../utils/typeAliases';
import styles from './Section.module.css';

/**
 * Represents a Section component ⁘
 *
 * @param props - The props for the Section component.
 * @returns The rendered Section component.
 */
interface SectionProps {
    /**
     * The content of the section
     */
    children: ReactNode;
    className?: string_css_class;
}

/**
 * @@@
 */
export function Section(props: SectionProps) {
    const { children, className } = props;
    return <div className={classNames(styles.section, className)}>{children}</div>;
}
