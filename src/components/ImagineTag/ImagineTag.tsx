import styles from './ImagineTag.module.css';

interface ImagineTagProps {
    children: string;
}

export function ImagineTag(props: ImagineTagProps) {
    const { children } = props;
    return <div className={styles.imagineTag}>{children}</div>;
}
