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
 * - Makes sections with <main/> and <article/> tags
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
