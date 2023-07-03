import { useContext } from 'react';
import { FONTS } from '../../../config';
import { ExportContext } from '../../pages/_app';
import { string_font } from '../../utils/typeAliases';

interface FontsProps {
    fonts: Set<string_font>;
}

/**
 * @@
 */
export function Fonts(props: FontsProps) {
    // [🔠] const { fonts } = props;

    const { isExported } = useContext(ExportContext);

    if (isExported) {
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
