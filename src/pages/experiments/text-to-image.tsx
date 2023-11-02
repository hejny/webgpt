import { useEffect, useState } from 'react';
import { forTime } from 'waitasecond';
import { TextToImagePromptResult } from '../../ai/text-to-image/interfaces/_';
import { PregeneratedPhotobank } from '../../ai/text-to-image/photobank';
import { string_image_prompt } from '../../utils/typeAliases';

export default function TextToImagePage() {
    const [prompt, setPrompt] = useState<string_image_prompt | null>(null);
    const [isReady, setReady] = useState<boolean>(true);
    const [results, setResults] = useState<Array<TextToImagePromptResult>>([]);
    useEffect(() => {
        let isDestroyed = false;

        if (prompt === null) {
            return;
        }

        (async () => {
            // Note: Debounding the search
            await forTime(100);

            if (isDestroyed) {
                // TODO: Use also the abort controller
                return;
            }

            setReady(false);

            console.log({ prompt });
            const results = await PregeneratedPhotobank.getInstance().generate({ content: prompt });

            setReady(true);
            setResults(results);
        })();

        return () => void (isDestroyed = true);
    }, [prompt]);

    return (
        <div>
            <p>This is NOT optimized for production use, just for testing purposes.</p>
            <input
                type="prompt"
                onChange={(event) => {
                    const value = event.target.value;
                    setPrompt(value);
                }}
            />

            {prompt}

            {results.map((result, index) => (
                <div key={index}>
                    {/* eslint-disable-next-line @next/next/no-img-element*/}
                    <img src={result.imageSrc} alt={prompt!} />
                </div>
            ))}
        </div>
    );
}

// TODO: <TextToImagePromptResultsPicker /> component
