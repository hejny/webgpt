import { githubOctokit } from './githubOctokit';
import type { IFileForGithub } from './interfaces/IFileForGithub';

interface CreateNewTreeOptions {
    organizationName: string;
    repositoryName: string;
    files: Array<IFileForGithub>;
    parentTreeSha: string;
}

/**
 * Create new git tree during publishing
 *
 * @private within github-publish folder
 */
export async function createNewTree(options: CreateNewTreeOptions) {
    const { organizationName: owner, repositoryName, files, parentTreeSha } = options;

    // Note: My custom config. Could be taken as parameters
    const tree = files.map(({ path, content: { sha } }) => ({
        path,
        mode: `100644`,
        type: `blob`,
        sha,
    }));
    const { data } = await githubOctokit.git.createTree({
        owner,
        repo: repositoryName,
        tree,
        base_tree: parentTreeSha,
    } as any);
    return data;
}
