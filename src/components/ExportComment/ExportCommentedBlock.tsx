import { ReactNode } from 'react';
import spaceTrim from 'spacetrim';
import { ExportComment } from './ExportComment';

interface ExportCommentedBlockProps {
    name: string;
    children: ReactNode;
    note?: string;
}

/**
 * @@
 */
export function ExportCommentedBlock(props: ExportCommentedBlockProps) {
    let { name, children, note } = props;

    return (
        <>
            <ExportComment comment={`-------------[ ${name}: ]-------------`} />
            {note && (
                <ExportComment
                    comment={spaceTrim(
                        (block) => `
                            Note: ${block(spaceTrim(note!))}
                        `,
                    )}
                />
            )}
            {children}
            <ExportComment comment={`-------------[ /${name} ]-------------`} />
        </>
    );
}

/**
 * TODO: !!! [🚥] In export theese separation lines are not indented as its surrounding block
 * TODO: Maybe in future create context of comment layer to enhance nesting
 */
