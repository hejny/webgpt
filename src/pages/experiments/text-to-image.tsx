import { nameToUriParts } from 'n12';
import { useCallback, useState } from 'react';
import { NEXT_PUBLIC_IMAGE_SERVER_URL, USE_DALLE_VERSION } from '../../../config';
import type { TextToImagePromptResult } from '../../ai/text-to-image/0-interfaces/TextToImagePromptResult';
import { RemoteImageGenerator } from '../../ai/text-to-image/remote/RemoteImageGenerator';
import { Dialogues } from '../../components/Dialogues/Dialogues';
import { TextToImagePromptResultsPicker } from '../../components/TextToImagePromptResultsPicker/TextToImagePromptResultsPicker';
import { induceFileDownload } from '../../export/utils/induceFileDownload';
import { fetchImage } from '../../utils/scraping/fetchImage';
import { provideClientId } from '../../utils/supabase/provideClientId';
import type { string_image_prompt } from '../../utils/typeAliases';

export default function TextToImagePage() {
    const [promptContent, setPromptContent] = useState<string_image_prompt | null>('space');
    const [isReady, setReady] = useState<boolean>(true);
    const [results, setResults] = useState<Array<TextToImagePromptResult>>([]);
    const runImageGenerator = useCallback(async () => {
        setReady(false);

        const prompt = {
            content: promptContent!,

            // TODO: !!! Here should be model NOT version
            dalleVersion: USE_DALLE_VERSION,
            //style: 'natural' /* <- !!! Passthrough */,
        }; /*satisfies DallePrompt*/

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
    }, [promptContent]);

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

            <Dialogues />
        </div>
    );
}

// TODO: <TextToImagePromptResultsPicker /> component
