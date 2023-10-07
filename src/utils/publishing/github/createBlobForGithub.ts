import { githubOctokit } from './githubOctokit';

interface CreateBlobForGithubOptions {
    organizationName: string;
    repositoryName: string;
    content: string;
}

/**
 * Helper for conversion IFile to IFileForGithub
 *
 * @private within github-publish folder
 */
export async function createBlobForGithub(options: CreateBlobForGithubOptions) {
    const { organizationName, repositoryName: repo, content } = options;
    const blobData = await githubOctokit.git.createBlob({
        owner: organizationName,
        repo,
        content,
        encoding: 'utf-8',
    });
    return blobData.data;
}
