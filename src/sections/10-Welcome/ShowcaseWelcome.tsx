import { useContext } from 'react';
import spaceTrim from 'spacetrim';
import { Article } from '../../components/Article/Article';
import { Section } from '../../components/Section/Section';
import { ExportContext } from '../../pages/_app';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import styles from './Welcome.module.css';

/**
 * @@@
 */
export function ShowcaseWelcomeSection() {
    const wallpaper = useWallpaper();
    const { isExported } = useContext(ExportContext);

    return (
        <Section id="Welcome" className={styles.WelcomeSection}>
            {/*
            <h1 className={styles.handritten}>
                <HandwrittenText color={skin.highlightedTextColor}>{wallpaper.title}</HandwrittenText>
            </h1>
            */}

            {!isExported && (
                <style
                    dangerouslySetInnerHTML={{
                        __html: spaceTrim(`
                        @import url(https://fonts.googleapis.com/css2?family=${wallpaper.font
                            .split(' ')
                            .join('+')}&display=swap});
                    `),
                    }}
                />
            )}
            <div
                style={{
                    /* [🎗] */
                    fontFamily: `'${wallpaper.font}', sans-serif` /* <- Use only in one place OR link by tag */,
                }}
            >
                {/* TODO: !!! Wrap Big words in title */}
                <Article content={wallpaper.content} isUsingOpenmoji />
                {/*
                <br />
                <br />
                <br />
                {useCurrentWallpaperId()}
                */}
            </div>
        </Section>
    );
}

/**
 * TODO: [🧬] !! Fake generating - write tokenized text
 * TODO: !! [👕] Allow to edit the header position + other things
 * TODO: !! This should be really named ShowcaseSection because it cointains mere then welcome
 */
