import { nameToUriParts } from 'n12';
import { useCallback, useMemo, useState } from 'react';
import { NEXT_PUBLIC_IMAGE_SERVER_URL, USE_DALLE_VERSION } from '../../../config';
import type { ImagePromptResult } from '../../ai/text-to-image/0-interfaces/ImagePromptResult';
import { DallePrompt } from '../../ai/text-to-image/dalle/interfaces/DallePrompt';
import { RemoteImageGenerator } from '../../ai/text-to-image/remote/RemoteImageGenerator';
import { Dialogues } from '../../components/Dialogues/Dialogues';
import { ImagePromptResultsPicker } from '../../components/ImagePromptResultsPicker/ImagePromptResultsPicker';
import { induceFileDownload } from '../../export/utils/induceFileDownload';
import { fetchImage } from '../../utils/scraping/fetchImage';
import { provideClientId } from '../../utils/supabase/provideClientId';
import type { string_image_prompt } from '../../utils/typeAliases';

export default function TextToImagePage() {
    const [promptContent, setPromptContent] = useState<string_image_prompt | null>('space');
    const prompt = useMemo<DallePrompt>(
        () => ({
            content: promptContent!,
            model: `dalle-${USE_DALLE_VERSION}`,
            modelSettings: {
                style: 'vivid',
            },
        }),
        [promptContent],
    );
    const [isReady, setReady] = useState<boolean>(true);
    const [results, setResults] = useState<Array<ImagePromptResult>>([]);
    const runImageGenerator = useCallback(async () => {
        setReady(false);

        // TODO: !!! provideXyxsfafForBrowser()
        const imageGenerator = new RemoteImageGenerator({
            remoteUrl: NEXT_PUBLIC_IMAGE_SERVER_URL,
            clientId: await provideClientId({
                isVerifiedEmailRequired: true,
            }),
        });

        const results = await imageGenerator.generate(prompt);

        setReady(true);
        setResults(results);
    }, [prompt]);

    return (
        <div>
            <p>This is NOT optimized for production use, just for testing purposes.</p>
            <textarea
                defaultValue={promptContent || ''}
                onChange={(event) => {
                    const value = event.target.value.trim();
                    setPromptContent(value || null);
                }}
            />
            <br />
            <button onClick={runImageGenerator}>Generate</button>
            <br />
            <br />
            <hr />
            <br />
            {isReady ? null : <p>Generating...</p>}
            {results.length === 0 && isReady && <p>No images generated</p>}
            <ImagePromptResultsPicker
                {...{ results, prompt }}
                onPick={async (result) => {
                    const image = new File(
                        [await fetchImage(result.imageSrc)],
                        `${nameToUriParts(promptContent || 'untitled').join('-')}.png`,
                    );
                    await induceFileDownload(image);
                }}
            />

            <Dialogues />
        </div>
    );
}

// TODO: <ImagePromptResultsPicker /> component
