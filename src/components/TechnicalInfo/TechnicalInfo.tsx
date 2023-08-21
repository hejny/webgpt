import { useTranslation } from 'next-i18next';
import { APP_VERSION, VERCEL_GIT_COMMIT_MESSAGE, VERCEL_GIT_COMMIT_SHA } from '../../../config';
import { Section } from '../../components/Section/Section';
import { MarkdownContent } from '../MarkdownContent/MarkdownContent';
import styles from './TechnicalInfo.module.css';

// !!! React component

/**
 * Renders technical information about the app
 *
 * @returns {JSX.Element} A section element with the title, content, version, repository and commit of the app.
 */
export function TechnicalInfo() {
    const { t } = useTranslation();

    return (
        <Section>
            <h2>{t('TechnicalInfo.title')}</h2>

            <MarkdownContent content={t('TechnicalInfo.content')} isEnhanced />

            <div className={styles.field}>
                <span>Version:</span>
                <span>{APP_VERSION}</span>
            </div>

            <div className={styles.field}>
                <span>Repository:</span>
                <span>
                    <a href="https://github.com/hejny/aiai/">https://github.com/hejny/aiai/</a>
                </span>
            </div>

            <div className={styles.field}>
                <span>Commit:</span>
                <span>
                    <a href={`https://github.com/hejny/aiai/commit/${VERCEL_GIT_COMMIT_SHA}`}>
                        {VERCEL_GIT_COMMIT_MESSAGE}
                    </a>
                </span>
            </div>
        </Section>
    );
}

/**
 * TODO: !!! Where it is used? Link OR footer + [🧠] export
 */
