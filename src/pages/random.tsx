import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import { RandomWallpaperManager } from '../components/ControlPanel/RandomWallpaper/RandomWallpaperManager';
import { TasksInProgress } from '../components/TaskInProgress/TasksInProgress';
import styles from '../styles/static.module.css' /* <- TODO: [🤶] Get rid of page css and only use components */;

export default function RandomPage() {
    const router = useRouter();
    useEffect(() => {
        (async () => {
            const randomWallpaperManager = RandomWallpaperManager.getInstance();
            const wallpaper = await randomWallpaperManager.getWelcomeWallpaper();
            router.replace(`/${wallpaper.id}`);
        })();
    });

    return (
        <>
            <StaticAppHead subtitle={null} />

            <div className={styles.page}>
                <main>
                    <h1
                        style={{
                            display:
                                'none' /* <- TODO: For SEO/Social is it better to have invisible <h1> or just <title> + meta tags */,
                        }}
                    >
                        1-2i
                    </h1>
                    <TasksInProgress />
                </main>
            </div>
        </>
    );
}

/**
 * TODO: [🧠] Go to last wallpaper
 * TODO: [🧠] Make shuffle effect between wallpapers
 */
