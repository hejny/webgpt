import { ReactNode } from 'react';
import styles from './Items.module.css';

/**
 * Renders a div container for the child components
 *
 * @param {ItemsProps} props - The props for the Items component.
 * @returns {JSX.Element} The Items component.
 */
interface ItemsProps {
    // TODO: preferedItemWidth: number;

    /**
     * The items to render
     *
     * Note: Use the <Item/> component to render the items
     */
    children: ReactNode;
}

/**
 * @@@
 */
export function Items(props: ItemsProps) {
    const { children } = props;
    return <div className={styles.items}>{children}</div>;
}
