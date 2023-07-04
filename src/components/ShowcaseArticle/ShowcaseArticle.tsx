import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { computeWallpaperUriid } from '../../utils/computeWallpaperUriid';
import { detectContentFormat } from '../../utils/content/detectContentFormat';
import { extractTitleFromContent } from '../../utils/content/extractTitleFromContent';
import { useCurrentWallpaperId } from '../../utils/hooks/useCurrentWallpaperId';
import { LikedStatus } from '../../utils/hooks/useLikedStatusOfCurrentWallpaper';
import { useMode } from '../../utils/hooks/useMode';
import { useObservable } from '../../utils/hooks/useObservable';
import { useWallpaperSubject } from '../../utils/hooks/useWallpaperSubject';
import { serializeColorStats } from '../../utils/image/utils/serializeColorStats';
import { getSupabaseForBrowser } from '../../utils/supabase/getSupabaseForBrowser';
import { provideClientId } from '../../utils/supabase/provideClientId';
import { Database } from '../../utils/supabase/types';
import { string_html } from '../../utils/typeAliases';
import { extractFontsFromContent } from '../Fonts/extractFontsFromContent';
import { Fonts } from '../Fonts/Fonts';
import { parseKeywordsFromWallpaper } from '../Gallery/GalleryFilter/utils/parseKeywordsFromWallpaper';
import { Html } from '../Html/Html';
import { Markdown } from '../Markdown/Markdown';
import { Section } from '../Section/Section';
import styles from './ShowcaseArticle.module.css';

/**
 * @@@
 */
export function ShowcaseArticleSection() {
    // TODO: [🩺] One hook for [wallpaper,mutateWallpaper]
    const wallpaperId = useCurrentWallpaperId();
    const wallpaperSubject = useWallpaperSubject(wallpaperId);
    const { value: wallpaper } = useObservable(wallpaperSubject);
    const { isPresenting } = useMode();
    const router = useRouter();

    const content = wallpaper.content;
    const contentFormat = detectContentFormat(content);

    const isEditable = !isPresenting;
    const onHtmlChange = !isEditable
        ? undefined
        : debounce(async (newContent: string_html) => {
              console.info('newContent', newContent);

              wallpaperSubject.next({ ...wallpaperSubject.value, content: newContent, isSaved: false });
              return;
              // TODO: DRY [💽]
              const { prompt, src, colorStats } = wallpaper;
              const title = extractTitleFromContent(newContent) || 'Untitled';
              const keywords = Array.from(parseKeywordsFromWallpaper({ prompt, content }));
              const newAnonymousWallpaper = {
                  parent: wallpaper.id,
                  author: provideClientId(),
                  src,
                  prompt,
                  colorStats,
                  content: newContent,
                  title,
                  keywords,
              };

              const newWallpaper = {
                  id: computeWallpaperUriid(newAnonymousWallpaper),
                  ...newAnonymousWallpaper,
                  colorStats: serializeColorStats(newAnonymousWallpaper.colorStats),
                  isPublic: false,
                  author: provideClientId(),
              } as Database['public']['Tables']['Wallpaper']['Insert'];

              const insertResult = await getSupabaseForBrowser().from('Wallpaper').insert(newWallpaper);

              // TODO: !! Util isInsertSuccessfull (status===201)
              console.log({ newWallpaper, insertResult });

              try {
                  const parentKey = `likedStatus_${wallpaper.id}`;
                  const currentKey = `likedStatus_${newWallpaper.id}`;

                  if (window.localStorage.getItem(parentKey)) {
                      window.localStorage.setItem(currentKey, window.localStorage.getItem(parentKey)!);
                  } else if (!window.localStorage.getItem(currentKey)) {
                      window.localStorage.setItem(currentKey, 'LIKE' satisfies keyof typeof LikedStatus);
                  }
              } catch (error) {
                  // TODO: !!! [🧠] Handle situation when window.localStorage is exceeded
                  console.log(error);
              }

              router.push(`/${newWallpaper.id}`);
          }, 1000 /* <- TODO: !!! Figure out the best strategy how to change */);

    return (
        <Section id="home" className={styles.Article}>
            {/*
            TODO: 
            <h1 className={styles.handritten}>
                <HandwrittenText color={skin.highlightedTextColor}>{wallpaper.title}</HandwrittenText>
            </h1>
            */}

            <Fonts fonts={extractFontsFromContent(content)} />

            {contentFormat === 'html' && <Html {...{ content, isEditable, onHtmlChange }} />}
            {contentFormat === 'markdown' && (
                <Markdown
                    isusingFonts
                    isUsingOpenmoji={
                        false /* <- TODO: [🧠] Some better way how to use Openmoji with editable capability */
                    }
                    {...{ content, isEditable, onHtmlChange }}
                />
            )}
        </Section>
    );
}

/**
 * TODO: isHashUsed + test it and put into menu + some way to return existing hashes
 * TODO: [🎐] Some markdown can not be converted back from html - use fallback to pure html content
 * TODO: !!! Name this showcaseContentSection
 * TODO: [🧬] !! Fake generating - write tokenized text
 * TODO: !! [👕] Allow to edit the header position + other things
 * TODO: !! This should be really named ShowcaseSection because it cointains mere then welcome
 * TODO: !! Allow html content
 * TODO: Allow templating systems
 */
