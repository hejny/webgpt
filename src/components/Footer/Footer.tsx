import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Footer.module.css';

/**
 * A functional component that renders a footer section with some links ⁘
 *
 * @returns {JSX.Element} The footer section element.
 */
export function FooterSection() {
    const router = useRouter();
    const { t } = useTranslation();

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
                    <Link href="/">Home</Link>
                </li>

                {/*
                <li>
                    <Link href="https://blog.pavolhejny.com">Blog</Link>
                </li>
                */}

                <li>
                    <Link
                        href={{
                            pathname: '/[wallpaper]',
                            query: {
                                wallpaper: router.query.wallpaper,
                                mode: 'explanation',
                            },
                        }}
                    >
                        AI Web
                    </Link>
                </li>

                <li>
                    <Link href="https://1-2i.com/contact">Contact</Link>
                </li>

                {/*
                <li>
                    <a href="https://github.com/hejny/aiai/">v{VERSION}</a>
                </li>
                */}
            </ul>
        </div>
    );
}

/**
 * TODO: !! Footer always sticked on bottom
 * TODO: !! Fix footer section
 * TODO: !! No cookie's sentence 
 * TODO: !! Email & follow subscription
 * TODO: !! Email & follow subscription + Popup as nice alert after 10s
 * TODO: !! Add all legal stuff
 *       @see https://www.inizio.cz/blog/povinne-udaje-webu/
 *       @see https://techheaven.org/org
 *       Also in Collboard AND other projects
 *       Ask if sídlo firmy is nessesary?
 * TODO: !!! Google analytics
 * TODO: !!! Smartlook
 * TODO: !! Cookies bar
 * TODO: Use meaningfully OR remove </DisplayOn> OR 👀 remake to classes .desktop .mobile .tablet ...

 * TODO: Link to MidJourney + * generated with MidJourney
 * TODO: Link to GitHub
 */
