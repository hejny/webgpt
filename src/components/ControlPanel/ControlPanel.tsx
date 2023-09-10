import Image from 'next/image';
import { useRouter } from 'next/router';
import { classNames } from '../../utils/classNames';
import { computeWallpaperUriid } from '../../utils/computeWallpaperUriid';
import { useCurrentWallpaper } from '../../utils/hooks/useCurrentWallpaper';
import { LikedStatus } from '../../utils/hooks/useLikedStatusOfCurrentWallpaper';
import { serializeWallpaper } from '../../utils/hydrateWallpaper';
import { getSupabaseForBrowser } from '../../utils/supabase/getSupabaseForBrowser';
import { provideClientId } from '../../utils/supabase/provideClientId';
import { parseKeywordsFromWallpaper } from '../Gallery/GalleryFilter/utils/parseKeywordsFromWallpaper';
import { Hint } from '../Hint/Hint';
import { WallpaperLink } from '../WallpaperLink/WallpaperLink';
import styles from './ControlPanel.module.css';
import { ControlPanelLikeButtons } from './ControlPanelLikeButtons';
import { RandomWallpaperButton } from './RandomWallpaper/RandomWallpaperButton';

/**
 * Renders the control panel for navigation and actions.
 */
export function ControlPanel() {
    const router = useRouter();
    const [wallpaper, modifyWallpaper] = useCurrentWallpaper();

    return (
        <div
            // Note: It is intended to have two divs embedded in each other
            className={classNames('aiai-controls', styles.ControlPanel)}
        >
            {/* <div style={{color:'#1f6b08'}}>{wallpaperId}</div> */}
            <div className={styles.group}>
                {wallpaper.saveStage === 'EDITED' && (
                    <button
                        className={classNames(styles.button, styles.callToAction)}
                        onClick={async () => {
                            const newWallpaper = modifyWallpaper((modifiedWallpaper) => {
                                // Note: [🗄] title is computed after each change id+parent+author+keywords are computed just once before save
                                // TODO: Use here addWallpaperComputables
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
                            console.info({ newWallpaper, insertResult });

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
                                console.error(error);
                            }

                            router.push(`/${newWallpaper.id}`);
                        }}
                    >
                        Save
                    </button>
                )}

                {wallpaper.saveStage === 'SAVED' && <ControlPanelLikeButtons />}
                {wallpaper.saveStage === 'SAVED' && <RandomWallpaperButton />}
                {wallpaper.saveStage === 'SAVED' && (
                    <Hint id="control-show-mode" title="Presentation mode" reapearCount={0}>
                        <WallpaperLink role="OWNER_AS_VISITOR" className={classNames(/*'button',*/ styles.button)}>
                            <Image alt="🌍" src="/icons/openmoji/E253.black.svg" width={40} height={40} /* <-[🧥] */ />
                            {/* <MarkdownContent content="▶" isUsingOpenmoji /> */}
                        </WallpaperLink>
                    </Hint>
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

                {/*<WallpaperLink className={classNames(/*'button',* / styles.button)} title="Need help?" page="contact">
                    <Image alt="💬" src="/icons/openmoji/1F4AC.black.svg" width={40} height={40} /* <-[🧥] * / />
                    {/* <MarkdownContent content="💬" isUsingOpenmoji  /> * /}
                </WallpaperLink>
                */}
            </div>
        </div>
    );
}

/**
 * TODO: !! Rename to GalleryControlPanel
 * TODO: !! Use translate
 * TODO: [🧠] Play can trigger fullscreen
 */
