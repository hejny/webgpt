import Script from 'next/script';
import { useContext } from 'react';
import { ExportContext } from '../../utils/hooks/ExportContext';
import { string_javascript } from '../../utils/typeAliases';

interface InlineScriptProps {
    id: string;
    children: string_javascript;
}

/**
 * @@
 */
export function InlineScript(props: InlineScriptProps) {
    const { id, children } = props;
    const { isExported } = useContext(ExportContext);

    if (!isExported) {
        // Note: The script is on dynamic react page managed by nextjs
        return <Script {...{ id, children }} />;
    } else {
        // Note: The script is on static html page placed inlined
        return <script dangerouslySetInnerHTML={{ __html: children }} />;
    }
}

/**
 * TODO: !!!! Prettify <InlineScript for export -+ use code splitting
 */
