import { string_url } from '../../utils/typeAliases';
import { ObjectUrl } from './ObjectUrl';

/**
 * Download a File to with a browser
 *
 * @collboard-modules-sdk
 */
export async function induceFileDownload(fileOrBlobOrUrl: File | Blob | URL | string_url) {
    const objectUrl = ObjectUrl.fromBlobOrUrl(fileOrBlobOrUrl);
    const link = document.createElement('a');
    link.href = objectUrl.href;
    link.download = (fileOrBlobOrUrl as File).name || 'untitled' /* <- TODO: Add propper extension according to url */;
    link.click();
    await objectUrl.destroy();
}
