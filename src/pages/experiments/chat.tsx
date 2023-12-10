import spaceTrim from 'spacetrim';
import { SimpleChat } from '../../components/Chat/SimpleChat/SimpleChat';
import { StaticLayout } from '../../components/StaticLayout/StaticLayout';

export default function TestVoicePage() {
    return (
        <StaticLayout subtitle="Test chat">
            <SimpleChat
                style={{
                    height: '100vh',
                }}
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
