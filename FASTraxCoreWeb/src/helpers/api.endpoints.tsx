import {AxiosResponse} from 'axios';
import http from '../services/http.service';
import {User} from '../entities/catalog/User';
import {UserProject} from '../entities/catalog/UserProject';
import {Project} from '../entities/catalog/Project';

export interface ILoginRequest {
  username: string;
  password: string;
  isPersistent: boolean;
}

export interface ISignOutRequest {
  username: string;
  token: string;
}

export interface ILoginVerificationResponse {
  verified: boolean;
  message: string;
}


export interface ILoginVerificationRequest {
  verificationCode: string;
  sessionId: string;
}

export const Auth = {
  authenticate: (payload: ILoginRequest): Promise<AxiosResponse<User>> =>
    http.post(`/authenticate`, payload),
  logoutUser: (payload: ISignOutRequest): Promise<AxiosResponse<User>> =>
    http.post(`/authenticate/logout-user`, payload),
  verifyClientCode: (payload: ILoginVerificationRequest): Promise<AxiosResponse<ILoginVerificationResponse>> =>
    http.post(`/authenticate/verify-client-code`, payload) 
};

export const Users = {
  addUser: (payload: any, callback: any) => http.post(`/users`, payload),
  getByUserId: (id: number) => http.get(`/users/${id}`),
  getUserProjects: (id: number): Promise<AxiosResponse<UserProject[]>> =>
    http.get(`/users/${id}/projects`),
  getProjectsByUser: (id: number): Promise<AxiosResponse<Project[]>> =>
    http.get(`/projects/users/${id}`),
};
