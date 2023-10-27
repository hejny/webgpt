export interface HtmlExportOptions {
    /**
     * Where to place styles
     * - `EMBED` - Place styles into <style> tag
     * - `EXTERNAL` - Place styles into <link rel="stylesheet" href="style.css">
     */
    readonly stylesPlace: 'EMBED' | 'EXTERNAL' /* <- TODO: Probbably just remove EMBED option */;

    /**
     * Root url of the exported page
     *
     * Note: There are some places in html where you must use absolute url like og:image or twitter:image etc.
     */
    readonly publicUrl: URL | null;
}
