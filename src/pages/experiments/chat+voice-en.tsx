import spaceTrim from 'spacetrim';
import { Journal } from '../../components/Journal/Journal';
import { StaticLayout } from '../../components/StaticLayout/StaticLayout';

export default function TestVoiceWithChatPage() {
    return (
        <StaticLayout subtitle="Test chat with English voice">
            <Journal
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
