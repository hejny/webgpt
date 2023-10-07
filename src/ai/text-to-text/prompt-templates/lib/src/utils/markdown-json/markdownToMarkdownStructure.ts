import spaceTrim from 'spacetrim';
import { MarkdownStructure } from './MarkdownStructure';

/**
 * @private
 */
type ParsingMarkdownStructure = Omit<MarkdownStructure, 'content'> & {
    contentLines: string[];
    sections: ParsingMarkdownStructure[];
    parent: ParsingMarkdownStructure | null;
};

/**
 * @private
 */
function parsingMarkdownStructureToMarkdownStructure(
    parsingMarkdownStructure: ParsingMarkdownStructure,
): MarkdownStructure {
    const { level, title, contentLines, sections } = parsingMarkdownStructure;

    return {
        level,
        title,
        content: spaceTrim(contentLines.join('\n')),
        sections: sections.map(parsingMarkdownStructureToMarkdownStructure),
    };
}

/**
 * Parses a markdown string into a MarkdownStructure object.
 *
 * @param markdown The markdown string to parse.
 * @returns The MarkdownStructure object.
 */
export function markdownToMarkdownStructure(markdown: string): MarkdownStructure {
    const lines = markdown.split('\n');
    const root: ParsingMarkdownStructure = { level: 0, title: '', contentLines: [], sections: [], parent: null };
    let current: ParsingMarkdownStructure = root;

    for (const line of lines) {
        const headingMatch = line.match(/^(?<mark>#{1,6})\s(?<title>.*)/);
        if (!headingMatch) {
            current.contentLines.push(line);
        } else {
            const level = headingMatch.groups!.mark!.length;
            const title = headingMatch.groups!.title!.trim();
            let parent: ParsingMarkdownStructure;

            if (level > current.level) {
                // Note: Going deeper (next section is child of current)
                parent = current;
            } else {
                // Note: Going up or staying at the same level (next section is sibling or parent or grandparent,... of current)
                parent = current;
                while (parent.level !== level - 1) {
                    if (parent.parent === null /* <- Note: We are in root */) {
                        throw new Error(
                            spaceTrim(`
                                The file has an invalid structure.
                                The markdown file must have exactly one top-level section.
                            `),
                        );
                    }
                    parent = parent.parent;
                }
            }

            console.log('parent', parent);

            const section = { level, title, contentLines: [], sections: [], parent };
            parent.sections.push(section);
            current = section;
        }
    }

    if (root.sections.length === 1) {
        const markdownStructure = parsingMarkdownStructureToMarkdownStructure(root.sections[0]!);
        console.log('markdownStructure', markdownStructure);
        return markdownStructure;
    }

    throw new Error('The markdown file must have exactly one top-level section.');
    // return root;
}
