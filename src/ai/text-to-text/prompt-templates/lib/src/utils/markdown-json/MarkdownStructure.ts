export interface MarkdownStructure {
    title: string | null;
    text: string;
    sections: MarkdownStructure[];
}
