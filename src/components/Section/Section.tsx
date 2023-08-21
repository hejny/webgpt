import { ReactNode } from 'react';
import { classNames } from '../../utils/classNames';
import { string_css_class } from '../../utils/typeAliases';
import styles from './Section.module.css';

interface SectionProps {
    /**
     * The content of the section
     */
    children: ReactNode;
    className?: string_css_class;
}

/**
 * Section is a container for content representing a logical part of the page
 */
export function Section(props: SectionProps) {
    const { children, className } = props;
    return <div className={classNames(styles.section, className)}>{children}</div>;
}
