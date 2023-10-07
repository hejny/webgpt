import { githubOctokit } from './githubOctokit';

interface CreateNewCommitOptions {
    organizationName: string;
    repositoryName: string;
    message: string;
    currentTreeSha: string;
    currentCommitSha: string;
}

/**
 * Create new commit during publishing
 *
 * @private within github-publish folder
 */
export async function createNewCommit(options: CreateNewCommitOptions) {
    const { organizationName, repositoryName, message, currentTreeSha, currentCommitSha } = options;

    return await (
        await githubOctokit.git.createCommit({
            owner: organizationName,
            repo: repositoryName,
            message,
            tree: currentTreeSha,
            parents: [currentCommitSha],
        })
    ).data;
}
