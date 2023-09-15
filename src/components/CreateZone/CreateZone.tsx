import { ReactNode } from 'react';
import { classNames } from '../../utils/classNames';
import { string_css_class } from '../../utils/typeAliases';
import { Center } from '../Center/Center';
import styles from './CreateZone.module.css';

interface CreateZoneProps {
    /**
     * If true, CreateZone will be highlighted
     * For example, when user drags a file over CreateZone, it will be highlighted
     */
    isHighlighted?: boolean;

    /**
     * Content of the CreateZone
     */
    children: ReactNode;

    /**
     * Optional CSS class name which will be added to root element
     */
    className?: string_css_class;
}

export function CreateZone(props: CreateZoneProps) {
    const { isHighlighted,children, className } = props;

    return (
        <div className={classNames(className, styles.CreateZone, isHighlighted ? styles.isHighlighted : '')}>
            <Center className={styles.inner}>{children}</Center>
        </div>
    );
}
