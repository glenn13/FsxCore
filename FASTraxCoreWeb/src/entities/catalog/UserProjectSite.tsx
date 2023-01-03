import {ProjectSite} from './ProjectSite';
import {UserProject} from './UserProject';

export interface UserProjectSite {
  id: number;
  projectSiteId: number;
  projectSite: ProjectSite;
  userProjectId: number;
  userProject: UserProject;
  visible: boolean;
}
