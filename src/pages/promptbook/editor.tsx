import { NoCsr } from '../../components/NoSsr/NoCsr';
import { NoSsr } from '../../components/NoSsr/NoSsr';
import { PromptCook } from '../../components/PromptCook/PromptCook';

export default function PromptCookPage() {
    return (
        <>
            <NoSsr>
                <PromptCook />
            </NoSsr>
            <NoCsr>📖</NoCsr>
        </>
    );
}
