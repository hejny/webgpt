import Image from 'next/image';
import spaceTrim from 'spacetrim';
import pavolHejny from '../../../public/people/pavol-hejny.transparent.png';
import { MarkdownContent } from '../MarkdownContent/MarkdownContent';
import styles from './PavolHejny.module.css';

export function PavolHejny() {
    return (
        <>
            <h2>Who is behind?</h2>

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
                            I'm [Pavol Hejný](https://www.pavolhejny.com/), a **developer and tech enthusiast** who is passionate about exploring
                            cutting-edge tools and technologies. As a co-founder of H-edu and Collboard,
                            I'm invested in using digital innovation to transform education. I've
                            developed several citizen science projects, including the first mobile app
                            for birdwatchers in the Czech Republic, and spoken at tech and startup
                            conferences on topics such as VR, AR and AI. I also run Czech.events, a
                            platform that helps people find and attend technology and innovation events.
                            My talent for identifying growth opportunities and mentoring startups has
                            led me to win several innovation competitions. I'm committed to inspiring
                            others and believe that technology can help solve the world's problems.
                          ` /* <- TODO: !!! Shorten + make more suitable for 1-2i */)}
                // not isEnhanced
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
