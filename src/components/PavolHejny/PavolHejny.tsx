import Image from 'next/image';
import Link from 'next/link';
import pavolHejnyArticle from '../../../documents/pavol-hejny.md';
import pavolHejny from '../../../public/people/pavol-hejny.transparent.png';
import { removeMarkdownTitle } from '../../utils/content/removeMarkdownTitle';
import { MarkdownContent } from '../MarkdownContent/MarkdownContent';
import styles from './PavolHejny.module.css';

export function PavolHejny() {
    return (
        <div className={styles.PavolHejnySection}>
            <svg width="0" height="0">
                <defs>
                    <clipPath id="squircle" clipPathUnits="objectBoundingBox">
                        <path
                            d="M .5,0 C .1,0 0,.1 0,.5 0,.9 .1,1 .5,1 .9,1 1,.9 1,.5 1,.1 .9,0 .5,0 Z" /* <- TODO: [1] DRY the shape */
                        ></path>
                    </clipPath>
                </defs>
            </svg>
            <Link href="https://www.pavolhejny.com/" className={styles.person}>
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
            </Link>
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

            <h2>Who is behind?</h2>
            <MarkdownContent
                content={removeMarkdownTitle(pavolHejnyArticle)}
                // not isEnhanced
            />
        </div>
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
