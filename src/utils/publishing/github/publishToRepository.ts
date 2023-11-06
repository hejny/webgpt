import chalk from 'chalk';
import { githubOctokit } from './githubOctokit';
import { IFileToPublish } from './interfaces/IFileToPublish';
import { uploadToRepository } from './uploadToRepository';

interface CreateNewRepositoryOptions {
    organizationName: string;
    repositoryName: string;
    files: Array<IFileToPublish>;
}

/**
 * Create new repository, upload files into it and publish to Github Pages
 *
 * @public
 */
export async function publishToRepository(options: CreateNewRepositoryOptions) {
    const { organizationName, repositoryName, files } = options;

    /**/
    console.info(chalk.cyan(` ➕  Creating new repository ${repositoryName} `));
    const createResult = await githubOctokit.repos.createInOrg({
        org: organizationName,
        name: repositoryName,
        auto_init: true,
        private: false,
    });
    // console.log(createResult);
    console.info(chalk.green(` Repository ${repositoryName} created `));
    /**/

    /**/
    console.info(chalk.cyan(` ⬆  Uploading into repository ${repositoryName} `));
    /* const uploadResult = */ await uploadToRepository({
        organizationName,
        repositoryName,
        branch: 'main',
        files,
    });
    // console.log(uploadResult);
    console.info(chalk.green(`Uploaded into repository ${repositoryName}`));
    /**/

    /**/
    console.info(chalk.cyan(` 🌎  Publishing repository ${repositoryName} `));
    await githubOctokit.repos.createPagesSite({
        owner: organizationName,
        repo: repositoryName,
        source: {
            branch: 'main',
            path: '/',
        },
    });
    console.info(chalk.green(`Published on:\nhttps://${repositoryName}.webgpt.cz` /* <- TODO: Unhardcode */));
    /**/
}
