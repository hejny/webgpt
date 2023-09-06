import Image from 'next/image';
import spaceTrim from 'spacetrim';
import pavolHejny from '../../../public/people/pavol-hejny.transparent.png';
import { MarkdownContent } from '../MarkdownContent/MarkdownContent';
import styles from './PavolHejny.module.css';

export function PavolHejny() {
    return (
        <>
            <h2>Pavol Hejný</h2>

            <>
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
            <MarkdownContent
                content={spaceTrim(`
                            !!! Jsem Pavol, vývojář, který s nadšením využívá nové nástroje a technologie.
                            Spoluzaložil jsem virtuální tabuli Collboard  a elektronické učebnice H-edu.
                            Pracoval jsem na mnoha projektech České společnosti ornitologické. Přednášel
                            jsem na mnoha technologických a startupových konferencích + byl v porotě a
                            mentorem mnoha soutěží - například Startup Weekendu. Také pracuji na
                            Czech.events, newsletteru s nejzajímavějšími technologickými a startup
                            událostmi v Čechách.
                          `)}
                isEnhanced
            />
        </>
    );
}

/**
 * TODO: Maybe make <Person/> component
 * TODO: Should we translate alt of the images like "Portrait photo of Pavol Hejný"
 * TODO: Add dynamically from https://raw.githubusercontent.com/hejny/hejny/main/documents/contact.md
 *       1) Download from external repo script (and add copy warning)
 *       2) Convert from local markdown to conponent
 *       3) Add also VCard
 *       4) Add also crypto
 */
