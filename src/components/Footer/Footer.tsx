import { WallpaperLink } from '../WallpaperLink/WallpaperLink';
import styles from './Footer.module.css';

/**
 * Renders the footer section with links
 *
 * @returns {JSX.Element} The footer section element.
 */
export function FooterSection() {

    return (
        <div className={styles.FooterSection}>
            <ul>
                <li>© {new Date().getFullYear()}</li>

                {/*
                <li>
                    <Link href="https://pavolhejny.com">Pavol Hejný</Link>
                </li>
                */}

                <li>
                    <WallpaperLink page="index">Home</WallpaperLink>
                </li>

                <li>
                    <WallpaperLink page="explanation">AI Web</WallpaperLink>
                </li>

                <li>
                    <WallpaperLink page="contact">Contact</WallpaperLink>
                </li>

                {/*
                <li>
                    <a href="https://github.com/hejny/aiai/">v{APP_VERSION}</a>
                </li>
                */}
            </ul>
        </div>
    );
}

/**
 * TODO: !!! More links, structure + better design
 * TODO: !! Fix footer section
 * TODO: !! No cookie's sentence 
 * TODO: !! Email & follow subscription
 * TODO: !! Email & follow subscription + Popup as nice alert after 10s
 * TODO: !! Add all legal stuff
 *       @see https://www.inizio.cz/blog/povinne-udaje-webu/
 *       @see https://techheaven.org/org
 *       Also in Collboard AND other projects
 *       Ask if sídlo firmy is nessesary?
 * TODO: !! Cookies bar
 * TODO: Use meaningfully OR remove </DisplayOn> OR 👀 remake to classes .desktop .mobile .tablet ...

 * TODO: Link to MidJourney + * generated with MidJourney
 * TODO: Link to GitHub
 */
