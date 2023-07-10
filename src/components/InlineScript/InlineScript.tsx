import Script from 'next/script';
import { useContext } from 'react';
import { ExportContext } from '../../pages/_app';
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
        // Note: !!!!
        return <Script {...{ id, children }} />;
    } else {
        // Note: !!!!
        return <script>{children}</script>;
    }
}
