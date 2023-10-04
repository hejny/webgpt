import { MarkdownStructure } from './MarkdownStructure';

export function markdownToMarkdownStructure(markdown: string): MarkdownStructure {
    const lines = markdown.split('\n');
    let structure: MarkdownStructure = {
        title: null,
        text: '',
        sections: [],
    };

    let currentSection: MarkdownStructure | null = null;
    let currentLevel = 0;

    const sectionsStack: MarkdownStructure[] = [];

    for (const line of lines) {
        const headingMatch = line.match(/^(#{1,6})\s(.*)$/);
        if (headingMatch) {
            const level = headingMatch[1]!.length;
            const title = headingMatch[2] || null;

            const newSection: MarkdownStructure = {
                title,
                text: '',
                sections: [],
            };

            if (level === 1) {
                structure.title = title;
            } else {
                while (sectionsStack.length >= level) {
                    sectionsStack.pop();
                }
                if (sectionsStack.length === 0) {
                    structure.sections.push(newSection);
                } else {
                    sectionsStack[sectionsStack.length - 1]!.sections.push(newSection);
                }
                sectionsStack.push(newSection);
                currentSection = newSection;
            }

            currentLevel = level;
        } else if (line.trim() !== '') {
            if (currentSection) {
                currentSection.text += line + '\n';
            } else {
                structure.text += line + '\n';
            }
        }
    }

    // Trim trailing newlines from text blocks
    structure.text = structure.text.trim();
    for (const section of structure.sections) {
        section.text = section.text.trim();
    }

    return structure;
}
