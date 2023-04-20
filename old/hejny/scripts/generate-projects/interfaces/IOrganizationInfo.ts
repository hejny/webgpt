import { IProjectInfo } from './IProjectInfo';

export interface IOrganizationInfo {
    organizationName: string;
    organizationTitle?: string;
    projects: IProjectInfo[];
}
