import styles from './Sample.module.css';

interface SampleProps {
    sample: string;
}

export function Sample(props: SampleProps) {
    const { sample } = props;
    return <div className={styles.sample}>{sample}</div>;
}
