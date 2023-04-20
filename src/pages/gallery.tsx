import { Oswald } from '@next/font/google';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Vector } from 'xyzt';
import { CaveOfIdeasInLightbulbWithTransparentLookThr_d3273ad0_Image } from '../../public/wallpapers/Pavol_Hejn_cave_of_ideas_in_lightbulb_with_transparent_look_thr_d3273ad0-097f-4011-b799-1c379bb05ee3_Image';
import { CaveOfIdeasWithTransparentLookThrough_fe3480c5_Image } from '../../public/wallpapers/Pavol_Hejn_cave_of_ideas_with_transparent_look_through_fe3480c5-76af-45da-ac4e-5177062bcb6b_Image';
import { CaveWithPresentation_dec31ff2_Image } from '../../public/wallpapers/Pavol_Hejn_cave_with_presentation_dec31ff2-3b9d-42b9-b84f-f87d02d6a391_Image';
import { CaveWithPrototypingLaboratory_ca9b82b9_Image } from '../../public/wallpapers/Pavol_Hejn_cave_with_prototyping_laboratory_ca9b82b9-0ded-44a3-b7ec-344ebb539439_Image';
import { DebugGrid } from '../components/DebugGrid/DebugGrid';
import { ImagineTag } from '../components/ImagineTag/ImagineTag';
import { Item } from '../components/Items/Item';
import { Items } from '../components/Items/Items';
import { Section } from '../components/Section/Section';
import { TiledBackground } from '../components/TiledBackground/TiledBackground';
import { AppHead } from '../sections/00-AppHead/AppHead';
import { CaveSection } from '../sections/01-Cave/Cave';
import { WelcomeSection } from '../sections/10-Welcome/Welcome';
import { FooterSection } from '../sections/90-Footer/Footer';
import styles from '../styles/common.module.css';
import { classNames } from '../utils/classNames';

const oswaltFont = Oswald({ weight: '400', style: 'normal', subsets: ['latin', 'latin-ext'] });

export default function GalleryPage() {
    return (
        <>
            <AppHead subtitle="Gallery"  /* <- TODO: !! Translate *//>

            <div className={classNames(styles.page, oswaltFont.className)}>
                <DebugGrid size={new Vector(5, 5)} />
                <header>
                    {/* TODO: Do some system for multiple pages */}
                    <CaveSection />
                </header>
                <div className={styles.background}>
                    {/* TODO: Do some system for multiple pages */}
                    <TiledBackground />
                </div>
                <main>
                    <WelcomeSection variant="SIDEPAGE" />
                    <Section>{/* <- TODO: !! Make propper secrion from this */}
                        {/* TODO: !! Translate */}
                        <h2>Gallery</h2>
                        <p>Images used on this page are generated using MidJourney:</p>

                        <Items itemsOnRow={2}>
                            <a
                                href="https://www.midjourney.com/app/jobs/fe3480c5-76af-45da-ac4e-5177062bcb6b"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Item>
                                    <Item.Image>
                                        <CaveOfIdeasWithTransparentLookThrough_fe3480c5_Image />
                                    </Item.Image>
                                    <Item.Description>
                                        <ImagineTag>Cave of ideas with transparent look through</ImagineTag>
                                    </Item.Description>
                                </Item>
                            </a>

                            <a
                                href="https://www.midjourney.com/app/jobs/d3273ad0-097f-4011-b799-1c379bb05ee3"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Item>
                                    <Item.Image>
                                        <CaveOfIdeasInLightbulbWithTransparentLookThr_d3273ad0_Image />
                                    </Item.Image>
                                    <Item.Description>
                                        <ImagineTag>Cave of ideas in lightbulb</ImagineTag>
                                    </Item.Description>
                                </Item>
                            </a>
                            <a
                                href="https://www.midjourney.com/app/jobs/dec31ff2-3b9d-42b9-b84f-f87d02d6a391"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Item>
                                    <Item.Image>
                                        <CaveWithPresentation_dec31ff2_Image />
                                    </Item.Image>
                                    <Item.Description>
                                        <ImagineTag>Cave with presentation</ImagineTag>
                                    </Item.Description>
                                </Item>
                            </a>
                            <a
                                href="https://www.midjourney.com/app/jobs/ca9b82b9-0ded-44a3-b7ec-344ebb539439"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Item>
                                    <Item.Image>
                                        <CaveWithPrototypingLaboratory_ca9b82b9_Image />
                                    </Item.Image>
                                    <Item.Description>
                                        <ImagineTag>Cave with prototyping laboratory</ImagineTag>
                                    </Item.Description>
                                </Item>
                            </a>
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
