import FsxUri from '@app/helpers/endpoints';
import httpService from '../http.service';
import { useQuery } from 'react-query';
import Personnel from '@app/entities/hr/Personnel'
import PersonnelWorkPermit from '@app/entities/hr/PersonnelWorkPermit';
import PersonnelWorkVisa from '@app/entities/hr/PersonnelWorkVisa';
import PersonnelBankAccount from '@app/entities/hr/PersonnelBankAccount';
import PersonnelAddress from '@app/entities/hr/PersonnelAddress';
import { AxiosResponse } from 'axios';
import http from '../http.service';
import PersonnelWorkOtherClearance from '@app/entities/hr/PersonnelWorkOtherClearance';
import PersonnelImageAttachment from '@app/entities/hr/PersonnelImageAttachment';
import PersonnelDocumentAttachment from '@app/entities/hr/PersonnelDocumentAttachment';
import PersonnelWorkHistory from '@app/entities/hr/PersonnelWorkHistory';

const PERSONNEL_KEY = 'PERSONNEL_SUMMARY';

/* -------------------------------------------------------------------------- */
/*                                    Axios                                   */
/* -------------------------------------------------------------------------- */

/** 
 * Fetch all Personnels
 */
export const getPersonnels = () => httpService.get<Personnel[]>(FsxUri.hr.personnels.base);

/* --------------------------------------------------------------- ----------- */
/*                                 React Query                                */
/* -------------------------------------------------------------------------- */

/**
 * useQuery instance of getPersonnels
 */ 
export const usePersonnels = () => useQuery('personnels', getPersonnels);

export const getPersonnelDetails = (id: UrlParam) => {
  return httpService.get<Personnel>(FsxUri.hr.personnels.find(id));
};

export const usePersonnel = (id: number) => useQuery('personnels', () => getPersonnelDetails(id));

export const usePersonnelSummaryForGrid = () => useQuery(PERSONNEL_KEY,getPersonnels); 

export const getPersonnelFullInfo = (id: UrlParam) => {
  return http.get<Personnel>(FsxUri.hr.personnels.findFullInfo(id));
}; 

export const patchPersonnel = (payload: Personnel): Promise<AxiosResponse> => {
  if (!payload.id) return Promise.reject('Personnel ID is missing');
  return http.patch(FsxUri.hr.personnels.update(payload.id), payload);
};


export const postPersonnel = (payload: Personnel): Promise<AxiosResponse> => {
  return http.post(FsxUri.hr.personnels.base, payload);
};


export const getPersonnelWorkPermit = (id: UrlParam) => {
  return http.get<PersonnelWorkPermit[]>(FsxUri.hr.personnels.getPersonnelWorkPermit(id));
};

export const postPersonnelWorkPermit = (personnelId: number, payload: PersonnelWorkPermit[]): Promise<AxiosResponse> => {
  if (personnelId <= 0) return Promise.reject('Personnel ID is missing');
  return http.post(FsxUri.hr.personnels.postPersonnelWorkPermit(personnelId), payload);
};


export const patchPersonnelWorkPermit = (personnelId: number, payload: PersonnelWorkPermit[]): Promise<AxiosResponse> => {
  if (personnelId <= 0) return Promise.reject('Personnel ID is missing');
  return http.patch(FsxUri.hr.personnels.patchPersonnelWorkPermit(personnelId), payload);
};

export const deletePersonnelWorkPermit = (personnelId: number): Promise<AxiosResponse> => {
  if (personnelId <= 0) return Promise.reject('Personnel Work Permit ID is missing');
  return http.delete(FsxUri.hr.personnels.deletePersonnelWorkPermit(personnelId));
};


export const getPersonnelWorkVisa = (id: UrlParam) => {
  return http.get<PersonnelWorkVisa[]>(FsxUri.hr.personnels.getPersonnelWorkVisa(id));
};

export const postPersonnelWorkVisa = (personnelId: number, payload: PersonnelWorkVisa[]): Promise<AxiosResponse> => {
  if (personnelId <= 0) return Promise.reject('Personnel ID is missing');
  return http.post(FsxUri.hr.personnels.postPersonnelWorkVisa(personnelId), payload);
};

export const patchPersonnelWorkVisa = (personnelId: number, payload: PersonnelWorkVisa[]): Promise<AxiosResponse> => {
  if (personnelId <= 0) return Promise.reject('Personnel ID is missing');
  return http.patch(FsxUri.hr.personnels.patchPersonnelWorkVisa(personnelId), payload);
};

export const deletePersonnelWorkVisa = (personnelId: number): Promise<AxiosResponse> => {
  if (personnelId <= 0) return Promise.reject('Personnel Work Visa ID is missing');
  return http.delete(FsxUri.hr.personnels.deletePersonnelWorkVisa(personnelId));
};



export const getPersonnelBankAccount = (id: UrlParam) => {
  return http.get<PersonnelBankAccount[]>(FsxUri.hr.personnels.getPersonnelBankAccount(id));
};

export const postPersonnelBankAccount = (personnelId: number, payload: PersonnelBankAccount[]): Promise<AxiosResponse> => {
  if (personnelId <= 0) return Promise.reject('Personnel ID is missing');
  return http.post(FsxUri.hr.personnels.postPersonnelBankAccount(personnelId), payload);
};

export const patchPersonnelBankAccount = (personnelId: number, payload: PersonnelBankAccount[]): Promise<AxiosResponse> => {
  if (personnelId <= 0) return Promise.reject('Personnel ID is missing');
  return http.patch(FsxUri.hr.personnels.patchPersonnelBankAccount(personnelId), payload);
};

export const deletePersonnelBankAccount = (personnelId: number): Promise<AxiosResponse> => {
  if (personnelId <= 0) return Promise.reject('Personnel Bank Account ID is missing');
  return http.delete(FsxUri.hr.personnels.deletePersonnelBankAccount(personnelId));
};



export const getPersonnelAddress = (id: UrlParam) => {
  return http.get<PersonnelAddress[]>(FsxUri.hr.personnels.getPersonnelAddress(id));
};

export const postPersonnelAddress = (personnelId: number, payload: PersonnelAddress[]): Promise<AxiosResponse> => {
  if (personnelId <= 0) return Promise.reject('Personnel ID is missing');
  return http.post(FsxUri.hr.personnels.postPersonnelAddress(personnelId), payload);
};

export const patchPersonnelAddress = (personnelId: number, payload: PersonnelAddress[]): Promise<AxiosResponse> => {
  if (personnelId <= 0) return Promise.reject('Personnel ID is missing');
  return http.patch(FsxUri.hr.personnels.patchPersonnelAddress(personnelId), payload);
};

export const deletePersonnelAddress = (personnelId: number): Promise<AxiosResponse> => {
  if (personnelId <= 0) return Promise.reject('Personnel Address ID is missing');
  return http.delete(FsxUri.hr.personnels.deletePersonnelAddress(personnelId));
};



export const getPersonnelWorkOtherClearance = (id: UrlParam) => {
  return http.get<PersonnelWorkOtherClearance[]>(FsxUri.hr.personnels.getPersonnelWorkOtherClearance(id));
};

export const postPersonnelWorkOtherClearance = (personnelId: number, payload: PersonnelWorkOtherClearance[]): Promise<AxiosResponse> => {
  if (personnelId <= 0) return Promise.reject('Personnel ID is missing');
  return http.post(FsxUri.hr.personnels.postPersonnelWorkOtherClearance(personnelId), payload);
};

export const patchPersonnelWorkOtherClearance = (personnelId: number, payload: PersonnelWorkOtherClearance[]): Promise<AxiosResponse> => {
  if (personnelId <= 0) return Promise.reject('Personnel ID is missing');
  return http.patch(FsxUri.hr.personnels.patchPersonnelWorkOtherClearance(personnelId), payload);
};

export const deletePersonnelWorkOtherClearance = (personnelId: number): Promise<AxiosResponse> => {
  if (personnelId <= 0) return Promise.reject('Work Other Clearance ID is missing');
  return http.delete(FsxUri.hr.personnels.deletePersonnelWorkOtherClearance(personnelId));
};



export const getPersonnelImageAttachment = (id: UrlParam) => {
  return http.get<PersonnelImageAttachment[]>(FsxUri.hr.personnels.getPersonnelImageAttachment(id));
};

export const postPersonnelImageAttachment = (personnelId: number, payload: PersonnelImageAttachment[]): Promise<AxiosResponse> => {
  if (personnelId <= 0) return Promise.reject('Personnel ID is missing');
  return http.post(FsxUri.hr.personnels.postPersonnelImageAttachment(personnelId), payload);
};

export const patchPersonnelImageAttachment = (personnelId: number, payload: PersonnelImageAttachment[]): Promise<AxiosResponse> => {
  if (personnelId <= 0) return Promise.reject('Personnel ID is missing');
  return http.patch(FsxUri.hr.personnels.patchPersonnelImageAttachment(personnelId), payload);
};

export const deletePersonnelImageAttachment = (personnelId: number): Promise<AxiosResponse> => {
  if (personnelId <= 0) return Promise.reject('Image Attachment ID is missing');
  return http.delete(FsxUri.hr.personnels.deletePersonnelImageAttachment(personnelId));
};



export const getPersonnelDocumentAttachment = (id: UrlParam) => {
  return http.get<PersonnelDocumentAttachment[]>(FsxUri.hr.personnels.getPersonnelDocumentAttachment(id));
};

export const postPersonnelDocumentAttachment = (personnelId: number, payload: PersonnelDocumentAttachment[]): Promise<AxiosResponse> => {
  if (personnelId <= 0) return Promise.reject('Personnel ID is missing');
  return http.post(FsxUri.hr.personnels.postPersonnelDocumentAttachment(personnelId), payload);
};

export const patchPersonnelDocumentAttachment = (personnelId: number, payload: PersonnelDocumentAttachment[]): Promise<AxiosResponse> => {
  if (personnelId <= 0) return Promise.reject('Personnel ID is missing');
  return http.patch(FsxUri.hr.personnels.patchPersonnelDocumentAttachment(personnelId), payload);
};

export const deletePersonnelDocumentAttachment = (personnelId: number): Promise<AxiosResponse> => {
  if (personnelId <= 0) return Promise.reject('Document Attachment ID is missing');
  return http.delete(FsxUri.hr.personnels.deletePersonnelDocumentAttachment(personnelId));
};

export const getPersonnelWorkHistory = (id: UrlParam) => {
  return http.get<PersonnelWorkHistory[]>(FsxUri.hr.personnels.getPersonnelWorkHistory(id));
};


export default {
    getFullInfo: getPersonnelFullInfo,
    post: postPersonnel,
    patch: patchPersonnel,
    getWorkPermit: getPersonnelWorkPermit,
    postWorkPermit: postPersonnelWorkPermit,
    patchWorkPermit: patchPersonnelWorkPermit,
    deletePersonnelWorkPermit: deletePersonnelWorkPermit,
    getWorkVisa: getPersonnelWorkVisa,
    postWorkVisa: postPersonnelWorkVisa,
    patchWorkVisa: patchPersonnelWorkVisa,
    deletePersonnelWorkVisa: deletePersonnelWorkVisa,
    getBankAccount: getPersonnelBankAccount,
    postBankAccount: postPersonnelBankAccount,
    patchBankAccount: patchPersonnelBankAccount,
    deleteBankAccount: deletePersonnelBankAccount,
    getAddress: getPersonnelAddress,
    postAddress: postPersonnelAddress,
    patchAddress: patchPersonnelAddress,
    deleteAddress: deletePersonnelAddress, 
    getWorkOtherClearance: getPersonnelWorkOtherClearance, 
    postWorkOtherClearance: postPersonnelWorkOtherClearance, 
    patchWorkOtherClearance: patchPersonnelWorkOtherClearance, 
    deleteWorkOtherClearance: deletePersonnelWorkOtherClearance, 
    getImage: getPersonnelImageAttachment, 
    postImage: postPersonnelImageAttachment, 
    patchImage: patchPersonnelImageAttachment, 
    deleteImage: deletePersonnelImageAttachment,
    getDocument: getPersonnelDocumentAttachment, 
    postDocument: postPersonnelDocumentAttachment, 
    patchDocument: patchPersonnelDocumentAttachment, 
    deleteDocument: deletePersonnelDocumentAttachment, 
    getWorkHistory: getPersonnelWorkHistory,
}

