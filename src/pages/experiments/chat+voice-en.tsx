import spaceTrim from 'spacetrim';
import { SimpleChat } from '../../components/Chat/SimpleChat/SimpleChat';
import { StaticLayout } from '../../components/StaticLayout/StaticLayout';

export default function TestVoiceWithChatPage() {
    return (
        <StaticLayout subtitle="Test chat with English voice">
            <SimpleChat
                style={{
                    height: '100vh',
                }}
                isVoiceEnabled
                voiceLanguage="en"
                onMessage={(message) =>
                    spaceTrim(
                        (block) => `
                                    You said: 

                                    > ${block(message)}  
                                `,
                    )
                }
            />
        </StaticLayout>
    );
}
