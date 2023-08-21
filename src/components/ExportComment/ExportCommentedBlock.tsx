import { ReactNode } from 'react';
import spaceTrim from 'spacetrim';
import { ExportComment } from './ExportComment';

interface ExportCommentedBlockProps {
    /**
     * The name of the block
     *
     * @example "Article", "Section", "Subsection", "Menu"
     */
    name: string;
    children: ReactNode;

    /**
     * Optional note to be added to the block after the name
     */
    note?: string;
}
/**
 * A commented block of html
 *
 * In a live preview, this component will have no effect.
 * In an export, this component will be "unwraped" and the comment will be exported.
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
 * TODO: Maybe in future create context of comment layer to enhance nesting
 */
