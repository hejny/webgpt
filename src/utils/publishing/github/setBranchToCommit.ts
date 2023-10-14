import { githubOctokit } from './githubOctokit';

interface SetBranchToCommitOptions {
    organizationName: string;
    repositoryName: string;
    branch: string;
    commitSha: string;
}

/**
 * Set branch head to given commit during publishing
 *
 * @private within github-publish folder
 */
export async function setBranchToCommit(options: SetBranchToCommitOptions) {
    const { organizationName, repositoryName, branch, commitSha } = options;
    return await githubOctokit.git.updateRef({
        owner: organizationName,
        repo: repositoryName,
        ref: `heads/${branch}`,
        sha: commitSha,
    });
}
