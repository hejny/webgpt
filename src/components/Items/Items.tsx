import { ReactNode } from 'react';
import styles from './Items.module.css';

/**
 * A functional component that renders a grid of items ⁘
 *
 * @param {ItemsProps} props - The props for the component
 * @returns {JSX.Element} The JSX element for the component
 */
interface ItemsProps {
    // TODO: preferedItemWidth: number;
    children: ReactNode;
}

/**
 * @@@
 */
export function Items(props: ItemsProps) {
    const { children } = props;
    return <div className={styles.items}>{children}</div>;
}
