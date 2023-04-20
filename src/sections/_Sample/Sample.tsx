import { useTranslation } from 'next-i18next';
import { Article } from '../../components/Article/Article';
import { Section } from '../../components/Section/Section';
import styles from './Sample.module.css';

interface SampleProps {
    variant: 'SHORT' | 'FULL';
}

export function SampleSection(props: SampleProps) {
    const { variant } = props;

    const { t } = useTranslation();

    return (
        <Section id="Sample" className={styles.SampleSection}>
            <h2>{t('Sample.title')}</h2>

            <Article content={t('Sample.content')} isEnhanced />

            {variant === 'FULL' && <Article content={t('Sample.content')} isEnhanced />}

            {/* ... */}
        </Section>
    );
}
