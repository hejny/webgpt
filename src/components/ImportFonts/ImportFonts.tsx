import { useContext } from 'react';
import { FONTS } from '../../../config';
import { ExportContext } from '../../utils/hooks/ExportContext';
import { string_font } from '../../utils/typeAliases';

interface ImportFontsProps {
    fonts: Set<string_font>;
}

/**
 * @@
 */
export function ImportFonts(props: ImportFontsProps) {
    // [🔠] const { fonts } = props;

    const { isExported } = useContext(ExportContext);

    if (isExported) {
        // Note: Whren exported, fonts are grabbed from the DOM (which is rendered bellow)
        return <></>;
    }

    return (
        <style
            dangerouslySetInnerHTML={{
                /* [🎗] */
                __html: FONTS
                    // TODO: [🔠] filter((font) => html.includes(font))
                    .map(
                        (font) =>
                            // TODO: Merge into one import
                            `@import url(https://fonts.googleapis.com/css2?family=${font
                                .split(' ')
                                .join('+')}&display=swap);`,
                    )
                    .join('\n'),
            }}
        />
    );
}
