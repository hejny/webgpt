import { useContext } from 'react';
import { ExportContext } from '../../utils/hooks/ExportContext';

interface ExportCommentProps {
    /**
     * The html comment to export
     */
    comment: string;
}

/**
 * A function component that renders a comment element
 *
 * In a live preview, this component will have no effect.
 * In an export, this component will be "unwraped" and the comment will be exported.
 */
export function ExportComment(props: ExportCommentProps) {
    const { comment } = props;
    const { isExported } = useContext(ExportContext);

    if (!isExported) {
        return <></>;
    }

    return (
        // Note: [🎡] <div data-comment= will be "unwraped" in export
        <div data-comment={comment} />
    );
}
