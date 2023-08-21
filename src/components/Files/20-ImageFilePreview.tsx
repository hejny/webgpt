import { useMemo } from 'react';
import { blobToDataurl } from '../../export/utils/blobToDataurl';
import { usePromise } from '../../utils/hooks/usePromise';

/**
 * Renders an image file preview component ⁘
 * 
 * @function
 * @param {ImageFilePreviewProps} props - The props passed to the component.
 * @returns {JSX.Element} - The rendered image file preview component.
 */
interface ImageFilePreviewProps {
    /**
     * The image file to preview
     */
    imageFileContent: Blob;
}

/**
 * @@@
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
