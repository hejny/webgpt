import { GITHUB_USERNAME, githubOctokit } from '../config';
import { ORGANIZATIONS } from '../organizations-data';
import { PROJECTS } from '../projects-data';
import { IOrganizationInfo } from './interfaces/IOrganizationInfo';
import { IProjectInfo } from './interfaces/IProjectInfo';
import { parseProject } from './parseProject';

export async function findProjectsOnGithub(): Promise<IOrganizationInfo[]> {
    const organizationsInfo: IOrganizationInfo[] = [];

    function addProject(projectInfo: IProjectInfo) {
        let organizationInfo = organizationsInfo.find(
            ({ organizationName }) => organizationName === projectInfo.organizationName,
        );

        if (!organizationInfo) {
            organizationInfo = {
                organizationName: projectInfo.organizationName,
                organizationTitle: projectInfo.organizationTitle,
                projects: [],
            };
            organizationsInfo.push(organizationInfo);
        }
        organizationInfo.projects.push(projectInfo);

        if (!organizationInfo.organizationTitle && projectInfo.organizationTitle) {
            organizationInfo.organizationTitle = projectInfo.organizationTitle;
        }
    }

    await Promise.all([
        // ➕ Add projects from hejny
        (async () => {
            const { data: repositoriesPage } = await githubOctokit.rest.repos.listForUser({
                username: GITHUB_USERNAME,
                per_page: 100, // TODO: pagination
            });

            await repositoriesPage.forEachAsyncParallel(async (data: any /* <- repository info from Octokit */) => {
                const projectInfo = await parseProject('Personal projects', data);

                if (!projectInfo) {
                    return;
                }

                addProject(projectInfo);
            });
        })(),

        // ➕ Add projects from organizations
        ORGANIZATIONS.forEachAsyncParallel(async ({ organizationName, organizationTitle }) => {
            const { data: repositoriesPage } = await githubOctokit.rest.repos.listForOrg({
                org: organizationName,
                per_page: 100,
            });

            await repositoriesPage.forEachAsyncParallel(async (data: any /* <- repository info from Octokit */) => {
                const projectInfo = await parseProject(organizationTitle!, data);

                if (!projectInfo) {
                    return;
                }

                addProject(projectInfo);
            });
        }),
    ]);

    // ➕ Add projects from other places
    PROJECTS.forEach(addProject);

    // Note: Sort organizations by priority of sum of its projects
    organizationsInfo.sort(
        (a, b) =>
            b.projects.reduce((sum, { priority }) => sum + priority, 0) -
            a.projects.reduce((sum, { priority }) => sum + priority, 0),
    );
    // Note: Sort projects in every organization by priority
    organizationsInfo.forEach((organizationInfo) => organizationInfo.projects.sort((a, b) => b.priority - a.priority));

    return organizationsInfo;
}

/**
 * TODO: Name should be extracted better (and probbably always with its emoji)
 * TODO: URL should be separated into repositoryUrl and projectUrl (which can be same) and in link should be used projectUrl
 * TODO: Iterate thorugh pages
 */

/*

{
  repo: {
    id: 418891252,
    node_id: 'R_kgDOGPfF9A',
    name: 'youtube2mp3',
    full_name: 'hejny/youtube2mp3',
    private: false,
    owner: {
      login: 'hejny',
      id: 23721952,
      node_id: 'MDQ6VXNlcjIzNzIxOTUy',
      avatar_url: 'https://avatars.githubusercontent.com/u/23721952?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/hejny',
      html_url: 'https://github.com/hejny',
      followers_url: 'https://api.github.com/users/hejny/followers',
      following_url: 'https://api.github.com/users/hejny/following{/other_user}',
      gists_url: 'https://api.github.com/users/hejny/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/hejny/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/hejny/subscriptions',
      organizations_url: 'https://api.github.com/users/hejny/orgs',
      repos_url: 'https://api.github.com/users/hejny/repos',
      events_url: 'https://api.github.com/users/hejny/events{/privacy}',
      received_events_url: 'https://api.github.com/users/hejny/received_events',
      type: 'User',
      site_admin: false
    },
    html_url: 'https://github.com/hejny/youtube2mp3',
    description: 'youtube2mp3',
    fork: false,
    url: 'https://api.github.com/repos/hejny/youtube2mp3',
    forks_url: 'https://api.github.com/repos/hejny/youtube2mp3/forks',
    keys_url: 'https://api.github.com/repos/hejny/youtube2mp3/keys{/key_id}',
    collaborators_url: 'https://api.github.com/repos/hejny/youtube2mp3/collaborators{/collaborator}',
    teams_url: 'https://api.github.com/repos/hejny/youtube2mp3/teams',
    hooks_url: 'https://api.github.com/repos/hejny/youtube2mp3/hooks',
    issue_events_url: 'https://api.github.com/repos/hejny/youtube2mp3/issues/events{/number}',
    events_url: 'https://api.github.com/repos/hejny/youtube2mp3/events',
    assignees_url: 'https://api.github.com/repos/hejny/youtube2mp3/assignees{/user}',
    branches_url: 'https://api.github.com/repos/hejny/youtube2mp3/branches{/branch}',
    tags_url: 'https://api.github.com/repos/hejny/youtube2mp3/tags',
    blobs_url: 'https://api.github.com/repos/hejny/youtube2mp3/git/blobs{/sha}',
    git_tags_url: 'https://api.github.com/repos/hejny/youtube2mp3/git/tags{/sha}',
    git_refs_url: 'https://api.github.com/repos/hejny/youtube2mp3/git/refs{/sha}',
    trees_url: 'https://api.github.com/repos/hejny/youtube2mp3/git/trees{/sha}',
    statuses_url: 'https://api.github.com/repos/hejny/youtube2mp3/statuses/{sha}',
    languages_url: 'https://api.github.com/repos/hejny/youtube2mp3/languages',
    stargazers_url: 'https://api.github.com/repos/hejny/youtube2mp3/stargazers',
    contributors_url: 'https://api.github.com/repos/hejny/youtube2mp3/contributors',
    subscribers_url: 'https://api.github.com/repos/hejny/youtube2mp3/subscribers',
    subscription_url: 'https://api.github.com/repos/hejny/youtube2mp3/subscription',
    commits_url: 'https://api.github.com/repos/hejny/youtube2mp3/commits{/sha}',
    git_commits_url: 'https://api.github.com/repos/hejny/youtube2mp3/git/commits{/sha}',
    comments_url: 'https://api.github.com/repos/hejny/youtube2mp3/comments{/number}',
    issue_comment_url: 'https://api.github.com/repos/hejny/youtube2mp3/issues/comments{/number}',
    contents_url: 'https://api.github.com/repos/hejny/youtube2mp3/contents/{+path}',
    compare_url: 'https://api.github.com/repos/hejny/youtube2mp3/compare/{base}...{head}',
    merges_url: 'https://api.github.com/repos/hejny/youtube2mp3/merges',
    archive_url: 'https://api.github.com/repos/hejny/youtube2mp3/{archive_format}{/ref}',
    downloads_url: 'https://api.github.com/repos/hejny/youtube2mp3/downloads',
    issues_url: 'https://api.github.com/repos/hejny/youtube2mp3/issues{/number}',
    pulls_url: 'https://api.github.com/repos/hejny/youtube2mp3/pulls{/number}',
    milestones_url: 'https://api.github.com/repos/hejny/youtube2mp3/milestones{/number}',
    notifications_url: 'https://api.github.com/repos/hejny/youtube2mp3/notifications{?since,all,participating}',
    labels_url: 'https://api.github.com/repos/hejny/youtube2mp3/labels{/name}',
    releases_url: 'https://api.github.com/repos/hejny/youtube2mp3/releases{/id}',
    deployments_url: 'https://api.github.com/repos/hejny/youtube2mp3/deployments',
    created_at: '2021-10-19T11:18:11Z',
    updated_at: '2022-02-04T22:38:55Z',
    pushed_at: '2022-05-22T23:44:34Z',
    git_url: 'git://github.com/hejny/youtube2mp3.git',
    ssh_url: 'git@github.com:hejny/youtube2mp3.git',
    clone_url: 'https://github.com/hejny/youtube2mp3.git',
    svn_url: 'https://github.com/hejny/youtube2mp3',
    homepage: null,
    size: 52,
    stargazers_count: 0,
    watchers_count: 0,
    language: 'JavaScript',
    has_issues: true,
    has_projects: true,
    has_downloads: true,
    has_wiki: true,
    has_pages: false,
    forks_count: 0,
    mirror_url: null,
    archived: false,
    disabled: false,
    open_issues_count: 0,
    license: {
      key: 'apache-2.0',
      name: 'Apache License 2.0',
      spdx_id: 'Apache-2.0',
      url: 'https://api.github.com/licenses/apache-2.0',
      node_id: 'MDc6TGljZW5zZTI='
    },
    allow_forking: true,
    is_template: false,
    topics: [],
    visibility: 'public',
    forks: 0,
    open_issues: 0,
    watchers: 0,
    default_branch: 'master',
    permissions: {
      admin: true,
      maintain: true,
      push: true,
      triage: true,
      pull: true
    }
  }
}

*/
