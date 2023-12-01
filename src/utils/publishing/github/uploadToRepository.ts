import { createBlobForGithub } from './createBlobForGithub';
import { createNewCommit } from './createNewCommit';
import { createNewTree } from './createNewTree';
import { getCurrentCommit } from './getCurrentCommit';
import type { IFileForGithub } from './interfaces/IFileForGithub';
import type { IFileToPublish } from './interfaces/IFileToPublish';
import { setBranchToCommit } from './setBranchToCommit';

interface UploadToRepositoryOptions {
    organizationName: string;
    repositoryName: string;
    branch: string;
    files: Array<IFileToPublish>;
}

/**
 * Upload files to repository during publishing
 *
 * @private within github-publish folder
 */
export async function uploadToRepository(options: UploadToRepositoryOptions) {
    const { organizationName, repositoryName, branch, files } = options;

    // Note:  Gets commit's AND its tree's SHA
    const currentCommit = await getCurrentCommit({ organizationName, repositoryName, branch });

    const filesForGithub: Array<IFileForGithub> = await Promise.all(
        files.map(async ({ path, content, contentEncoding }) => ({
            path,
            content: await createBlobForGithub({ organizationName, repositoryName, content, contentEncoding }),
        })),
    );

    const newTree = await createNewTree({
        organizationName,
        repositoryName,
        files: filesForGithub,
        parentTreeSha: currentCommit.treeSha,
    });
    const commitMessage = `💫 Publish exported website by WebGPT.cz`; /* <- !!!! Pass as param */
    const newCommit = await createNewCommit({
        organizationName,
        repositoryName,
        message: commitMessage,
        currentTreeSha: newTree.sha,
        currentCommitSha: currentCommit.commitSha,
    });
    await setBranchToCommit({ organizationName, repositoryName, branch, commitSha: newCommit.sha });
}
