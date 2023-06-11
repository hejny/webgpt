import { useTranslation } from 'next-i18next';
import { VERCEL_GIT_COMMIT_MESSAGE, VERCEL_GIT_COMMIT_SHA, VERSION } from '../../../config';
import { Article } from '../../components/Article/Article';
import { Section } from '../../components/Section/Section';
import styles from './TechnicalInfo.module.css';

/**
 * A React component that renders technical information about the app ⁘
 * 
 * @returns {JSX.Element} A section element with the title, content, version, repository and commit of the app.
 */
export function TechnicalInfo() {
    const { t } = useTranslation();

    return (
        <Section>
            <h2>{t('TechnicalInfo.title')}</h2>

            <Article content={t('TechnicalInfo.content')} isEnhanced />

            <div className={styles.field}>
                <span>Version:</span>
                <span>{VERSION}</span>
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
