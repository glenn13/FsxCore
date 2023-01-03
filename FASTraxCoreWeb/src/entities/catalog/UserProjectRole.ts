import {ProjectRole} from './ProjectRole';

export interface UserProjectRole {
  id: number;
  userProjectId: number;
  projectRoleId: number;

  projectRole?: ProjectRole;
}
