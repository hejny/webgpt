import styles from './Tag.module.css';

interface TagProps {
    children: string /* <- TODO: Constrain to options like> 'WebGL'|'Smart contract' */;
}

export function Tag(props: TagProps) {
    const { children } = props;
    return <span className={styles.tag}>{children}</span>;
}


/**
 * TODO: [🛰] Use for technologies
 */