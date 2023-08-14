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
     * Unique ID of the section which can be used for hash link
     * Note: It is case-insensitive and will be converted to lowercase
     */
    id?: string;
    className?: string_css_class;
}

/**
 * @@@
 */
export function Section({ id, children, className }: SectionProps) {
    // TODO: [0] Do or comment> const [headChild, ...restChildren] = children;

    id = id?.toLocaleLowerCase();

    return (
        <div
            className={classNames(styles.section, className)}
            {
                ...{ id } /* <- TODO: !!! Remove ids from sections (to use then in <Markdown> heading hashes) */
            }
        >
            {/* [0] <a href={`#${id}`}>{headChild}</a>{restChildren}*/}
            {children}
        </div>
    );
}
