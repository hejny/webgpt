import { useTranslation } from 'next-i18next';
import { BirdsProject } from '../../../public/projects/birds/BirdsProject';
import { CollboardProject } from '../../../public/projects/collboard/CollboardProject';
import { CzechEventsProject } from '../../../public/projects/czech-events/CzechEventsProject';
import { HEduProject } from '../../../public/projects/h-edu/HEduProject';
import { TownsProject } from '../../../public/projects/towns/TownsProject';
import { YourProjectProject } from '../../../public/projects/your-project/YourProjectProject';
import { Article } from '../../components/Article/Article';
import { Items } from '../../components/Items/Items';
import { Section } from '../../components/Section/Section';
import styles from './MyProjects.module.css';

export function MyProjectsSection() {
    const { t } = useTranslation();

    return (
        <Section id="Projects" className={styles.MyProjectsSection}>
            <h2>{t('Projects.title')}</h2>
            <Article content={t('Projects.content')} isEnhanced />
            <Items>
                
                    <TownsProject />
                    <CollboardProject />
                    <CzechEventsProject />

                    <BirdsProject />
                    <HEduProject />
                
                <YourProjectProject />
            </Items>

            <a className="button" href="https://github.com/hejny/hejny/blob/main/documents/projects.md">
                {t('Projects.all-projects')}
            </a>
        </Section>
    );
}

/**
 * TODO: Maybe rename to just Projects
 */
