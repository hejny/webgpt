import { ReactNode } from 'react';
import type { StaticAppHeadProps } from '../AppHead/StaticAppHead';
import { StaticAppHead } from '../AppHead/StaticAppHead';
import styles from './StaticLayout.module.css';

interface StaticLayoutProps extends StaticAppHeadProps {
    /**
     * Content of the page
     */
    children: ReactNode;
}

/**
 * Renders a page in layout with WebGPT design
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
            {/* TODO: !! Translate the main page and enable: <LanguagePicker /> */}
            <div className={styles.StaticLayout}>{children}</div>
        </>
    );
}

/**
 * TODO: [🌾] This should became AiComponentLayout and WebGPT page should be made as WebGPT static page
 */
