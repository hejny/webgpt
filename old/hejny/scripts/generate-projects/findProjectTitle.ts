import fetch from 'cross-fetch';
import spaceTrim from 'spacetrim';
import { PackageJson } from 'type-fest';
import { getRawUrlOnGithub } from './getRawUrlOnGithub';
import { IProjectInfo } from './interfaces/IProjectInfo';
import { removeMarkdownFormatting } from './removeMarkdownFormatting';
import { removeMarkdownLinks } from './removeMarkdownLinks';

export async function findProjectTitle(projectInfo: IProjectInfo): Promise<string> {
    const { repositoryUrl } = projectInfo;

    // Option /1/ Read the project README on GitHub and extract the title from the first H1
    if (repositoryUrl && repositoryUrl.hostname === 'github.com') {
        const readmeUrl = getRawUrlOnGithub(new URL(repositoryUrl.href + '/blob/master/README.md'));
        const readmeResponse = await fetch(readmeUrl.href);
        if (readmeResponse.ok) {
            const readmeText: string = await readmeResponse.text();
            const readmeTitles = readmeText.matchAll(/^#\s*(?<title>[^#\n]*)$/gm);
            for (const readmeTitle of Array.from(readmeTitles)) {
                if (!/This [a-zA-Z0-9\s]*(project|app)/i.test(readmeTitle.groups!.title)) {
                    let title = readmeTitle.groups!.title;
                    title = removeMarkdownLinks(title);
                    title = removeMarkdownFormatting(title);
                    return spaceTrim(title);
                }
            }
        }
    }

    // Option /2/  Read the project package.json on GitHub and extract the name
    if (repositoryUrl && repositoryUrl.hostname === 'github.com') {
        const packageJsonUrl = getRawUrlOnGithub(new URL(repositoryUrl.href + '/blob/master/package.json'));
        const packageJsonResponse = await fetch(packageJsonUrl.href);
        if (packageJsonResponse.ok) {
            const packageJson = (await packageJsonResponse.json()) as PackageJson;
            if (packageJson.name) {
                return packageJson.name;
            }
        }
    }

    return projectInfo.title;
}

/**
 * TODO: !! Every project should have emoticon
 */
