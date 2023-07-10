import { ReactNode, useContext } from 'react';
import { ExportContext } from '../../pages/_app';

interface CommentedBlockProps {
    name: string;
    children: ReactNode;
}

/**
 * @@
 */
export function CommentedBlock(props: CommentedBlockProps) {
    const { name, children } = props;
    const { isExported } = useContext(ExportContext);

    if (!isExported) {
        return <>{children}</>;
    }

    return (
        <>
            <div data-comment={`<!-------------[ ${name}: ]--------------->`} />
            {children}
            <div data-comment={`<!-------------[ /${name} ]--------------->`} />
        </>
    );
}

/**
 * TODO: Maybe in future create context of comment layer to enhance nesting
 */
