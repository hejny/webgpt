import styles from './Sample.module.css';

interface SampleProps {
    /**
     * @@
     */
    Sample: string;
}

/**
 * Renders a @@
 */
export function Sample(props: SampleProps) {
    const { Sample } = props;
    return <div className={styles.Sample}>{Sample}</div>;
}
