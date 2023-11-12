import { Story } from '../../components/CompletionTextarea/Story';
import { NoCsr } from '../../components/NoSsr/NoCsr';
import { NoSsr } from '../../components/NoSsr/NoSsr';
import { Dialogues } from '../../workers/lib/dialogues/Dialogues';

export default function StoryPage() {
    return (
        <>
            <NoSsr>
                <Dialogues />
                <Story />
            </NoSsr>
            <NoCsr>🦉</NoCsr>
        </>
    );
}
