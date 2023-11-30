import spaceTrim from 'spacetrim';
import { Journal } from '../../components/Journal/Journal';

export default function TestVoiceWithChatPage() {
    return (
        <Journal
            style={{
                height: '100vh',
            }}
            isVoiceEnabled
            voiceLanguage="cs"
            onMessage={(message) =>
                spaceTrim(
                    (block) => `
                        Řekli jste: 

                        > ${block(message)}  
                    `,
                )
            }
        />
    );
}
