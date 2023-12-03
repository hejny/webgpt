import Image from 'next/image';
import { useCallback, useState } from 'react';
import { classNames } from '../../utils/classNames';
import { textColor } from '../../utils/color/operators/furthest';
import { useStyleModule } from '../../utils/hooks/useStyleModule';
import type { string_css_class } from '../../utils/typeAliases';
import { feedbackDialogue } from '../../workers/dialogues/feedback/feedbackDialogue';
import type { FeedbackDialogueResponse } from '../../workers/dialogues/feedback/types/FeedbackDialogueResponse';
import type { AbstractDialogueRequest } from '../../workers/lib/dialogues/interfaces/AbstractDialogueRequest';
import { Hint } from '../Hint/Hint';
import { LIKED_STATUS_COLORS } from './_';

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

    // TODO: !!! useFeedbackCollection hook OR <FeedbackCollectionButton/>
    // TODO: !!! Allow feedback trigger multiple times
    const [isInFeedbackCollection, setInFeedbackCollection] = useState(false);
    const [feedback, setFeedback] = useState<FeedbackDialogueResponse | undefined>();
    const triggerFeedbackCollection = useCallback(async () => {
        console.log('!!!', { isInFeedbackCollection });

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

    const color = LIKED_STATUS_COLORS[feedback?.likedStatus || 'NONE'];
    return (
        <Hint id="feedback" title="Give feedback on !!!" reapearCount={1}>
            {!isInFeedbackCollection && (
                <button
                    // !!! <FeedbackCollectionButton/>
                    // TODO: Maybe also listen on double-click on mobile
                    className={classNames(className, styles.FeedbackButton)}
                    title={`Give feedback on !!!`}
                    onClick={triggerFeedbackCollection}
                    style={{
                        backgroundColor: color.toHex(),
                        color: color.then(textColor).toHex(),
                    }}
                >
                    <Image alt="👍" src="/icons/openmoji/1F44D.black.svg" width={40} height={40} /* <-[🧥] */ />

                    {/* !!! Show here the reaction if given */}
                    {/* !!! Show here something better if reaction NOT given */}
                    {/* !!! Show here the hint */}
                    {/* <MarkdownContent content="👍" isUsingOpenmoji /> */}
                </button>
            )}
        </Hint>
    );
}
