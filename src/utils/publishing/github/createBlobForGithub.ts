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
    const { organizationName, repositoryName: repo, contentEncoding, content } = options;
    const blobData = await githubOctokit.git.createBlob(
        contentEncoding === 'utf-8'
            ? // !!!! Just ONE and pass encoding
              {
                  owner: organizationName,
                  repo,
                  content,
                  encoding: 'utf-8',
              }
            : {
                  owner: organizationName,
                  repo,
                  content,
                  // !!!
                  // content: await readFile('public/icons/test-square.png', 'base64'),
                  // content: `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`,
                  // content: await blobToBase64(content),
                  encoding: 'base64',
              },
    );
    return blobData.data;
}
