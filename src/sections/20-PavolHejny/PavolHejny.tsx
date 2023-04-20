import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import pavolHejny from '../../../public/people/pavol-hejny.transparent.png';
import { Article } from '../../components/Article/Article';
import { Section } from '../../components/Section/Section';
import styles from './PavolHejny.module.css';

interface PavolHejnyProps {
    variant: 'SHORT' | 'FULL';
}

export function PavolHejnySection(props: PavolHejnyProps) {
    const { variant } = props;

    const { t } = useTranslation();

    return (
        <Section id="PavolHejny" className={styles.PavolHejnySection}>
            <h2>{t('PavolHejny.title')}</h2>

            <>
                {/* TODO: !!! Make <Person/> component from this */}
                {/* TODO: !!! Tidy up the commit with clipping */}
                {/* TODO: !!! Pick the best squircle */}
                <svg width="0" height="0">
                    <defs>
                        <clipPath id="squircle" clipPathUnits="objectBoundingBox">
                            <path
                                d="M .5,0 C .1,0 0,.1 0,.5 0,.9 .1,1 .5,1 .9,1 1,.9 1,.5 1,.1 .9,0 .5,0 Z" /* <- TODO: [1] DRY the shape */
                            ></path>
                        </clipPath>
                    </defs>
                </svg>
                <div className={styles.person}>
                    <Image
                        alt="Portrait photo of Pavol Hejný"
                        priority
                        src={pavolHejny}
                        // TODO: [🧑] Make some <ImageGravatar component; This is me@pavolhejny.com
                        //src="https://www.gravatar.com/avatar/10bceb8965947164502b4e7b3314733d?s=1024"
                        // width={1024}
                        // height={1024}
                        draggable="false"
                        placeholder="blur"
                    />
                    <div className={styles.personBackground} />
                </div>
                <div className={styles.personShadow}>
                    <svg viewBox="0 0 1 1" className={styles.personShadowInner}>
                        <path
                            d="M .5,0 C .1,0 0,.1 0,.5 0,.9 .1,1 .5,1 .9,1 1,.9 1,.5 1,.1 .9,0 .5,0 Z" /* <- TODO: [1] DRY the shape */
                            style={{
                                fill: '#33333377' /* <- TODO: Color (and probbably shape) should be in CSS not in HTML */,
                            }}
                        ></path>
                    </svg>
                </div>
            </>
            <Article content={t('PavolHejny.content')} isEnhanced />
        </Section>
    );
}

/**
 * TODO: Should we translate alt of the images like "Portrait photo of Pavol Hejný"
 * TODO: Add dynamically from https://raw.githubusercontent.com/hejny/hejny/main/documents/contact.md
 *       1) Download from external repo script (and add copy warning)
 *       2) Convert from local markdown to conponent
 *       3) Add also VCard
 *       4) Add also crypto
 * TODO: [🔗] ACRY should we use <a ...>...</a> OR <Link ...>...</Link> for external links in Next App
 */
