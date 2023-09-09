import spaceTrim from 'spacetrim';
import { Journal } from '../../components/Journal/Journal';
import { StaticLayout } from '../../components/StaticLayout/StaticLayout';

export default function TestVoicePage() {
    return (
        <StaticLayout subtitle="Test chat">
            <main
                style={{
                    // outline: `1px dotted red`,
                    // backgroundColor: 'rgba(94,13,13,0.15)',
                    height: '100vh',
                    padding: 0,
                }}
            >
                <Journal
                    onMessage={(message) =>
                        spaceTrim(
                            (block) => `
                                    You said: 

                                    > ${block(message)}  
                                `,
                        )
                    }
                />
            </main>
        </StaticLayout>
    );
}
