import { githubOctokit } from './githubOctokit';

interface GetCurrentCommitOptions {
    organizationName: string;
    repositoryName: string;
    branch: string;
}

/**
 * Get current commit during publishing
 *
 * @private within github-publish folder
 */
export async function getCurrentCommit(options: GetCurrentCommitOptions) {
    const { organizationName, repositoryName, branch } = options;

    const { data: refData } = await githubOctokit.git.getRef({
        owner: organizationName,
        repo: repositoryName,
        ref: `heads/${branch}`,
    });
    const commitSha = refData.object.sha;
    const { data: commitData } = await githubOctokit.git.getCommit({
        owner: organizationName,
        repo: repositoryName,
        commit_sha: commitSha,
    });
    return {
        commitSha,
        treeSha: commitData.tree.sha,
    };
}
