import { blobToBase64 } from '../../../export/utils/blobToBase64';
import { githubOctokit } from './githubOctokit';

interface CreateBlobForGithubOptions {
    organizationName: string;
    repositoryName: string;
    content: string | Blob;
}

/**
 * Helper for conversion IFile to IFileForGithub
 *
 * @private within github-publish folder
 */
export async function createBlobForGithub(options: CreateBlobForGithubOptions) {
    const { organizationName, repositoryName: repo, content } = options;
    const blobData = await githubOctokit.git.createBlob(
        !(content instanceof Blob)
            ? {
                  owner: organizationName,
                  repo,
                  content,
                  encoding: 'utf-8',
              }
            : {
                  owner: organizationName,
                  repo,
                  content: await blobToBase64(content),
                  encoding: 'base64',
              },
    );
    return blobData.data;
}
