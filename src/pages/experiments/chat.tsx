import spaceTrim from 'spacetrim';
import { Journal } from '../../components/Journal/Journal';
import { StaticLayout } from '../../components/StaticLayout/StaticLayout';

export default function TestVoicePage() {
    return (
        <StaticLayout subtitle="Test chat">
            <Journal
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
