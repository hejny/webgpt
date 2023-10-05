import spaceTrim from 'spacetrim';
import { MarkdownStructure } from './MarkdownStructure';

export function markdownToMarkdownStructure(input: string): MarkdownStructure {
    const lines = input
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

    if (lines.length === 0) {
        throw new Error('No structure');
    }

    let currentHeadingLevel = 0;
    let currentSection: MarkdownStructure | null = null;
    const sectionsStack: MarkdownStructure[] = [];

    for (const line of lines) {
        const headingMatch = line.match(/^(#{1,6}) (.*)$/);
        if (headingMatch) {
            const headingLevel = headingMatch[1]!.length;
            const headingTitle = headingMatch[2];

            if (headingLevel > currentHeadingLevel + 1) {
                throw new Error('Heading level mismatch');
            }

            const newSection: MarkdownStructure = {
                title: headingTitle!,
                text: '',
                sections: [],
            };

            if (currentSection && headingLevel > currentHeadingLevel) {
                currentSection.sections.push(newSection);
                sectionsStack.push(currentSection);
            } else if (currentSection && headingLevel <= currentHeadingLevel) {
                while (
                    sectionsStack.length > 0 &&
                    sectionsStack[sectionsStack.length - 1]!.title.startsWith('#'.repeat(headingLevel))
                ) {
                    sectionsStack.pop();
                }
                if (sectionsStack.length > 0) {
                    sectionsStack[sectionsStack.length - 1]!.sections.push(newSection);
                }
            } else if (!currentSection) {
                currentSection = newSection;
            }

            currentHeadingLevel = headingLevel;
            currentSection = newSection;
        } else {
            if (currentSection) {
                currentSection.text += line + '\n';
            } else {
                throw new Error('The first heading is not h1');
            }
        }
    }

    if (currentSection && sectionsStack.length > 0) {
        while (sectionsStack.length > 0) {
            const parentSection = sectionsStack.pop();
            if (parentSection) {
                parentSection.sections.push(currentSection);
                currentSection = parentSection;
            }
        }
    }

    if (!currentSection) {
        return { title: '', text: '', sections: [] };
    }

    currentSection.text = spaceTrim(currentSection.text);

    console.log(currentSection);

    return currentSection;
}
