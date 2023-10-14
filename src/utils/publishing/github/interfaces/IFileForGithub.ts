/**
 * Interface for file to be published on Github
 *
 * @private within github-publish folder
 */
export interface IFileForGithub {
    path: string;
    content: {
        url: string;
        sha: string;
    };
}
