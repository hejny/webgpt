import {
    description,
    string_markdown,
    string_name,
    string_translate_language,
    string_url,
    title,
    uuid,
} from '../../../../utils/typeAliases';

export interface CreateNewWallpaperRequest {
    /**
     * The language
     * - It is used to select the right prompt template pipeline
     * - The interaction with the user is in this language
     * - The generated content is in this language
     */
    locale: string_translate_language;

    /**
     * Title of the wallpaper
     *
     * If set, the generated content will start with this title
     * If null, it will be written by AI
     */
    readonly title?: Exclude<title, JSX.Element>;

    /**
     * Author of the wallpaper
     * Note: It must be valid client ID and same as identity of the user
     */
    readonly author: uuid;

    /**
     * Image of the wallpaper
     */
    readonly wallpaperImage?: Blob;

    /**
     * General idea for the website
     *
     * It can be single word, sentence or even whole paragraph
     *
     * Examples:
     * - "Cat hotel"
     * - "Cat hotel in Prague"
     * - "Café with cats in Prague"
     * - "Personal page of developer Pavol Hejný, who is also a cat lover"
     */
    readonly idea?: Exclude<description, JSX.Element>;

    /**
     * Additional sections to be added to the content
     */
    readonly addSections?: Array<{
        /**
         * Unique name of the section
         * Note: It is used for example as element ID to lead anchor links to this section
         */
        readonly name: string_name;

        /**
         * Title of the section
         */
        readonly title: Exclude<title, JSX.Element>;

        /**
         * Order of the section
         * TODO: [🧠] Some transparent system to order sections
         */
        readonly order: number;

        /**
         * Content of the section
         */
        readonly content: string_markdown;
    }>;

    /**
     * Links to be added to the content
     */
    readonly links?: Array<{
        /**
         * Title of the link - it is used as link text and also as title attribute
         */
        readonly title: Exclude<title, JSX.Element>;

        /**
         * URL of the link
         */
        readonly url: string_url;
    }>;
}

/**
 * TODO: !!! Annotate all
 * TODO: !!!! Allow to pass readonly wallpaperImageSrc?: strign_url_image;
 */
