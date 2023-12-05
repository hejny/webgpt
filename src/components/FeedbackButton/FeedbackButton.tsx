import { useCallback, useState } from 'react';
import { LIKED_STATUSES_BUTTON_STYLES, LIKED_STATUSES_EMOJIS_IMAGES } from '../../ai/recommendation/LikedStatus';
import { classNames } from '../../utils/classNames';
import { useStyleModule } from '../../utils/hooks/useStyleModule';
import type { string_css_class } from '../../utils/typeAliases';
import { feedbackDialogue } from '../../workers/dialogues/feedback/feedbackDialogue';
import type { FeedbackDialogueResponse } from '../../workers/dialogues/feedback/types/FeedbackDialogueResponse';
import type { AbstractDialogueRequest } from '../../workers/lib/dialogues/interfaces/AbstractDialogueRequest';
import { Hint } from '../Hint/Hint';

type FeedbackButtonProps = Pick<AbstractDialogueRequest, 'priority'> & {
    /**
     * Calls each time when the feedback is given/updated
     */
    onFeedback(feedback: FeedbackDialogueResponse): void;

    /**
     * Calls each time the feedback collection is started or finished
     */
    onFeedbackCollection(isInFeedbackCollection: boolean): void;

    /**
     * Optional CSS class name which will be added to root element
     */
    readonly className?: string_css_class;
};

/**
 * Renders a @@
 */
export function FeedbackButton(props: FeedbackButtonProps) {
    const { priority = 0, onFeedback, onFeedbackCollection, className } = props;

    const styles = useStyleModule(import('./FeedbackButton.module.css'));

    const [isInFeedbackCollection, setInFeedbackCollection] = useState(false);
    const [feedback, setFeedback] = useState<FeedbackDialogueResponse | undefined>();
    const triggerFeedbackCollection = useCallback(async () => {
        if (isInFeedbackCollection) {
            alert('Already in feedback collection');
            return;
        }

        setInFeedbackCollection(true);
        onFeedbackCollection(true);

        const subject = '!!!';
        const newFeedback = await feedbackDialogue({
            priority: priority + 1,
            message: `Feedback on ${subject}`,
            subject,
            defaultLikedStatus: feedback ? feedback.likedStatus : 'NONE',
            defaultNote: feedback ? feedback.note : null,
            notePlaceholder: 'Write your feedback here...',
        });
        onFeedback(newFeedback);
        setFeedback(newFeedback);

        setInFeedbackCollection(false);
        onFeedbackCollection(false);
    }, [priority, feedback, isInFeedbackCollection, onFeedbackCollection, onFeedback]);

    const emojiImage = LIKED_STATUSES_EMOJIS_IMAGES[feedback?.likedStatus || 'NONE'];
    const style = LIKED_STATUSES_BUTTON_STYLES[feedback?.likedStatus || 'NONE'];

    return (
        <Hint id="feedback" title="Give feedback on !!!" reapearCount={1}>
            {!isInFeedbackCollection && (
                <button
                    className={classNames(className, styles.FeedbackButton)}
                    title={`Give feedback on !!!`}
                    onClick={triggerFeedbackCollection}
                    {...{ style }}
                >
                    {emojiImage}

                    {/* <MarkdownContent content="👍" isUsingOpenmoji /> */}
                </button>
            )}
        </Hint>
    );
}

/**
 * TODO: [🧠] Maybe also listen on loooong press & double-click on mobile
 */
