/**
 * Opens new popup window with given image
 */
export async function logImage(image: Blob): Promise<void> {
    const url = URL.createObjectURL(image);
    const imageWindow = window.open(url, '_blank', 'width=1000,height=1000');
    if (!imageWindow) {
        throw new Error(`Can not open new window with image`);
    }
    imageWindow.document.write(`<img src="${url}" />`);
}

/**
 * TODO: Allow to pass IImage, Buffer, URL,...
 */
