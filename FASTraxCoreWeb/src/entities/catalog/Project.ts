import {Client} from './Client';
import {ProjectSite} from './ProjectSite';
import {ProjectRole} from './ProjectRole';
import {ProjectGroup} from './ProjectGroup';
import {ProjectDepartment} from './ProjectDepartment';
import {ProjectImage} from './ProjectImage';
import {UserProjectSite} from './UserProjectSite';
import {UserProjectSiteRole} from './UserProjectSiteRole';
import {StandardEntry} from '../StandardEntry';
import * as yup from 'yup';
import {Country} from '../global/Country';
import {ModulePermissionDefault} from '@app/entities/catalog/Pages';
import {UserProject} from './UserProject';

export const newProject = (): ProjectFormData => ({
  id: 0,
  code: '',
  title: '',
  description: '',
  clientId: null,
  countryId: null,
  groupId: null,
  active: false,
  baseCurrencyId: 1,
  localCurrencyId: 1,
  statusId: 1,
});

export interface Project extends StandardEntry {
  clientId: number | null;
  client?: Client;
  countryId: number | null;
  country?: Country;
  groupId: number | null;
  createdById?: number | null;
  dateCreated?: Date;

  projectRoles?: ProjectRole[];
  projectSites?: ProjectSite[];
  projectDepartments?: ProjectDepartment[];
  group?: ProjectGroup;
  projectImage?: ProjectImage;

  userProjectSites?: UserProjectSite[];
  userProjectSitesRole?: UserProjectSiteRole[];
  userProjects?: UserProject[];

  selectedProjectSite?: ProjectSite;
  modules?: ModulePermissionDefault[];
  active: boolean;
  baseCurrencyId: number;
  localCurrencyId: number;
  statusId: number;
}

export type ProjectFormData = Omit<Project, 'projectSites'>;

export const projectShape = {
  code: yup.string().required('Code is required'),
  title: yup.string().required('Title is required'),
  clientId: yup.number().nullable().required('Customer is required'),
  countryId: yup.number().nullable().required('Country is required'),
  groupId: yup.number().nullable().required('Group is required'),
  baseCurrencyId: yup
    .number()
    .nullable()
    .min(1, 'Base Currency is required')
    .required('Base Currency is required'),
  localCurrencyId: yup
    .number()
    .min(1, 'Local Currency is required')
    .nullable()
    .required('Local Currency is required'),
};
