import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { renderToStaticMarkup } from 'react-dom/server';
import { BehaviorSubject } from 'rxjs';
import { DEBUG } from '../../../config';
import { DebugContext } from '../../pages/_app';
import { ShowcaseAppHead } from '../../sections/00-AppHead/ShowcaseAppHead';
import { ShowcaseContentWithEdit } from '../../sections/ShowcaseContentWithEdit/ShowcaseContentWithEdit';
import { useClosePreventionSystem } from '../../utils/hooks/useClosePreventionSystem';
import { useCurrentWallpaperId } from '../../utils/hooks/useCurrentWallpaperId';
import { useObservable } from '../../utils/hooks/useObservable';
import { useWallpaperSubject } from '../../utils/hooks/useWallpaperSubject';
import { WallpapersContext } from '../../utils/hooks/WallpapersContext';
import { ColorBox } from '../Color/ColorBox';
import { ColorInput } from '../ColorInput/ColorInput';
import { ImagineTag } from '../ImagineTag/ImagineTag';
import { SelectWithFirst } from '../SelectWithFirst/SelectWithFirst';
import { ShuffleSeedContext } from '../Shuffle/Shuffle';
import styles from './EditModal.module.css';

const MarkdownEditor = dynamic(() => import('@uiw/react-markdown-editor').then((mod) => mod.default), { ssr: false });

interface EditModalProps {
    turnOffEditing(): void;
}

/**
 * @@
 */
export function EditModal(props: EditModalProps) {
    const { turnOffEditing } = props;
    const wallpaperId = useCurrentWallpaperId();
    const wallpaperSubject = useWallpaperSubject(wallpaperId);
    const { value: wallpaper } = useObservable(wallpaperSubject);
    const router = useRouter();
    const closePreventionSystem = useClosePreventionSystem();

    return (
        <>
            <div className={styles.overlay} onClick={turnOffEditing}></div>
            <div className={styles.EditModal}>
                <div className={styles.title}>Editing</div>
                <div className={styles.xxxx}>
                    <ImagineTag>{wallpaper.prompt}</ImagineTag>
                </div>
                <div className={styles.xxxx}>
                    <SelectWithFirst
                        title="Color algorithm"
                        value={wallpaper.colorStats.version}
                        onChange={(version) => {
                            /* !!! */
                        }}
                        numberOfButtons={0}
                        options={[
                            {
                                id: wallpaper.colorStats.version,
                                title: wallpaper.colorStats.version,
                            },
                        ]}
                    />
                </div>
                <div className={styles.xxxx}>
                    {wallpaper.colorStats.palette.map((color, i) => (
                        <div key={i}>
                            <ColorInput
                                defaultValue={color.value}
                                onChange={(newColor) => {
                                    // TODO: [🧠] !! DRY [🎋]
                                    // TODO: [🧠] !! Reset when switching wallpapers

                                    closePreventionSystem.registerClosePrevention({
                                        canBeClosed: false /* <- TODO: Change according to if downloaded or not */,
                                    });
                                    document.documentElement.style.setProperty(`--palette-${i}`, newColor.toHex());
                                    document.documentElement.style.setProperty(
                                        `--palette-${i}-triplet`,
                                        `${newColor.red}, ${newColor.green}, ${newColor.blue}`,
                                    );
                                }}
                            />
                            <p>{color.note}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.xxxx}>
                    <div>
                        averageColor:
                        <ColorBox value={wallpaper.colorStats.averageColor} />
                    </div>

                    {/*<pre>{JSON.stringify(wallpaper.colorStats, null, 4)}</pre>*/}
                </div>
                <div className={styles.xxxx}>
                    <MarkdownEditor
                        className={styles.editor}
                        value={wallpaper.content}
                        onChange={(content) => {
                            closePreventionSystem.registerClosePrevention({
                                canBeClosed: false /* <- TODO: Change according to if downloaded or not */,
                            });
                            wallpaperSubject.next({ ...wallpaperSubject.value, content });
                        }}
                        // TODO: Hide fullscreen button
                        // toolbarsFilter={(tool) => tool === 'fullscreen'}
                    />
                </div>
                <div className={styles.xxxx}>
                    <button className={'button'} onClick={turnOffEditing}>
                        Done
                    </button>

                    <button
                        className={'button'}
                        onClick={() => {
                            const html = renderToStaticMarkup(
                                <RouterContext.Provider value={router}>
                                    <DebugContext.Provider value={DEBUG}>
                                        <ShuffleSeedContext.Provider value={new Date().getUTCMinutes()}>
                                            <WallpapersContext.Provider
                                                value={{ [wallpaper.id]: new BehaviorSubject(wallpaper) }}
                                            >
                                                <ShowcaseAppHead />
                                                <ShowcaseContentWithEdit
                                                    randomWallpaper={
                                                        wallpaper
                                                    } /* <- !!! This should be components <ShowcaseContent/> and <ShowcaseContentEdit randomWallpaper={...}/>
                                                                HERE USE <ShowcaseContent/>
                                                    
                                                    */
                                                />
                                            </WallpapersContext.Provider>
                                            {/*
                                            <ShowcasePage
                                                currentWallpaper={
                                                    {
                                                        // TODO: !!! Unhardcode
                                                        id: 'c3685a89-e384-4dcb-bd69-c1828ad72925',
                                                        src: 'https://cdn.midjourney.com/6be2b125-4fbb-498f-8f08-fc153998fef5/0_0.png',
                                                        prompt: 'A beautiful sunset over the ocean',
                                                        colorStats: {
                                                            version: 'colorful-192x108-16bit-v13palette',
                                                            palette: [
                                                                {
                                                                    note: 'Most satulighted color which is dark enough to white text on it',
                                                                    value: '#995555',
                                                                    count: 2,
                                                                },
                                                                {
                                                                    note: 'Most distant color from primary color',
                                                                    value: '#ffffff',
                                                                },
                                                                {
                                                                    note: 'Darkest color which is distant enough (10%) and hue-distant enough (30°) from all other palette colors',
                                                                    value: '#221100',
                                                                },
                                                            ],
                                                            averageColor: '#674332',
                                                            lightestColor: '#ffffdd',
                                                            darkestColor: '#111100',
                                                            mostFrequentColors: [
                                                                { value: '#222222', count: 983 },
                                                                { value: '#bb5533', count: 278 },
                                                                { value: '#ffcc44', count: 47 },
                                                            ],
                                                            mostSatulightedColors: [
                                                                { value: '#ffaa55', count: 29 },
                                                                { value: '#ffff55', count: 3 },
                                                                { value: '#994444', count: 1 },
                                                                { value: '#224455', count: 1 },
                                                            ],
                                                            mostGroupedColors: [{ value: '#221111', count: 429 }],
                                                            bottomHalf: {
                                                                averageColor: '#443531',
                                                                lightestColor: '#ffeebb',
                                                                darkestColor: '#110000',
                                                                mostFrequentColors: [
                                                                    { value: '#222222', count: 1489 },
                                                                    { value: '#996655', count: 82 },
                                                                    { value: '#ffbb77', count: 18 },
                                                                ],
                                                                mostSatulightedColors: [
                                                                    { value: '#ffaa55', count: 14 },
                                                                    { value: '#ffffaa', count: 1 },
                                                                    { value: '#995555', count: 2 },
                                                                ],
                                                                mostGroupedColors: [{ value: '#111111', count: 679 }],
                                                            },
                                                            bottomThird: {
                                                                averageColor: '#373335',
                                                                lightestColor: '#ffeecc',
                                                                darkestColor: '#221100',
                                                                mostFrequentColors: [
                                                                    { value: '#222222', count: 2018 },
                                                                    { value: '#996655', count: 86 },
                                                                    { value: '#eecc77', count: 2 },
                                                                ],
                                                                mostSatulightedColors: [{ value: '#ffaa66', count: 2 }],
                                                                mostGroupedColors: [{ value: '#111111', count: 1037 }],
                                                            },
                                                            bottomLine: {
                                                                averageColor: '#24252e',
                                                                lightestColor: '#885544',
                                                                darkestColor: '#001111',
                                                                mostFrequentColors: [{ value: '#111122', count: 4968 }],
                                                                mostSatulightedColors: [
                                                                    { value: '#885544', count: 108 },
                                                                    { value: '#334455', count: 540 },
                                                                ],
                                                                mostGroupedColors: [{ value: '#111122', count: 1188 }],
                                                            },
                                                        },
                                                        title: 'Ocean Energy',
                                                        content:
                                                            '# Ocean Energy\n\nWelcome to Ocean Vibes, a website dedicated to helping you find peace and tranquility through the beauty of the ocean. Our stunning background featuring a breathtaking sunset over the ocean is just one of the many ways we can help you transform your digital space into a serene oasis.\n\n## About Us\n\nAt Ocean Vibes, we believe that connecting with nature can have a profound impact on our well-being. That\'s why we\'ve created a collection of carefully curated backgrounds inspired by the ocean, designed to help you feel more calm, centered, and focused throughout your day.\n\n## User Stories\n\n- "I love the feeling of serenity I get when I look at the beautiful backgrounds on Ocean Vibes. It\'s like having a little piece of the ocean with me wherever I go." - Emily, 29\n- "As someone who struggles with anxiety, having a calming background on my phone has been a game-changer for me. Ocean Vibes has become my go-to source for finding new and soothing backgrounds." - Alex, 34\n\n## Our Collection\n\nIn addition to our stunning sunset over the ocean background, we offer a wide variety of other ocean-inspired backgrounds, including:\n\n- **Calm Waters:** A tranquil scene of still waters reflecting the sky above.\n- **Underwater World:** Dive into the depths of the ocean with this mesmerizing underwater scene.\n- **Beach Bliss:** Transport yourself to a sunny beach paradise with this vibrant background.\n\n## Resources\n\nLooking to learn more about the ocean and its many wonders? Check out some of our favorite resources:\n\n- [National Geographic Ocean Exploration](#)\n- [Ocean Conservancy](#)\n- [The Marine Mammal Center](#)\n\n## Contact Us\n\nHave a question or comment? We\'d love to hear from you! Get in touch with us at [oceanvibes@example.com](mailto:oceanvibes@example.com).\n\nThank you for visiting Ocean Vibes, and we hope our backgrounds help bring a little bit of the calming energy of the ocean into your life. 🌊',
                                                        font: 'Raleway',
                                                    } as any
                                                }
                                            />
                                            */}
                                            {/* 
                                            <WallpapersContext.Provider
                                                value={hydrateWallpapers([
                                                    wallpaper as any,
                                                ])} /* <- This provider is already in ShowcasePage * /
                                            >
                                                <HeaderWallpaper />
                                                {/*
                                                <ShowcasePage currentWallpaper={wallpaper} randomWallpaper={wallpaper} />
                                                * /}
                                            </WallpapersContext.Provider>
                                        */}
                                        </ShuffleSeedContext.Provider>
                                    </DebugContext.Provider>
                                </RouterContext.Provider>,
                            );
                            console.log(html);
                            alert(html);
                        }}
                    >
                        Download
                    </button>
                </div>
            </div>
        </>
    );
}

/**
 * TODO: !!! Design
 * TODO: !!! Split into info and edit part
 * TODO: !!! Allow to apply color-stats with different algorithms
 */
