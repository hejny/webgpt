import { string_css, string_html, string_markdown, string_mime_type } from '../utils/typeAliases';

export interface HtmlExportFile {
    type: 'page' | 'code' | 'asset' | 'other';
    mimeType: string_mime_type;
    pathname: string;
    content: string_html | string_css | string_markdown | Blob;
}
