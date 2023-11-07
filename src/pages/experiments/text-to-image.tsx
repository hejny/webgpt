import { nameToUriParts } from 'n12';
import { useEffect, useState } from 'react';
import { forTime } from 'waitasecond';
import { TextToImagePrompt } from '../../ai/text-to-image/0-interfaces/TextToImagePrompt';
import { TextToImagePromptResult } from '../../ai/text-to-image/0-interfaces/TextToImagePromptResult';
import { PregeneratedPhotobank } from '../../ai/text-to-image/photobank/photobank';
import { TextToImagePromptResultsPicker } from '../../components/TextToImagePromptResultsPicker/TextToImagePromptResultsPicker';
import { induceFileDownload } from '../../export/utils/induceFileDownload';
import { fetchImage } from '../../utils/scraping/fetchImage';
import { string_image_prompt } from '../../utils/typeAliases';

export default function TextToImagePage() {
    const [promptContent, setPromptContent] = useState<string_image_prompt | null>('space');
    const [isReady, setReady] = useState<boolean>(true);
    const [results, setResults] = useState<Array<TextToImagePromptResult>>([]);
    useEffect(() => {
        let isDestroyed = false;

        if (promptContent === null) {
            return;
        }

        (async () => {
            // Note: Debounding the search
            await forTime(1000);

            console.log({ isDestroyed });

            if (isDestroyed) {
                // TODO: Use also the abort controller
                return;
            }

            setReady(false);

            const prompt = { content: promptContent! } satisfies TextToImagePrompt;
            const results = await PregeneratedPhotobank.getInstance().generate(prompt);

            setReady(true);
            setResults(results);
        })();

        return () => void (isDestroyed = true);
    }, [promptContent]);

    return (
        <div>
            <p>This is NOT optimized for production use, just for testing purposes.</p>
            <input
                type="prompt"
                defaultValue={promptContent || ''}
                onChange={(event) => {
                    const value = event.target.value.trim();
                    setPromptContent(value || null);
                }}
            />

            {isReady ? null : <p>Searching...</p>}
            {results.length === 0 && isReady && <p>No results found</p>}

            <TextToImagePromptResultsPicker
                {...{ results }}
                prompt={{ content: promptContent! }}
                onPick={async (result) => {
                    const image = new File(
                        [await fetchImage(result.imageSrc)],
                        `${nameToUriParts(promptContent || 'untitled').join('-')}.png`,
                    );
                    await induceFileDownload(image);
                }}
            />
        </div>
    );
}

// TODO: <TextToImagePromptResultsPicker /> component
