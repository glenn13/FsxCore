import {AxiosResponse} from 'axios';
import {ReduxThunk} from '../rootReducer';
import _ from 'lodash';
import generalAssetService from '@app/services/asset/register/generalasset.service';
import personnelService from '@app/services/hr/personnel.services';
import {generateNegativeNumber} from '@app/helpers/randoms';
import {setErrors} from '../common/errors.reducer';
// import {setGeneralAsset} from './generalasset.reducers';
import Personnel from '@app/entities/hr/Personnel';
import PersonnelWorkPermit from '@app/entities/hr/PersonnelWorkPermit';
import PersonnelWorkVisa from '@app/entities/hr/PersonnelWorkVisa';
import PersonnelBankAccount from '@app/entities/hr/PersonnelBankAccount';
import PersonnelAddress from '@app/entities/hr/PersonnelAddress';
import PersonnelWorkOtherClearance from '@app/entities/hr/PersonnelWorkOtherClearance';
import PersonnelImageAttachment from '@app/entities/hr/PersonnelImageAttachment';
import PersonnelDocumentAttachment from '@app/entities/hr/PersonnelDocumentAttachment';
import PersonnelWorkHistory from '@app/entities/hr/PersonnelWorkHistory';

import {setPersonnel} from './personnel.reducers';
import { setPersonnelWorkPermit } from './personnelWorkPermit.reducers';
import { setPersonnelWorkVisa } from './personnelWorkVisa.reducers';
import { setPersonnelBankAccount } from './personnelBankAccount.reducers';
import { setPersonnelAddress } from './personnelAddress.reducers';
import { setPersonnelWorkOtherClearance } from './personnelWorkOtherClearance.reducers';
import { setPersonnelImageAttachment } from './personnelCustomFieldAttachment.Image.reducers';
import { setPersonnelDocumentAttachment } from './personnelCustomFieldAttachment.Document.reducers';
import { setPersonnelWorkHistory } from './personnelWorkHistory.reducers';


/**
 * start: Personnel
 */

export const loadPersonnelFullInfo = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await personnelService.getFullInfo(id);
    dispatch(setPersonnel(response.data));
};

export const submitPersonnelGridDetails = (personnelId: number): ReduxThunk => async (
    dispatch,
    getState,
) => {
    const state = getState();

    //Start - Personnel Work Permit
    if (state.personnelWorkPermitReducer.current !== undefined) {
        if (state.personnelWorkPermitReducer.current.length > 0) {
        await submitPersonnelWorkPermitPayload(
            personnelId,
            state.personnelWorkPermitReducer.current,
        ).catch(error => {
            if (!error.response) return dispatch(setErrors(error));
            const response: AxiosResponse = error.response;
            dispatch(setErrors(response.data));
        });
        } else {
        await deletePersonnelWorkPermit(personnelId).catch(error => {
            if (!error.response) return dispatch(setErrors(error));
            const response: AxiosResponse = error.response;
            dispatch(setErrors(response.data));
        });
        }
    }
    //End - Personnel Work Permit

    //Start - Personnel Work Visa
    if (state.personnelWorkVisaReducer.current !== undefined) {
        if (state.personnelWorkVisaReducer.current.length > 0) {
        await submitPersonnelWorkVisaPayload(
            personnelId,
            state.personnelWorkVisaReducer.current,
        ).catch(error => {
            if (!error.response) return dispatch(setErrors(error));
            const response: AxiosResponse = error.response;
            dispatch(setErrors(response.data));
        });
        } else {
        await deletePersonnelWorkVisa(personnelId).catch(error => {
            if (!error.response) return dispatch(setErrors(error));
            const response: AxiosResponse = error.response;
            dispatch(setErrors(response.data));
        });
        }
    }
    //End - Personnel Work Visa

    //Start - Personnel Bank Account
    if (state.personnelBankAccountReducer.current !== undefined) {
        if (state.personnelBankAccountReducer.current.length > 0) {
        await submitPersonnelBankAccountPayload(
            personnelId,
            state.personnelBankAccountReducer.current,
        ).catch(error => {
            if (!error.response) return dispatch(setErrors(error));
            const response: AxiosResponse = error.response;
            dispatch(setErrors(response.data));
        });
        } else {
        await deletePersonnelBankAccount(personnelId).catch(error => {
            if (!error.response) return dispatch(setErrors(error));
            const response: AxiosResponse = error.response;
            dispatch(setErrors(response.data));
        });
        }
    }
    //End - Personnel Bank Account

    //Start - Personnel Address
    if (state.personnelAddressReducer.current !== undefined) {
        if (state.personnelAddressReducer.current.length > 0) {
        await submitPersonnelAddressPayload(
            personnelId,
            state.personnelAddressReducer.current,
        ).catch(error => {
            if (!error.response) return dispatch(setErrors(error));
            const response: AxiosResponse = error.response;
            dispatch(setErrors(response.data));
        });
        } else {
        await deletePersonnelAddress(personnelId).catch(error => {
            if (!error.response) return dispatch(setErrors(error));
            const response: AxiosResponse = error.response;
            dispatch(setErrors(response.data));
        });
        }
    }
    //End - Personnel Address

    //Start - Work Other Clearance
    if (state.personnelWorkOtherClearanceReducer.current !== undefined) {
        if (state.personnelWorkOtherClearanceReducer.current.length > 0) {
        await submitPersonnelWorkOtherClearancePayload(
            personnelId,
            state.personnelWorkOtherClearanceReducer.current,
        ).catch(error => {
            if (!error.response) return dispatch(setErrors(error));
            const response: AxiosResponse = error.response;
            dispatch(setErrors(response.data));
        });
        } else {
        await deletePersonnelWorkOtherClearance(personnelId).catch(error => {
            if (!error.response) return dispatch(setErrors(error));
            const response: AxiosResponse = error.response;
            dispatch(setErrors(response.data));
        });
        }
    }
    //End - Work Other Clearance

    //Start - Personnel Image Attachment
    if (state.personnelImageAttachmentReducer.current !== undefined) {
        if (state.personnelImageAttachmentReducer.current.length > 0) {
        await submitPersonnelImageAttachmentPayload(
            personnelId,
            state.personnelImageAttachmentReducer.current,
        ).catch(error => {
            if (!error.response) return dispatch(setErrors(error));
            const response: AxiosResponse = error.response;
            dispatch(setErrors(response.data));
        });
        } else {
        await deletePersonnelImageAttachment(personnelId).catch(error => {
            if (!error.response) return dispatch(setErrors(error));
            const response: AxiosResponse = error.response;
            dispatch(setErrors(response.data));
        });
        }
    }
    //End - Personnel Image Attachment

    //Start - Personnel Document Attachment
    if (state.personnelDocumentAttachmentReducer.current !== undefined) {
        if (state.personnelDocumentAttachmentReducer.current.length > 0) {
        await submitPersonnelDocumentAttachmentPayload(
            personnelId,
            state.personnelDocumentAttachmentReducer.current,
        ).catch(error => {
            if (!error.response) return dispatch(setErrors(error));
            const response: AxiosResponse = error.response;
            dispatch(setErrors(response.data));
        });
        } else {
        await deletePersonnelDocumentAttachment(personnelId).catch(error => {
            if (!error.response) return dispatch(setErrors(error));
            const response: AxiosResponse = error.response;
            dispatch(setErrors(response.data));
        });
        }
    }
    //End - Personnel Document Attachment
};

export const submitPersonnel = (
    personnel: Personnel,
): ReduxThunk<Promise<AxiosResponse<number>>> => async (_, getState) => {
    return submitPersonnelPayload(personnel);
};

export const submitPersonnelPayload = async (payload: Personnel): Promise<AxiosResponse> => {
    const requestToServer = payload.id ? personnelService.patch : personnelService.post;
    return requestToServer(payload);
};

/**
 * end: Personnel
 */

/**
 * start: Personnel Work Permit
 */

export const submitPersonnelWorkPermitPayload = async (
    personnelId: number,
    payload: PersonnelWorkPermit[],
): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer =
        indx === -1 ? personnelService.postWorkPermit : personnelService.patchWorkPermit;
    return requestToServer(personnelId, payload);
};

export const deletePersonnelWorkPermit = async (personnelId: number): Promise<AxiosResponse> => {
    const requestToServer = personnelService.deletePersonnelWorkPermit(personnelId);
    return requestToServer;
};
export const loadPersonnelWorkPermit = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await personnelService.getWorkPermit(id);
    dispatch(setPersonnelWorkPermit(response.data));
};

/**
 * end: Personnel Work Permit
 */

/**
 * start: Personnel Work Visa
 */

export const submitPersonnelWorkVisaPayload = async (
    personnelId: number,
    payload: PersonnelWorkVisa[],
): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer =
        indx === -1 ? personnelService.postWorkVisa : personnelService.patchWorkVisa;
    return requestToServer(personnelId, payload);
};

export const deletePersonnelWorkVisa = async (personnelId: number): Promise<AxiosResponse> => {
    const requestToServer = personnelService.deletePersonnelWorkVisa(personnelId);
    return requestToServer;
};
export const loadPersonnelWorkVisa = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await personnelService.getWorkVisa(id);
    dispatch(setPersonnelWorkVisa(response.data));
};

/**
 * end: Personnel Work Visa
 */

/**
 * start: Personnel Bank Account
 */

export const submitPersonnelBankAccountPayload = async (
    personnelId: number,
    payload: PersonnelBankAccount[],
): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer =
        indx === -1 ? personnelService.postBankAccount : personnelService.patchBankAccount;
    return requestToServer(personnelId, payload);
};

export const deletePersonnelBankAccount = async (personnelId: number): Promise<AxiosResponse> => {
    const requestToServer = personnelService.deleteBankAccount(personnelId);
    return requestToServer;
};
export const loadPersonnelBankAccount = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await personnelService.getBankAccount(id);
    dispatch(setPersonnelBankAccount(response.data));
};

/**
 * end: Personnel Bank Account
 */

/**
 * start: Personnel Address
 */

export const submitPersonnelAddressPayload = async (
    personnelId: number,
    payload: PersonnelAddress[],
): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer =
        indx === -1 ? personnelService.postAddress : personnelService.patchAddress;
    return requestToServer(personnelId, payload);
};

export const deletePersonnelAddress = async (personnelId: number): Promise<AxiosResponse> => {
    const requestToServer = personnelService.deleteAddress(personnelId);
    return requestToServer;
};
export const loadPersonnelAddress = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await personnelService.getAddress(id);
    dispatch(setPersonnelAddress(response.data));
};

/**
 * end: Personnel Address
 */


/**
 * start: Work Other Clerance
 */

 export const submitPersonnelWorkOtherClearancePayload = async (
    personnelId: number,
    payload: PersonnelWorkOtherClearance[],
): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer =
        indx === -1 ? personnelService.postWorkOtherClearance : personnelService.patchWorkOtherClearance;
    return requestToServer(personnelId, payload);
};

export const deletePersonnelWorkOtherClearance = async (personnelId: number): Promise<AxiosResponse> => {
    const requestToServer = personnelService.deleteWorkOtherClearance(personnelId);
    return requestToServer;
};
export const loadPersonnelWorkOtherClearance = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await personnelService.getWorkOtherClearance(id);
    dispatch(setPersonnelWorkOtherClearance(response.data));
};

/**
 * end: Work Other Clerance
 */


/**
 * start: Personnel Image Attachment
 */

 export const submitPersonnelImageAttachmentPayload = async (
    personnelId: number,
    payload: PersonnelImageAttachment[],
): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer =
        indx === -1 ? personnelService.postImage : personnelService.patchImage;
    return requestToServer(personnelId, payload);
};

export const deletePersonnelImageAttachment = async (personnelId: number): Promise<AxiosResponse> => {
    const requestToServer = personnelService.deleteImage(personnelId);
    return requestToServer;
};
export const loadPersonnelImageAttachment = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await personnelService.getImage(id);
    dispatch(setPersonnelImageAttachment(response.data));
};

/**
 * end: Personnel Image Attachment
 */


/**
 * start: Personnel Document Attachment
 */

 export const submitPersonnelDocumentAttachmentPayload = async (
    personnelId: number,
    payload: PersonnelDocumentAttachment[],
): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer =
        indx === -1 ? personnelService.postDocument : personnelService.patchDocument;
    return requestToServer(personnelId, payload);
};

export const deletePersonnelDocumentAttachment = async (personnelId: number): Promise<AxiosResponse> => {
    const requestToServer = personnelService.deleteDocument(personnelId);
    return requestToServer;
};
export const loadPersonnelDocumentAttachment = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await personnelService.getDocument(id);
    dispatch(setPersonnelDocumentAttachment(response.data));
};


/**
 * end: Personnel Document Attachment
 */

 export const loadPersonnelWorkHistory = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await personnelService.getWorkHistory(id);
    dispatch(setPersonnelWorkHistory(response.data));
};