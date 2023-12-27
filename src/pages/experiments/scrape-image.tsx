import { useCallback, useRef, useState } from 'react';
import { ObjectUrl } from '../../export/utils/ObjectUrl';
import { fetchImage } from '../../utils/scraping/fetchImage';

export default function ScrapeImagePage() {
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [scrapedImage, setScrapedImage] = useState<ObjectUrl | null>(null);
    const scrapeImage = useCallback(async () => {
        const imageBlob = await fetchImage(imageInputRef.current!.value);
        setScrapedImage(await ObjectUrl.fromBlob(imageBlob));
    }, [imageInputRef]);

    return (
        <>
            This is NOT production code. It has memory leaks and is not optimized.
            <br />
            <input
                ref={imageInputRef}
                defaultValue="https://oaidalleapiprodscus.blob.core.windows.net/private/org-Sddx3F2IYwJ3Xk4cbuUZ6dU5/user-1nOB0gL9nmmbD6rSUvEEEMFw/img-BuZZF4JStcgXXpXoVcmCshv7.png?st=2023-11-10T21%3A00%3A20Z&se=2023-11-10T23%3A00%3A20Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-10T21%3A41%3A12Z&ske=2023-11-11T21%3A41%3A12Z&sks=b&skv=2021-08-06&sig=oPOg%2BihWjqMOoSUX985B0W%2BVaWOXxkycQkIekoZakb8%3D"
            />
            <br />
            <button onClick={scrapeImage}>Scrape</button>
            <br />
            <ul>
                <li>
                    https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1wU4stdGaHb44zZUt2jpz-FG1NKalqzr4Z_I7SZPn&s
                </li>
            </ul>
            <hr />
            <br />
            {scrapedImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={scrapedImage.href} alt="scraped image" />
            ) : (
                <>No scraped image yet</>
            )}
        </>
    );
}
