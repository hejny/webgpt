import { createBlobForGithub } from './createBlobForGithub';
import { createNewCommit } from './createNewCommit';
import { createNewTree } from './createNewTree';
import { getCurrentCommit } from './getCurrentCommit';
import { IFile } from './interfaces/IFile';
import { IFileForGithub } from './interfaces/IFileForGithub';
import { setBranchToCommit } from './setBranchToCommit';

interface UploadToRepositoryOptions {
  organizationName: string;
  repositoryName: string;
  branch: string;
  files: Array<IFile>;
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
        files.map(async ({ path, content }) => ({
            path,
            content: await createBlobForGithub({ organizationName, repositoryName, content }),
        })),
    );

    const newTree = await createNewTree({
        organizationName,
        repositoryName,
        files: filesForGithub,
        parentTreeSha: currentCommit.treeSha,
    });
    const commitMessage = `My commit message`; /* <- !!! Pass as param */
    const newCommit = await createNewCommit({
        organizationName,
        repositoryName,
        message: commitMessage,
        currentTreeSha: newTree.sha,
        currentCommitSha: currentCommit.commitSha,
    });
    await setBranchToCommit({ organizationName, repositoryName, branch, commitSha: newCommit.sha });
}
