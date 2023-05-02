import { ReactNode } from 'react';
import { classNames } from '../../utils/classNames';
import styles from './Items.module.css';

/**
 * A functional component that renders a grid of items ⁘
 * 
 * @param {ItemsProps} props - The props for the component
 * @returns {JSX.Element} The JSX element for the component
 */
interface ItemsProps {
    itemsOnRow?: 2 | 3;
    children: ReactNode;
}

/**
 * @@@
 */
export function Items(props: ItemsProps) {
    const { itemsOnRow = 3, children } = props;
    return <div className={classNames(styles.items, styles[`row-with-${itemsOnRow}-items`])}>{children}</div>;
}
