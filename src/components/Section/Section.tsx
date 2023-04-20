import { ReactNode } from 'react';
import { classNames } from '../../utils/classNames';
import styles from './Section.module.css';

interface SectionProps {
    children: ReactNode;

    /**
     * Unique ID of the section which can be used for hash link
     * Note: It is case-insensitive and will be converted to lowercase
     */
    id?: string;
    className?: string;
}

export function Section({ id, children, className }: SectionProps) {
    // TODO: [0] Do or comment> const [headChild, ...restChildren] = children;

    id = id?.toLocaleLowerCase();

    return (
        <div className={classNames(styles.section, className)} {...{ id }}>
            {/* [0] <a href={`#${id}`}>{headChild}</a>{restChildren}*/}
            {children}
        </div>
    );
}
