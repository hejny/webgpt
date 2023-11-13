import { useRef } from 'react';
import { DialogueComponentProps } from '../../../lib/dialogues/interfaces/DialogueComponentProps';
import { ImageGeneratorDialogueRequest } from '../interfaces/ImageGeneratorDialogueRequest';
import { ImageGeneratorDialogueResponse } from '../interfaces/ImageGeneratorDialogueResponse';
import styles from './ImageGeneratorDialogueComponent.module.css';

/**
 * @private use only within imageGeneratorDialogue function
 */
export function ImageGeneratorDialogueComponent(
    props: DialogueComponentProps<ImageGeneratorDialogueRequest, ImageGeneratorDialogueResponse>,
) {
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

ImageGeneratorDialogueComponent.dialogueTypeName = 'SIMPLE_TEXT';

/**
 * !!! Annotate
 */
