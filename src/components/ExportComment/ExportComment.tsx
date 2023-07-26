import { useContext } from 'react';
import { ExportContext } from '../../utils/hooks/ExportContext';

interface ExportCommentProps {
    comment: string;
}

/**
 * @@
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
