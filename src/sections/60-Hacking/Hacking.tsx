import { useTranslation } from 'next-i18next';
import { AllProjectsProject } from '../../../public/projects/all-projects/AllProjectsProject';
import { CollboardModulesSdkProject } from '../../../public/projects/collboard-modules-sdk/CollboardModulesSdkProject';
import { MapsProject } from '../../../public/projects/maps/MapsProject';
import { OpenSourceProject } from '../../../public/projects/open-source/OpenSourceProject';
import { VisualMathematicsProject } from '../../../public/projects/visual-mathematics/VisualMathematicsProject';
import { VrArProject } from '../../../public/projects/vr-ar/VrArProject';
import { Article } from '../../components/Article/Article';
import { Items } from '../../components/Items/Items';
import { Section } from '../../components/Section/Section';
import { Shuffle } from '../../components/Shuffle/Shuffle';
import styles from './Hacking.module.css';

export function HackingSection() {
    const { t } = useTranslation();

    return (
        <Section id="Hacking" className={styles.HackingSection}>
            <h2>{t('Hacking.title')}</h2>
            <Article content={t('Hacking.content')} isEnhanced/>
            <Items>
                <Shuffle seed="hacking">
                    <VisualMathematicsProject />
                    <OpenSourceProject />
                    <MapsProject />
                    <CollboardModulesSdkProject />
                    <VrArProject />
                </Shuffle>
                <AllProjectsProject />
            </Items>
        </Section>
    );
}
