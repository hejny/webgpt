import { MutableRefObject, useState } from 'react';

interface VoiceRecognitionButtonProps {
    /**
     * A reference to the textarea where the transcript should be written.
     */
    textareaRef: MutableRefObject<HTMLTextAreaElement | undefined> /* <- TODO: RefObject<HTMLTextAreaElement> */;

    /**
     * The language code to use for voice recognition (e.g. "en-US").
     */
    language: string;
}

/**
 * A button component that starts voice recognition and writes to a given textarea.
 */
export function VoiceRecognitionButton(props: VoiceRecognitionButtonProps) {
    const { textareaRef, language } = props;
    const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition | null>(null);

    return (
        <button
            onClick={() => {
                if (speechRecognition) {
                    speechRecognition.stop();
                    setSpeechRecognition(null);
                } else {
                    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                    const newSpeechRecognition = new SpeechRecognition();

                    // TODO: Use> recognition.grammars = ...
                    newSpeechRecognition.lang = language;
                    newSpeechRecognition.continuous = true;
                    newSpeechRecognition.interimResults = true;
                    newSpeechRecognition.maxAlternatives = 1;

                    newSpeechRecognition.addEventListener('result', (event) => {
                        const transcript = Array.from(event.results)
                            .map((result: any) => result[0].transcript)
                            .join('');

                        // TODO: !!! Append the text do NOT override
                        // TODO: !!! Instert the text where the cursor is
                        textareaRef.current!.value = transcript;
                    });

                    newSpeechRecognition.start();
                    setSpeechRecognition(newSpeechRecognition);
                    textareaRef.current!.focus();
                }
            }}
        >
            {speechRecognition ? 'Stop Recording' : 'Start Recording'}
        </button>
    );
}

/**
 * TODO: !!! Better design of the VoiceRecognitionButton
 * TODO: !!! Stop recording when stop speaking
 * TODO: !!! Stop recording when unfocus textarea
 * TODO: !!! Reset recording after send
 * TODO: !!! Conversation mode - auto switch between dictation and speech
 * TODO: !!! Auto sent - with "odeslat" OR longer pause
 * TODO: !!! For all browsers
 * TODO: !!! Enforce cs
 */
