import { useRef } from 'react';
import { speak } from '../../utils/voice/speak';

export default function TextToSpeechPage() {
    const textToSpeekTextareaRef = useRef<HTMLTextAreaElement>(null);

    return (
        <div>
            <p>This is NOT optimized for production use, just for testing purposes.</p>
            <textarea ref={textToSpeekTextareaRef} defaultValue={'Ahoj'} />
            <br />
            <button
                onClick={() => {
                    /* not await */ speak(textToSpeekTextareaRef.current?.value!);
                }}
            >
                Generate
            </button>
        </div>
    );
}
