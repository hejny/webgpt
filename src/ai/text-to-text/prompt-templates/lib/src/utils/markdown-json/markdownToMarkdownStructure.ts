import { MarkdownStructure } from './MarkdownStructure';

type MarkdownStructureFlatSegment = Omit<MarkdownStructure, 'sections'> & {
    level: number;
};

export function markdownToMarkdownStructure(markdown: string): MarkdownStructure {
    let flatStructureCurrentSegment: MarkdownStructureFlatSegment | null = null;
    const flatStructure: Array<MarkdownStructureFlatSegment> = [];

    for (const line of markdown.split('\n')) {
        if (line.startsWith('#')) {
            if (flatStructureCurrentSegment !== null) {
                flatStructure.push(flatStructureCurrentSegment);
            }

            flatStructureCurrentSegment = {
                level: line.split('#').length - 1,
                title: line.slice(1).trim(),
                text: '',
            };
        } else {
            if (flatStructureCurrentSegment === null) {
                throw new Error(`Unexpected line: ${line}`);
            }

            flatStructureCurrentSegment.text += line + '\n';
        }
    }

    if (flatStructureCurrentSegment !== null) {
        flatStructure.push(flatStructureCurrentSegment);
    }

    const structure: MarkdownStructure = {
        title: null,
        text: '',
        sections: [],
    };

    let currentSection: MarkdownStructure | null = null;
    let currentSectionLevel: number | null = null;

    for (const flatStructureSegment of flatStructure) {
        if (flatStructureSegment.level === 1) {
            if (currentSection !== null) {
                structure.sections.push(currentSection);
            }

            currentSection = {
                title: flatStructureSegment.title,
                text: flatStructureSegment.text,
                sections: [],
            };

            currentSectionLevel = 1;
        } else if (flatStructureSegment.level === 2) {
            if (currentSection === null) {
                throw new Error(`Unexpected level 2 segment: ${flatStructureSegment.title}`);
            }

            if (currentSectionLevel === 2) {
                structure.sections.push(currentSection);
                currentSection = {
                    title: flatStructureSegment.title,
                    text: flatStructureSegment.text,
                    sections: [],
                };
            } else {
                currentSection.sections.push({
                    title: flatStructureSegment.title,
                    text: flatStructureSegment.text,
                    sections: [],
                });
            }

            currentSectionLevel = 2;
        } else if (flatStructureSegment.level === 3) {
            if (currentSection === null) {
                throw new Error(`Unexpected level 3 segment: ${flatStructureSegment.title}`);
            }

            if (currentSectionLevel === 3) {
                currentSection.sections.push({
                    title: flatStructureSegment.title,
                    text: flatStructureSegment.text,
                    sections: [],
                });
            } else {
                currentSection.sections.push({
                    title: null,
                    text: '',
                    sections: [
                        {
                            title: flatStructureSegment.title,
                            text: flatStructureSegment.text,
                            sections: [],
                        },
                    ],
                });
            }

            currentSectionLevel = 3;
        } else {
            throw new Error(`Unexpected level: ${flatStructureSegment.level}`);
        }
    }

    return structure;
}
