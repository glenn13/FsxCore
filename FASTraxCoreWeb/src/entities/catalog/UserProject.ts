import {Project} from './Project';
import {UserProjectRole} from './UserProjectRole';
import {UserProjectSite} from './UserProjectSite';
import {User} from './User';

export interface UserProject {
  id: number;
  projectId: number;
  userId: number;

  project?: Project;
  user?: User;
  userProjectSites?: UserProjectSite[];
  userProjectRoles?: UserProjectRole[];
}
