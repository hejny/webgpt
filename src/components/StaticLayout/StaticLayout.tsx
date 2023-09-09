import { ReactNode } from 'react';
import { StaticAppHead, StaticAppHeadProps } from '../AppHead/StaticAppHead';
import styles from './StaticLayout.module.css';

interface StaticLayoutProps extends StaticAppHeadProps {
    /**
     * Content of the page
     */
    children: ReactNode;
}

/**
 * Renders a page in layout with 1-2i design
 *
 * The design has several features:
 * - Automatically adds <StaticAppHead/> to the page
 * - Apply semi-global design (e.g. background color, link color, etc.)
 * - Makes sections with <header/>, <main/> and <article/> tags
 * - TODO: Automatically adds <Footer/> to the page
 *
 */
export function StaticLayout(props: StaticLayoutProps) {
    const { children, subtitle } = props;
    return (
        <>
            <StaticAppHead {...{ subtitle }} />
            <div className={styles.StaticLayout}>{children}</div>
        </>
    );
}

/**
 * TODO: [🌾] This should became AiComponentLayout and 1-2i page should be made as 1-2i static page
 */
