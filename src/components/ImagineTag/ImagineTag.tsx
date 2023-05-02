import styles from './ImagineTag.module.css';

/**
 * A function component that renders a tag with a custom style ⁘
 * 
 * @param {ImagineTagProps} props The props for the component
 * @returns {JSX.Element} The rendered tag element
 */
interface ImagineTagProps {
    children: string;
}

/**
 * @@@
 */
export function ImagineTag(props: ImagineTagProps) {
    const { children } = props;
    return <div className={styles.imagineTag}>{children}</div>;
}
