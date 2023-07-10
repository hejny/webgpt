import { ReactNode } from 'react';
import { ExportComment } from './ExportComment';

interface ExportCommentedBlockProps {
    name: string;
    children: ReactNode;
}

/**
 * @@
 */
export function ExportCommentedBlock(props: ExportCommentedBlockProps) {
    const { name, children } = props;

    return (
        <>
            <ExportComment comment={`-------------[ ${name}: ]-------------`} />
            {children}
            <ExportComment comment={`-------------[ /${name} ]-------------`} />
        </>
    );
}

/**
 * TODO: Maybe in future create context of comment layer to enhance nesting
 */
