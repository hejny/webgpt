import { Octokit } from '@octokit/rest';
import { GITHUB_TOKEN } from '../../../../config';

/**
 * Driver for GitHub API
 *
 * @singleton
 * @private within github-publish folder
 */
export const githubOctokit = new Octokit({ auth: GITHUB_TOKEN });
