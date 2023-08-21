import styles from './ImagineTag.module.css';

/**
 * Function representing the ImagineTag component ⁘
 * 
 * @param {ImagineTagProps} props - The props object containing the necessary properties for the component.
 * @returns {JSX.Element} - The rendered ImagineTag component.
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
