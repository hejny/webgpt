import { useContext } from 'react';
import { FONTS } from '../../../config';
import { ExportContext } from '../../utils/hooks/ExportContext';
import { string_font_family } from '../../utils/typeAliases';

/**
 * React component for importing fonts ⁘
 * 
 * @param {ImportFontsProps} props - The props object for the ImportFonts component
 * @returns {JSX.Element} The ImportFonts component
 */
interface ImportFontsProps {
    /**
     * The fonts to import
     */
    fonts: Set<string_font_family>;
}

/**
 * @@@
 */
export function ImportFonts(props: ImportFontsProps) {
    const { fonts } = props;

    const { isExported } = useContext(ExportContext);

    if (isExported) {
        // Note: Whren exported, fonts are grabbed from the DOM (which is rendered bellow)
        return <></>;
    }

    return (
        <style
            dangerouslySetInnerHTML={{
                /* [🎗] */
                __html: FONTS.filter((font) => fonts.has(font))
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

/**
 * TODO: Import from more places than Google Fonts + when one of the fonts in props is not found, throw error OR warn
 */
