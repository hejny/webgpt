import mockRouter from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { renderToStaticMarkup } from 'react-dom/server';
import { BehaviorSubject } from 'rxjs';
import { DEBUG } from '../../config';
import { ShuffleSeedContext } from '../components/Shuffle/Shuffle';
import { DebugContext } from '../pages/_app';
import { ShowcaseAppHead } from '../sections/00-AppHead/ShowcaseAppHead';
import { ShowcaseContentWithEdit } from '../sections/ShowcaseContentWithEdit/ShowcaseContentWithEdit';
import { WallpapersContext } from '../utils/hooks/WallpapersContext';
import { IWallpaper } from '../utils/IWallpaper';

export function exportAsHtml(wallpaper: IWallpaper): string {
    mockRouter.pathname = '/showcase/[slug]';
    mockRouter.query = { slug: wallpaper.id };

    const html = renderToStaticMarkup(
        <RouterContext.Provider value={mockRouter}>
            <DebugContext.Provider value={DEBUG}>
                <ShuffleSeedContext.Provider value={new Date().getUTCMinutes()}>
                    <WallpapersContext.Provider value={{ [wallpaper.id]: new BehaviorSubject(wallpaper) }}>
                        <ShowcaseAppHead />
                        <ShowcaseContentWithEdit
                            randomWallpaper={
                                wallpaper
                            } /* <- !!! This should be components <ShowcaseContent/> and <ShowcaseContentEdit randomWallpaper={...}/>
                                        HERE USE <ShowcaseContent/>
                            
                            */
                        />
                    </WallpapersContext.Provider>
                </ShuffleSeedContext.Provider>
            </DebugContext.Provider>
        </RouterContext.Provider>,
    );

    // TODO: !!! Do we need to do here some postprocessing?

    return html;
}
