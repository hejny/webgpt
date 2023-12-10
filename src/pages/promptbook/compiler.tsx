import { NoCsr } from '../../components/NoSsr/NoCsr';
import { NoSsr } from '../../components/NoSsr/NoSsr';
import { PromptbookCompiler } from '../../components/PromptbookCompiler/PromptbookCompiler';

export default function PromptbookCompilerPage() {
    return (
        <>
            <NoSsr>
                <PromptbookCompiler />
            </NoSsr>
            <NoCsr>📖</NoCsr>
        </>
    );
}
