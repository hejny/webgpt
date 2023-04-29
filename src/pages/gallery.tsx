import { Oswald } from '@next/font/google';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Vector } from 'xyzt';
import { generated_wallpapers } from '../../assets/ai/wallpaper';
import { AnImpressionistStylePaintingOfAFuturisticCity85a1d760F66a43829228545a1df4a55b0_1_Image } from '../../assets/ai/wallpaper/0-2.gallery/Pavol_Hejn_an_impressionist_style_painting_of_a_futuristic_city_85a1d760-f66a-4382-9228-545a1df4a55b-0_1_Image';
import { generated_wallpapers_old } from '../../assets/ai/wallpaper/0-2.index';
import { DebugGrid } from '../components/DebugGrid/DebugGrid';
import { ImagineTag } from '../components/ImagineTag/ImagineTag';
import { Item } from '../components/Items/Item';
import { Items } from '../components/Items/Items';
import { Section } from '../components/Section/Section';
import { TiledBackground } from '../components/TiledBackground/TiledBackground';
import { AppHead } from '../sections/00-AppHead/AppHead';
import { WelcomeSection } from '../sections/10-Welcome/Welcome';
import { FooterSection } from '../sections/90-Footer/Footer';
import styles from '../styles/common.module.css';
import { classNames } from '../utils/classNames';

const oswaltFont = Oswald({ weight: '400', style: 'normal', subsets: ['latin', 'latin-ext'] });

export default function GalleryPage() {
    return (
        <>
            <AppHead subtitle="Gallery" /* <- TODO: !! Translate */ />

            <div className={classNames(styles.page, oswaltFont.className)}>
                <DebugGrid size={new Vector(5, 5)} />
                <header>
                    {/* TODO: Do some system for multiple pages */}
                    {/* <CaveSection /> */}
                </header>
                <div className={styles.background}>
                    {/* TODO: Do some system for multiple pages */}
                    <TiledBackground />
                </div>
                <main>
                    <WelcomeSection variant="SIDEPAGE" />
                    <Section>
                        {/* <- TODO: !! Make propper secrion from this */}
                        {/* TODO: !! Translate */}
                        <h2>Gallery</h2>
                        <p>Images used on this page are generated using MidJourney:</p>

                        <Items itemsOnRow={2}>
                            <Item>
                                <Item.Image>
                                    <AnImpressionistStylePaintingOfAFuturisticCity85a1d760F66a43829228545a1df4a55b0_1_Image />
                                </Item.Image>
                                <Item.Description>
                                    <ImagineTag>
                                        {
                                            AnImpressionistStylePaintingOfAFuturisticCity85a1d760F66a43829228545a1df4a55b0_1_Image
                                                .metadata.full_command
                                        }
                                    </ImagineTag>
                                </Item.Description>
                            </Item>

                            {[
                                ...generated_wallpapers,
                                ...generated_wallpapers_old /* <- TODO: !!! Make generated_wallpapers_common */,
                            ].map((Wallpaper, i) => (
                                // TODO: <MidjourneyImage/>
                                // TODO: Show diffusion as animation
                                <a
                                    key={i /* <- TODO: Better */}
                                    href="https://www.midjourney.com/app/jobs/fe3480c5-76af-45da-ac4e-5177062bcb6b" /* <- !!! From metadata */
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Item>
                                        <Item.Image>
                                            <Wallpaper />
                                        </Item.Image>
                                        <Item.Description>
                                            <ImagineTag>
                                                {/* !!! From metadata */}Cave of ideas with transparent look through
                                            </ImagineTag>
                                        </Item.Description>
                                    </Item>
                                </a>
                            ))}
                        </Items>
                    </Section>
                </main>
                <footer>
                    <FooterSection />
                </footer>
            </div>
        </>
    );
}

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

/**
 * TODO: !! i18n + make section
 * TODO: [🪒] Can be getStaticProps shared between all pages?
 * TODO: [🪒] Can be fonts shared between all pages?
 * TODO: Write better about how are images created
 *       TODO: Connect with section/article about AI generative technology
 * TODO: Some image frames
 * TODO: Make some menu
 * TODO: [🧈] Best way how to share page css
 * TODO: DRY with index.tsx
 * TODO: [🔗] ACRY should we use <a ...>...</a> OR <Link ...>...</Link> for external links in Next App
 * TODO: Generate the components like <CaveOfIdeasWithTransparentLookThroughImageXfe3480c5 /> with links
 */
