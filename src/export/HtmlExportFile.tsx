import { string_css, string_file_relative_path, string_html, string_markdown, string_mime_type } from '../utils/typeAliases';

export interface HtmlExportFile {
    type: 'page' | 'code' | 'asset' | 'other';
    mimeType: string_mime_type;
    pathname: string_file_relative_path;
    content: string_html | string_css | string_markdown | Blob;
}
