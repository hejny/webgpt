import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import pavolHejny from '../../../public/people/pavol-hejny.transparent.png';
import { Article } from '../../components/Article/Article';
import { Section } from '../../components/Section/Section';
import styles from './Contact.module.css';

/**
 * Interface for contact section props ⁘
 * 
 * @interface
 * @property {('SHORT' | 'FULL')} variant - The variant of the contact section
 */
interface ContactProps {
    variant: 'SHORT' | 'FULL';
}

/**
 * A function component that renders a contact section ⁘
 * 
 * @param {ContactProps} props - The props for the component
 * @returns {JSX.Element} The contact section element
 */
export function ContactSection(props: ContactProps) {
    const { variant } = props;

    const { t } = useTranslation();

    return (
        <Section id="Contact">
            <h2>{t('Contact.title')}</h2>

            <Article content={t('Contact.content')} isEnhanced />

            <div className={styles.vcard}>
                <Image
                    // TODO: !! Bottom out centered image
                    // TODO: Do we need to i18n alt of images?
                    alt="Portrait photo of Pavol Hejný looking behind of 3D printer"
                    src={pavolHejny}
                    width={200}
                    height={200}
                    draggable="false"
                    placeholder="blur"
                />

                <ul>
                    <li>
                        <a href="mailto:pavol@hejny.org">Email</a>
                    </li>
                    <li>
                        <a href="https://github.com/hejny/">GitHub</a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/hejny/">LinkedIn</a>
                    </li>

                    <li>
                        <a href="https://m.me/hejny">Messenger</a>
                    </li>

                    {variant === 'FULL' && (
                        <>
                            <li>
                                <a href="https://t.me/hejny">Telegram</a>
                            </li>

                            <li>
                                <a href="https://www.facebook.com/hejny">Facebook</a>
                            </li>
                            <li>
                                <a href="https://instagram.com/pavolhejny/">Instagram</a>
                            </li>
                            <li>
                                <a href="https://twitter.com/pavolhejny">Twitter</a>
                            </li>
                            <li>
                                <a href="https://blog.ai.ai.hejny.org">Blog</a>
                            </li>
                            <li>
                                <a href="https://www.blockchain.com/btc/address/bc1qyuy7j80lxepv2wjdvflgajyatpmyqkmc75spvq">
                                    Bitcoin
                                </a>
                            </li>
                            <li>
                                <a href="https://etherscan.io/address/0x1640d8BeACC8F011f820EaCC83A5d327a70e95CA">
                                    Ethereum
                                </a>
                            </li>
                            <li>
                                <a href="https://cardanoscan.io/address/01dfdb2955f8f1c2b4306cec5502e8ebfd9dac5dcbc62a39fe007c866fbf916172d3cae24c414197e5e4095864af8530586adcfdf5153866e6">
                                    Cardano
                                </a>
                            </li>
                        </>
                    )}

                    {variant === 'SHORT' && (
                        <li>
                            <Link href="/contact">{t('Contact.more')}</Link>
                        </li>
                    )}
                </ul>
            </div>
        </Section>
    );
}

/**
 * TODO: !! Better footer with - links, form, contact, subscribe, legal (address, Datovka 3te6yxg), copyright, technical
 * TODO: Contact form
 * TODO: [🔗] ACRY should we use <a ...>...</a> OR <Link ...>...</Link> for external links in Next App
 */
