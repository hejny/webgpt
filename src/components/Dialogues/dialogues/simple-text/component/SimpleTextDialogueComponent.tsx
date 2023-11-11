import { useRef } from 'react';
import { SimpleTextDialogueRequest } from '../interfaces/SimpleTextDialogueRequest';
import { SimpleTextDialogueResponse } from '../interfaces/SimpleTextDialogueResponse';
import styles from './SimpleTextDialogueComponent.module.css';

// !!! DialogueComponentProps<TRequest,TResponse> + Annotate
interface SimpleTextDialogueRequestProps {
    readonly request: SimpleTextDialogueRequest;

    onResponse(response: SimpleTextDialogueResponse): void;
}

/**
 * @private use only within simpleTextDialogue function
 */
export function SimpleTextDialogueComponent(props: SimpleTextDialogueRequestProps) {
    const { request, onResponse } = props;

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <>
            <textarea
                autoFocus
                ref={textareaRef}
                defaultValue={request.defaultValue || ''}
                placeholder={request.placeholder}
                className={styles.answer}
                onKeyDown={(event) => {
                    // TODO: DRY [1]
                    if (!(event.key === 'Enter' && event.shiftKey === false && event.ctrlKey === false)) {
                        return;
                    }

                    onResponse({ answer: event.currentTarget.value });
                    // TODO: !!! Move> setCurrentPromptInQueue(null);
                }}
            />
            <button
                className={styles.submit}
                onClick={() => {
                    // TODO: DRY [1]

                    onResponse({ answer: textareaRef.current!.value });
                    // TODO: !!! Move> setCurrentPromptInQueue(null);
                }}
            >
                Submit {/* <- !! Translate */}
            </button>
        </>
    );
}

/**
 * !!! Annotate
 */
