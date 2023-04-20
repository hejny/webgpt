import { IProjectInfo } from './interfaces/IProjectInfo';

export function projectToMardown(project: IProjectInfo): string {
    const { title, projectUrl, repositoryUrl, tags } = project;

    /*/
    // Note: Keeping for debugging purposes
    if (name === 'glTF-Sample-Models') {
        console.log({ project });
    }
    /**/

    let projectMardown = `[${title}](${projectUrl || repositoryUrl || '#'})`;

    if (projectUrl && repositoryUrl) {
        projectMardown += ` *[🔗](${projectUrl})[👨‍💻](${repositoryUrl})*`;
    }

    const displayedTags: string[] = [];

    if (tags.has('draft')) {
        displayedTags.push('draft');
    }

    if (tags.has('old')) {
        // TODO: This should be probbably more hidden
        displayedTags.push('old');
    }

    if (tags.has('library')) {
        // TODO: This should be probbably in separate organization, not as a tag
        displayedTags.push('library');
    }

    if (tags.has('utility')) {
        displayedTags.push('utility');
    }

    if (tags.has('hackathon')) {
        displayedTags.push('hackathon');
    }

    if (tags.has('personal')) {
        // TODO: This should be probbably in separate organization, not as a tag
        displayedTags.push('personal');
    }

    projectMardown = displayedTags.map((tag) => '`' + tag + '`').join(' & ') + ' ' + projectMardown;

    return projectMardown;
}
