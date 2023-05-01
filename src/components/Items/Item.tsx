import { ReactNode } from 'react';
import styles from './Item.module.css';

/**
 * A component that renders a generic item with a given style ⁘
 * 
 * @param {Object} props The props object.
 * @param {ReactNode} props.children The children of the component.
 * @returns {JSX.Element} The item component.
 */
export function Item({ children }: { children: ReactNode }) {
    return <div className={styles.item}>{children}</div>;
}

/**
 * @@@
 */
Item.Title = function Title({ children }: { children: ReactNode }) {
    // TODO: Probbably place here semantic <h3> tag
    return <div className={styles.title}>{children}</div>;
};

/**
 * @@@
 */
Item.FloatingTitle = function FloatingTitle({ children }: { children: ReactNode }) {
    // TODO: Probbably place here semantic <h3> tag
    return (
        <div className={styles.floatingTitle}>
            <span className={styles.inner}>{children}</span>
        </div>
    );
};

/**
 * @@@
 */
Item.Description = function Description({ children }: { children: ReactNode }) {
    return <div className={styles.description}>{children}</div>;
};

/**
 * @@@
 */
Item.Image = function Image({ children }: { children: ReactNode }) {
    return (
        <>
            <div className={styles.imageContainer}>{children}</div>
            {/*<div className={styles.overlay} />*/}
        </>
    );
};

/**
 * @@@
 */
Item.PersonImage = function PersonImage({ children }: { children: ReactNode }) {
    return (
        <>
            <div className={styles.personImageContainer}>{children}</div>
            {/*<div className={styles.overlay} />*/}
        </>
    );
};

/**
 * TODO: Maybe mask image with text
 * TODO: Children of Item should be only and exacly Item.Title, Item.Description and Item.Image and theese components should be used only inside of <Item/> and <Item> used only inside of <Items> - How to implement and type this?
 */
