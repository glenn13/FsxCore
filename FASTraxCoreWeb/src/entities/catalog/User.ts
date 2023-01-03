import {UserProject} from './UserProject';
import {UserStatus} from './UserStatus';
import {UserProjectSite} from './UserProjectSite';
import {UserProjectSiteRole} from './UserProjectSiteRole';
import {UserImage} from './UserImage';
import Department from '../hr/standard-entries/HumanResourceDepartment';
import * as yup from 'yup';

export interface User {
  id: number;
  displayName: string;
  firstName: string;
  username: string;
  lastName: string;
  jwtToken: string;
  refreshToken: string;
  email: string;
  contactNo: string;
  departmentId: number;
  address: string;
  designationId: number;
  designation: Designation;
  stateZipCode: string;
  statusId: number;
  countryId: number;
  country: Country;
  customerId: number | null;

  department?: Department;
  userProjects?: UserProject[];
  userProjectSites?: UserProjectSite[];
  userProjectSitesRole?: UserProjectSiteRole[];
  status?: UserStatus[];
  userImage?: UserImage;

  userAdmin?: UserAdmin;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  active: boolean;
}

export interface UserAdmin {
  id: number;
  superAdmin: string;
  userId: number;
}

export interface Designation {
  id: number;
  title: string;
  description: string;
}

export interface Country {
  id: number;
  title: string;
  description: string;
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const userShape = {
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  username: yup.string().required('Username is required'),
  email: yup
    .string()
    .required('Email Address is required')
    .email('Email Address should be a valid email'),
  contactNo: yup
    .string()
    .nullable()
    .required('Contact No. is required')
    .matches(phoneRegExp, 'Phone number is not valid'),
  countryId: yup.number().min(1, 'Country is required'),
  departmentId: yup.number().min(1, 'Department is required'),
  designationId: yup.number().min(1, 'Position/Title is required'),
  statusId: yup.number().min(1, 'Status is required'),
};

export type IUserFormData = Omit<
  User,
  'jwtToken' | 'refreshToken' | 'country' | 'designation' | 'isAdmin' | 'isSuperAdmin'
>;

export interface ChangePassword {
  userId: number;
  newPassword: string;
  oldPassword: string;
}
