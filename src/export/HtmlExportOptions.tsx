export interface HtmlExportOptions {
    /**
     * Where to place styles
     * - `EMBED` - Place styles into <style> tag
     * - `EXTERNAL` - Place styles into <link rel="stylesheet" href="style.css">
     */
    stylesPlace: 'EMBED' | 'EXTERNAL' /* <- TODO: Probbably just remove EMBED option */;

    publicUrl: URL | null;
}
