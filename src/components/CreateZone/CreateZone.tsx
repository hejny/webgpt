import type { ReactNode } from 'react';
import { classNames } from '../../utils/classNames';
import type { string_css_class } from '../../utils/typeAliases';
import { Center } from '../SimpleLayout/Center';
import { TakeNoSpace } from '../SimpleLayout/TakeNoSpace';
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
    const { isHighlighted, children, className } = props;

    return (
        <div className={classNames(className, styles.CreateZone, isHighlighted ? styles.isHighlighted : '')}>
            <TakeNoSpace>
                <svg viewBox="0 0 1 1" style={{ overflow: 'visible' }}>
                    {/* TODO: [🚝] DRY */}
                    <path
                        vectorEffect="non-scaling-stroke"
                        strokeDasharray="7"
                        style={{ fill: 'transparent', stroke: 'rgb(240, 240, 240)', strokeWidth: 3 }}
                        d="M .5,0 C .1,0 0,.1 0,.5 0,.9 .1,1 .5,1 .9,1 1,.9 1,.5 1,.1 .9,0 .5,0 Z" /* <- TODO: [1] DRY the shape */
                    ></path>
                    <defs>
                        <clipPath id="squircle" clipPathUnits="objectBoundingBox">
                            <path
                                d="M .5,0 C .1,0 0,.1 0,.5 0,.9 .1,1 .5,1 .9,1 1,.9 1,.5 1,.1 .9,0 .5,0 Z" /* <- TODO: [1] DRY the shape */
                            ></path>
                        </clipPath>
                    </defs>
                </svg>
            </TakeNoSpace>
            <Center className={styles.inner}>{children}</Center>
        </div>
    );
}
