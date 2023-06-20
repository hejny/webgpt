// TODO: !! Cleanup

/*
.--------------------------------------------------.
| Theese string_whatever are just semantic helpers |
'--------------------------------------------------'
*/

/**
 * Semantic helper
 *
 * For example `"text/plain"` or `"application/collboard"`
 * @collboard-modules-sdk
 */
export type string_mime_type = string;

/**
 * Semantic helper
 *
 * For example `"text/*"` or `"image/*"`
 * @collboard-modules-sdk
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers
 */
export type string_mime_type_with_wildcard = string;

/**
 * Semantic helper
 *
 * For example `"a"`
 * @collboard-modules-sdk
 */
export type string_char = string;

/**
 * Semantic helper
 *
 * For example `"<div>Hello World!</div>"`
 * @collboard-modules-sdk
 */
export type string_html = string;

/**
 * Semantic helper
 *
 * For example `"<foo>bar</foo>"`
 * @collboard-modules-sdk
 *
 * TODO: [🎞️] Probbably use some object-based method for working with XMLs
 */
export type string_xml = string;

/**
 * Semantic helper
 *
 * For example `"**Hello** World!"`
 * @collboard-modules-sdk
 */
export type string_markdown = string;

/**
 * Semantic helper
 *
 * For example `.foo{border: 1px solid red}`
 * @collboard-modules-sdk
 */
export type string_css = string;

/**
 * Semantic helper
 *
 * For example `console.log("Hello World!")`
 * @collboard-modules-sdk
 */
export type string_javascript = string;

/**
 * Semantic helper
 *
 * For example `border`
 * @collboard-modules-sdk
 */
export type string_css_property = string;

/**
 * Semantic helper
 *
 * For example `13px`
 * @collboard-modules-sdk
 */
export type string_css_value = string;

/**
 * Semantic helper
 *
 * For example `.foo`
 * @collboard-modules-sdk
 */
export type string_css_selector = string;

/**
 * Semantic helper
 *
 * For example `"https://collboard.com/9SeSQTupmQHwuSrLi"`
 * @collboard-modules-sdk
 */
export type string_url = string;

/**
 * Semantic helper
 *
 * For example `"data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=="`
 * @collboard-modules-sdk
 */
export type string_data_url = string;

/**
 * Semantic helper
 *
 * For example `"https://collboard.com/9SeSQTupmQHwuSrLi"` OR `/9SeSQTupmQHwuSrLi`
 * @collboard-modules-sdk
 */
export type string_href = string;

/**
 * Semantic helper
 *
 * For example `"https://collboard.com/9SeSQTupmQHwuSrLi.png?width=1200&height=630"`
 * @collboard-modules-sdk
 */
export type string_url_image = string;

/**
 * Semantic helper
 *
 * For example `"/9SeSQTupmQHwuSrLi"`
 * @collboard-modules-sdk
 */
export type string_uri = string;

/**
 * Semantic helper
 *
 * For example `"9SeSQTupmQHwuSrLi"`
 * @collboard-modules-sdk
 */
export type string_uri_part = string;

/**
 * Semantic helper, ID of the board used in URL and API
 *
 * For example `"9SeSQTupmQHwuSrLi"`
 * @collboard-modules-sdk
 */
export type string_uriid = string_uri_part;

/**
 * Semantic helper
 *
 * @collboard-modules-sdk
 */
export type string_protocol = 'http:' | 'https:';

/**
 * Semantic helper
 *
 * For example `"localhost"` or `"collboard.com"`
 * @collboard-modules-sdk
 */
export type string_hostname = string;

/**
 * Semantic helper
 *
 * For example `"localhost:9977"` or `"collboard.com"`
 * @collboard-modules-sdk
 */
export type string_host = string;

/**
 * Semantic helper
 *
 * For example `"pavol@collboard.com"`
 * @collboard-modules-sdk
 */
export type string_email = string;

/**
 * Semantic helper
 *
 * For example `"5a0a153d-7be9-4018-9eda-e0e2e2b89bd9"`
 * @collboard-modules-sdk
 */
export type string_uuid = string;

/**
 * Semantic helper
 *
 * For example `"5a0a153d-7be9-4018-9eda-e0e2e2b89bd9"`
 * @collboard-modules-sdk
 */
export type string_wallpaper_id = string_uuid;

/**
 * Semantic helper
 * UUID with only the first part of the UUID
 *
 *
 * For example `"5a0a153d"`
 * @collboard-modules-sdk
 */
export type string_uuid_first_segment = string;

/**
 * Semantic helper
 *
 * For example `"b126926439c5fcb83609888a11283723c1ef137c0ad599a77a1be81812bd221d"`
 * @collboard-modules-sdk
 */
export type string_sha256 = string;

/**
 * Semantic helper
 *
 * For example `"4.2.4"`
 * @collboard-modules-sdk
 */
export type string_version = string;

/**
 * Semantic helper
 *
 * For example `"^4.2.4"`
 * @collboard-modules-sdk
 */
export type string_version_dependency = string;

/**
 * Semantic helper
 *
 * For example `"png"`
 * @collboard-modules-sdk
 */
export type string_file_extension = string;

/**
 * Semantic helper
 *
 * For example `"C:/Users/me/work/collboard/modules-sdk/src/colldev/commands/develop/ColldevDevelop.tsx"`
 * @collboard-modules-sdk
 */
export type string_file_absolute_path = string;

/**
 * Semantic helper
 *
 * For example `"./src/colldev/commands/develop/ColldevDevelop.tsx"`
 * @collboard-modules-sdk
 */
export type string_file_relative_path = string;

/**
 * Semantic helper
 *
 * @collboard-modules-sdk
 */
export type string_file_path = string_file_absolute_path | string_file_relative_path;

// TODO: Do not use universal string_file_path/string_folder_path but specific ones likestring_file_relative_path

/**
 * Semantic helper
 *
 * For example `"C:/Users/me/work/collboard/modules-sdk/src/colldev/commands/develop/ColldevDevelop.tsx"`
 * @collboard-modules-sdk
 */
export type string_folder_absolute_path = string;

/**
 * Semantic helper
 *
 * For example `"./src/colldev/commands/develop/ColldevDevelop.tsx"`
 * @collboard-modules-sdk
 */
export type string_folder_relative_path = string;

/**
 * Semantic helper
 *
 * @collboard-modules-sdk
 */
export type string_folder_path = string_file_absolute_path | string_file_relative_path;

/**
 * Semantic helper
 *
 * - basically module identifier
 *
 * For example `"@collboard/internal/download"`
 * @pattern /^(@(?<scope>[a-z0-9][a-z0-9-]*))\/(?<name>([a-z0-9][a-z0-9-]*)(\/([a-z0-9][a-z0-9-]*))*)$/
 * @collboard-modules-sdk
 */
export type string_module_name = string;

/**
 * Semantic helper
 *
 * - case insensitive
 *
 * For example `"Basic"` or `"Math"`
 *
 * *Note: This may become an list of 'LITERAL_VALUES' in the near future*
 * @collboard-modules-sdk
 */
export type string_module_category = string;
// TODO: In future use 'LITERAL VALUES' like export type string_module_category = 'Basic' | 'Math' | 'Basic' | 'Art' | '3D' | 'Experimental';
// TODO: Add all school subjects
// TODO: Add easter egg

/**
 * Semantic helper
 *
 * For example `"John Smith"`
 * @collboard-modules-sdk
 */
export type string_person_fullname = string;

/**
 * Semantic helper
 * Full profile of the person with his email and web (like in package.json)
 *
 * For example `"Pavol Hejný <pavol@collboard.com> (https://pavolhejny.com)"`
 * @collboard-modules-sdk
 */
export type string_person_profile = string;

/**
 * Full profile of the person with his email and web (like in package.json)
 *
 * @collboard-modules-sdk
 */
export interface IPersonProfile {
    name?: string_person_fullname;

    /**
     * Note: Photos are taken from Gravatar by email
     */
    email?: string_email;
    url?: string_url;
}

/**
 * Semantic helper
 *
 * For example `"MIT"`
 * @collboard-modules-sdk
 */
export type string_license = string;

/**
 * License with its type and url like in package.json
 *
 * @collboard-modules-sdk
 */
export interface ILicense {
    type?: string_license;
    url?: string;
}

/**
 * Repository with its type and url like in package.json
 *
 * @collboard-modules-sdk
 */
export interface IRepository {
    type?: string | 'git';
    url?: string;
}

/**
 * CSS cursor type
 * @collboard-modules-sdk
 */
export type string_css_cursor =
    | 'alias'
    | 'all-scroll'
    | 'auto'
    | 'cell'
    | 'context-menu'
    | 'col-resize'
    | 'copy'
    | 'crosshair'
    | 'default'
    | 'e-resize'
    | 'ew-resize'
    | 'grab'
    | 'grabbing'
    | 'help'
    | 'move'
    | 'n-resize'
    | 'ne-resize'
    | 'nesw-resize'
    | 'ns-resize'
    | 'nw-resize'
    | 'nwse-resize'
    | 'no-drop'
    | 'none'
    | 'not-allowed'
    | 'pointer'
    | 'progress'
    | 'row-resize'
    | 's-resize'
    | 'se-resize'
    | 'sw-resize'
    | 'text'
    | 'w-resize'
    | 'wait'
    | 'zoom-in'
    | 'zoom-out';

/**
 * Semantic helper for attributes
 *
 * - case insensitive
 *
 * For example `"color"`
 * @collboard-modules-sdk
 */
export type string_attribute = string; // TODO: Probably move where is AttributesManager

/**
 * Semantic helper for attributes context
 * Each attribute value scope with a attribute name has its own current value
 *
 * - case insensitive
 *
 * For example `"tools"`
 * @collboard-modules-sdk
 */
export type string_attribute_value_scope = string; // TODO: Probably move where is AttributesManager

/**
 * Semantic helper for css/html colors
 *
 * For example `"white"` or `"#009edd"`
 * @collboard-modules-sdk
 */
export type string_color = string;

/**
 * Semantic helper; For example "SHARE_ICON/EDIT_LINK"
 */
export type string_translate_name = string;

/**
 * Semantic helper; For example "ShareIcon/ edit link"
 */
export type string_translate_name_not_normalized = string;

/**
 * Semantic helper; For example "cs" or "en"
 * Implementing ISO 639-1
 *
 * TODO: Probably use enum
 * TODO: Rename - remove string_ prefix like ITranslateLanguageCode
 */
export type string_translate_language = 'en' | 'cs' | 'sk' | 'uk';

/**
 * Semantic helper; For example "callbackName" or "renderMe"
 *
 */
export type string_javascript_name = string;

export type string_token = string;
export type string_license_token = string_token;
export type string_password = string;
export type string_ssh_key = string;
export type string_pgp_key = string;

//=========================[ Numbers ]=========================

export type number_positive = number;
export type number_negative = number;
export type number_integer = number;

/**
 * Semantic helper;
 * Percentage from 0 to 1 (100%)
 *
 */
export type number_percent = number;

export type number_miliseconds = number_integer;
export type number_seconds = number;
export type number_minutes = number;
export type number_hours = number;
export type number_days = number;
export type number_weeks = number;
export type number_months = number;
export type number_years = number;

export type number_bytes = number_positive & number_integer;
export type number_kilobytes = number_positive;
export type number_megabytes = number_positive;
export type number_gigabytes = number_positive;
export type number_terabytes = number_positive;

/**
 * TODO: Anotate all + collboard-modules-sdk to all
 * TODO: Use instead of number_... type-fest
 * TODO: In some cases string_module_name, constraint by literals (or as close to RegExp as possible in TypeScript)
 */
