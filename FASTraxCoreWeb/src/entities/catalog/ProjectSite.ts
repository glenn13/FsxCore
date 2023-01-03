import {StandardEntry} from '../StandardEntry';
import {Project} from './Project';
import {UserProjectSiteRole} from './UserProjectSiteRole';

export const emptyProjectSite: ProjectSite = {
  id: 0,
  projectId: 0,
  code: '',
  title: '',
  description: '',
  visible: false,
  default: false,
};

export interface ProjectSite extends StandardEntry {
  id: number;
  projectId: number;
  project?: Project;
  visible?: boolean;
  default?: boolean;
  userProjectSitesRole?: UserProjectSiteRole[];
}
