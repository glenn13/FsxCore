import {StandardEntry} from '../StandardEntry';

export const emptyProjectRole: ProjectRole = {
  id: 0,
  projectId: 0,
  code: '',
  title: '',
  description: '',
  isStatic: false,
  isDefault: false,
};

export interface ProjectRole extends StandardEntry {
  id: number;
  projectId: number;
  isStatic: boolean;
  isDefault: boolean;
  //   roleId: number;

  //   role?: Role;
}
