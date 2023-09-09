import spaceTrim from 'spacetrim';
import { Center } from '../../components/Center/Center';
import { Journal } from '../../components/Journal/Journal';
import { StaticLayout } from '../../components/StaticLayout/StaticLayout';

export default function TestVoiceWithChatPage() {
    return (
        <StaticLayout subtitle="Test chat with English voice">
            <main
                style={{
                    // outline: `1px dotted red`,
                    // backgroundColor: 'rgba(94,13,13,0.15)',
                    height: '100vh',
                    padding: 0,
                }}
            >
                <Center>
                    <Journal
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
                </Center>
            </main>
        </StaticLayout>
    );
}
