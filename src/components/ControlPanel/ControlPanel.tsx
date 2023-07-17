import Link from 'next/link';
import { useRouter } from 'next/router';
import { classNames } from '../../utils/classNames';
import { colorToDataUrl } from '../../utils/color/utils/colorToDataUrl';
import { computeWallpaperUriid } from '../../utils/computeWallpaperUriid';
import { LikedStatus } from '../../utils/hooks/useLikedStatusOfCurrentWallpaper';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import { serializeWallpaper } from '../../utils/hydrateWallpaper';
import { IWallpaper } from '../../utils/IWallpaper';
import { getSupabaseForBrowser } from '../../utils/supabase/getSupabaseForBrowser';
import { provideClientId } from '../../utils/supabase/provideClientId';
import { parseKeywordsFromWallpaper } from '../Gallery/GalleryFilter/utils/parseKeywordsFromWallpaper';
import { MarkdownContent } from '../MarkdownContent/MarkdownContent';
import styles from './ControlPanel.module.css';
import { ControlPanelLikeButtons } from './ControlPanelLikeButtons';

interface ControlPanelProps {
    randomWallpaper: IWallpaper;
}

/**
 * @@@
 */
export function ControlPanel(props: ControlPanelProps) {
    const { randomWallpaper } = props;
    const router = useRouter();

    const [wallpaper, modifyWallpaper] = useWallpaper();

    return (
        <div
            className={classNames(
                'aiai-controls',
                styles.ControlPanel,
            )} /*style={{backgroundColor: mainBackground.then(negative).toHex()}}*/
        >
            {/* <div style={{color:'#1f6b08'}}>{wallpaperId}</div> */}

            {wallpaper.saveStage === 'EDITED' && (
                <button
                    className={classNames(styles.button, styles.callToAction)}
                    onClick={async () => {
                        const newWallpaper = modifyWallpaper((modifiedWallpaper) => {
                            // Note: [🗄] title is computed after each change id+parent+author+keywords are computed just once before save
                            modifiedWallpaper.parent = modifiedWallpaper.id;
                            modifiedWallpaper.author = provideClientId();
                            modifiedWallpaper.isPublic = false;
                            modifiedWallpaper.saveStage = 'SAVING';
                            modifiedWallpaper.keywords = Array.from(parseKeywordsFromWallpaper(modifiedWallpaper));
                            modifiedWallpaper.id = computeWallpaperUriid(modifiedWallpaper);
                            return modifiedWallpaper;
                        });

                        const insertResult = await getSupabaseForBrowser()
                            .from('Wallpaper')
                            .insert(serializeWallpaper(newWallpaper));

                        // TODO: !! Util isInsertSuccessfull (status===201)
                        console.log({ newWallpaper, insertResult });

                        /*
                        Note: Wallpapers should not be explicitly saved, they automatically appear as saved after router.push is loaded
                        modifyWallpaper((modifiedWallpaper) => {
                            modifiedWallpaper.saveStage = 'SAVED';
                            return modifiedWallpaper;
                        });
                        */

                        try {
                            const parentKey = `likedStatus_${wallpaper.id}`;
                            const currentKey = `likedStatus_${newWallpaper.id}`;

                            if (window.localStorage.getItem(parentKey)) {
                                window.localStorage.setItem(currentKey, window.localStorage.getItem(parentKey)!);
                            } else if (!window.localStorage.getItem(currentKey)) {
                                window.localStorage.setItem(currentKey, 'LIKE' satisfies keyof typeof LikedStatus);
                            }
                        } catch (error) {
                            // TODO: [🧠] Handle situation when window.localStorage is exceeded
                            console.log(error);
                        }

                        router.push(`/${newWallpaper.id}`);
                    }}
                >
                    Save
                </button>
            )}

            {wallpaper.saveStage === 'SAVED' && <ControlPanelLikeButtons />}

            {wallpaper.saveStage === 'SAVED' && (
                <Link
                    // TODO: !!!! Fix randomWallpaper (ACRY) - load lazy from database
                    href={`/${randomWallpaper.id}`}
                    /* Note: randomWallpaper image is already prerendered thare -> [🤰] */
                    className={classNames(/*'button',*/ styles.button)}
                    title="Show me another one"
                    onClick={() => {
                        // Note: No need for preventDefault
                        const headerWallpaperElement = document.getElementById('HeaderWallpaper')!;
                        headerWallpaperElement.setAttribute(
                            'src',
                            colorToDataUrl(randomWallpaper.colorStats.averageColor),
                        );
                        headerWallpaperElement.removeAttribute('srcset');
                    }}
                    style={
                        {
                            // ...minorButtonStyle,
                            // TODO: Better or delete
                            // backgroundColor: randomWallpaper.colorStats.averageColor.toHex(),
                            // color: randomWallpaper.colorStats.averageColor.then(textColor).toHex(),
                        }
                    }
                >
                    <MarkdownContent
                        content="🎲"
                        isUsingOpenmoji /* <- TODO: !! This should have more role like next not random */
                    />
                </Link>
            )}

            {wallpaper.saveStage === 'SAVED' && (
                <Link
                    href={{
                        pathname: '/[wallpaper]',
                        query: {
                            wallpaper: router.query.wallpaper,
                            mode: 'presentation',
                        },
                    }}
                    className={classNames(/*'button',*/ styles.button)}
                    title="Show without the controls"
                >
                    <MarkdownContent
                        content="▶"
                        isUsingOpenmoji
                        /* <- TODO: !!!
                        - Open sharing modal
                        - Show the QR code before
                        - Save to GET params to be able to send both /share and ?mode=presentation
                     */
                    />
                </Link>
            )}

            {/*
            Note: In the <Menu/>
            <Link
                href={'/'}
                className={classNames(styles.button)}
                title="Whole gallery"
                prefetch={false /* <- Note: Because gallery is enormous * /}
            >
                <Markdown content="🖼" isUsingOpenmoji /* <- TODO: !! Better icon OR Openmoji * / />
            </Link>
            */}

            <button
                className={classNames(/*'button',*/ styles.button)}
                title="Need help?"
                onClick={() => {
                    (window as any).smartsupp('chat:open');
                }}
            >
                <MarkdownContent content="💬" isUsingOpenmoji /* <- TODO: !! Better icon OR Openmoji */ />
            </button>
        </div>
    );
}

/**
 * TODO: Edit on GitHub button | Each wallpaper in each subfolder+ gallery/a/b/id/....ext
 * TODO: !! On mobile
 * TODO: !! [Previous][Next]
 * TODO: !! [Simmilar]
 * TODO: !! [👕] [Change photo]
 * TODO: !! [👕] [Change content] to change the markdown
 * TODO: !! Allow to => export (+Collboard export) => Buy
 * TODO: !! Rename component to something more meaningful
 * TODO: !! Use translate
 * TODO: !! [🧶] Show here prompt, link to midjourney, how it was made,...
 * TODO: [🧠] Play can trigger fullscreen
 */
