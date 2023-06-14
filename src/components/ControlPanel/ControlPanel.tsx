import Link from 'next/link';
import { useRouter } from 'next/router';
import { classNames } from '../../utils/classNames';
import { colorToDataUrl } from '../../utils/color/utils/colorToDataUrl';
import { IWallpaper } from '../../utils/IWallpaper';
import { Article } from '../Article/Article';
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

    return (
        <div
            className={classNames(
                'aiai-controls',
                styles.ControlPanel,
            )} /*style={{backgroundColor: mainBackground.then(negative).toHex()}}*/
        >
            {/* <div style={{color:'#1f6b08'}}>{wallpaperId}</div> */}

            <ControlPanelLikeButtons />

            <Link
                href={`/showcase/${randomWallpaper.id}`}
                /* Note: randomWallpaper image is already prerendered thare -> [🤰] */
                className={classNames(/*'button',*/ styles.button)}
                title="Show me another one"
                onClick={() => {
                    // Note: No need for preventDefault
                    const headerWallpaperElement = document.getElementById('HeaderWallpaper')!;
                    headerWallpaperElement.setAttribute('src', colorToDataUrl(randomWallpaper.colorStats.averageColor));
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
                <Article
                    content="🎲"
                    isUsingOpenmoji /* <- TODO: !! This should have more role like next not random */
                />
            </Link>

            {/*
            Note: In the <Menu/>
            <OpenModalLink modal={'edit'} className={classNames( styles.button)} title="Edit this web">
                <Article content="🖊" isUsingOpenmoji />
            </OpenModalLink>
            */}

            <Link
                href={{
                    pathname: '/showcase/[wallpaper]',
                    query: {
                        wallpaper: router.query.wallpaper,
                        mode: 'presentation',
                    },
                }}
                className={classNames(/*'button',*/ styles.button)}
                title="Show without the controls"
            >
                <Article
                    content="▶"
                    isUsingOpenmoji
                    /* <- TODO: !!!
                        - Open sharing modal
                        - Show the QR code before
                        - Save to GET params to be able to send both /share and ?mode=presentation
                     */
                />
            </Link>

            {/*
            Note: In the <Menu/>
            <Link
                href={'/'}
                className={classNames(styles.button)}
                title="Whole gallery"
                prefetch={false /* <- Note: Because gallery is enormous * /}
            >
                <Article content="🖼" isUsingOpenmoji /* <- TODO: !! Better icon OR Openmoji * / />
            </Link>
            */}

            <button
                className={classNames(/*'button',*/ styles.button)}
                title="Need help?"
                onClick={() => {
                    (window as any).smartsupp('chat:open');
                }}
            >
                <Article content="💬" isUsingOpenmoji /* <- TODO: !! Better icon OR Openmoji */ />
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
