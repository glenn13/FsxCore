import {Project} from './Project';
import {ProjectSite} from './ProjectSite';
import {ProjectRole} from './ProjectRole';
import {User} from './User';

export interface UserProjectSiteRole {
  id: number;
  userId: number;
  projectId: number;
  projectSiteId: number;
  projectRoleId: number;

  user: User;
  project: Project;
  projectSite: ProjectSite;
  projectRole: ProjectRole;
  visible: boolean;
}
