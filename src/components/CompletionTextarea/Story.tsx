import { IS_VERIFIED_EMAIL_REQUIRED } from '../../../config';
import { getExecutionTools } from '../../ai/prompt-templates/getExecutionTools';
import { CompletionTextarea } from '../../components/CompletionTextarea/CompletionTextarea';
import { useClientId } from '../../utils/hooks/useClientId';
import { useSsrDetection } from '../../utils/hooks/useSsrDetection';
import { useStateInLocalstorage } from '../../utils/hooks/useStateInLocalstorage';
import { NoSsr } from '../NoSsr/NoSsr';

/**
 * Renders a auto-completion story
 */
export function Story() {
    const clientId = useClientId({
        isVerifiedEmailRequired: IS_VERIFIED_EMAIL_REQUIRED.EDIT,
    });
  
    const [story, setStory] = useStateInLocalstorage<string>(
        'ai-sovicka-story',
        'Bylo nebylo, za devatero horami a devatero řekami',
    );

    if ( clientId === null) {
        return <></>;
    }

    return (
       
        <CompletionTextarea
            onChange={(story) => {
                console.log({ story });
                setStory(story);
            }}
            naturalExecutionTools={getExecutionTools(clientId).natural}
        >
            {story}
        </CompletionTextarea>
    );
}
