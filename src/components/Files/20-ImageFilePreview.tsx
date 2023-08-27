import { useMemo } from 'react';
import { blobToDataurl } from '../../export/utils/blobToDataurl';
import { usePromise } from '../../utils/hooks/usePromise';

interface ImageFilePreviewProps {
    /**
     * The image file to preview
     */
    imageFileContent: Blob;
}

/**
 * Renders an image file preview component ⁘
 *
 * @param {ImageFilePreviewProps} props - The props passed to the component.
 * @returns {JSX.Element} - The rendered image file preview component.
 */
export function ImageFilePreview(props: ImageFilePreviewProps) {
    const { imageFileContent } = props;

    const imageFileContentDataurlPromise = useMemo(() => blobToDataurl(imageFileContent), [imageFileContent]);
    const { value: imageFileContentDataurl } = usePromise(imageFileContentDataurlPromise);

    if (!imageFileContentDataurl) {
        return <>Loading image preview...</>;
    }

    // eslint-disable-next-line @next/next/no-img-element
    return <img src={imageFileContentDataurl} alt={`Image preview`} />;
}
