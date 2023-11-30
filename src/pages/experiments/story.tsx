import { Story } from '../../components/CompletionTextarea/Story';
import { NoCsr } from '../../components/NoSsr/NoCsr';
import { NoSsr } from '../../components/NoSsr/NoSsr';
import { supportDialogues } from '../../workers/dialogues';
import { Dialogues } from '../../workers/lib/dialogues/Dialogues';

export default function StoryPage() {
    return (
        <>
            <NoSsr>
                <Dialogues {...{ supportDialogues }}/>
                <Story />
            </NoSsr>
            <NoCsr>🦉</NoCsr>
        </>
    );
}
