import spaceTrim from 'spacetrim';
import { SimpleChat } from '../../components/Chat/SimpleChat/SimpleChat';

export default function TestVoiceWithChatPage() {
    return (
        <SimpleChat
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
