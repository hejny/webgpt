import {
    string_css,
    string_file_relative_path,
    string_html,
    string_markdown,
    string_mime_type,
} from '../utils/typeAliases';

export interface HtmlExportFile {
    readonly type: 'page' | 'code' | 'asset' | 'other';
    readonly mimeType: string_mime_type;
    readonly pathname: string_file_relative_path;
    content: string_html | string_css | string_markdown | Blob;
}
