import { IS_VERIFIED_EMAIL_REQUIRED } from '../../../config';
import { getExecutionTools } from '../../ai/prompt-templates/getExecutionTools';
import { CompletionTextarea } from '../../components/CompletionTextarea/CompletionTextarea';
import { Dialogues } from '../../components/Dialogues/Dialogues';
import { useClientId } from '../../utils/hooks/useClientId';

export default function StoryPage() {
    const clientId = useClientId({
        isVerifiedEmailRequired: IS_VERIFIED_EMAIL_REQUIRED.EDIT,
    });

    if (clientId === null) {
        return <Dialogues />;
    }

    return (
        <>
            <Dialogues />
            <CompletionTextarea
                onChange={(story) => {
                    console.log({ story });
                }}
                naturalExecutionTools={getExecutionTools(clientId).natural}
            >
                A
            </CompletionTextarea>
        </>
    );
}
