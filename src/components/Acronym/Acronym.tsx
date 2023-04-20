import styles from './Acronym.module.css';

interface AcronymProps {
    abbr?: string;
    children: string;
}

export function Acronym(props: AcronymProps) {
    const { children, abbr } = props;

    const words = children.split(' ');
    const acronym =
        abbr ||
        words
            .map((word, i) => {
                return word.substring(0, 1).toUpperCase();
            })
            .join('');

    return (
        <abbr className={styles.acronym} title={words.join(' ')}>
            {acronym}
        </abbr>
    );
}

/**
 * TODO: Better effect here
 */
