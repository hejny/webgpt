import { Story } from '../../components/CompletionTextarea/Story';
import { Dialogues } from '../../components/Dialogues/Dialogues';
import { NoCsr } from '../../components/NoSsr/NoCsr';
import { NoSsr } from '../../components/NoSsr/NoSsr';

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
