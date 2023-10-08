import { githubOctokit } from './githubOctokit';

interface CreateBlobForGithubOptions {
    organizationName: string;
    repositoryName: string;
    contentEncoding: 'utf-8' | 'base64';
    content: string;
}

/**
 * Helper for conversion IFile to IFileForGithub
 *
 * @private within github-publish folder
 */
export async function createBlobForGithub(options: CreateBlobForGithubOptions) {
    const { organizationName, repositoryName: repo, contentEncoding: encoding, content } = options;
    const blobData = await githubOctokit.git.createBlob({
        owner: organizationName,
        repo,
        content,
        encoding,
    });
    return blobData.data;
}
