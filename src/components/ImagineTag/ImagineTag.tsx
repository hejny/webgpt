import { string_midjourney_prompt } from '../../utils/typeAliases';
import styles from './ImagineTag.module.css';

interface ImagineTagProps {
    children: string_midjourney_prompt;
}

/**
 * Renders a MidJourney prompt in a nice box
 */
export function ImagineTag(props: ImagineTagProps) {
    const { children } = props;
    return <div className={styles.imagineTag}>{children}</div>;
}
