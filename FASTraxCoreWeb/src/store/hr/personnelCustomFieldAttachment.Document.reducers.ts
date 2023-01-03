import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import PersonnelDocumentAttachment from '@app/entities/hr/PersonnelDocumentAttachment';

export const addPersonnelDocumentAttachment = createAction<PersonnelDocumentAttachment>('ADD_PERSONNEL_DOCUMENT_ATTACHMENT');
export const setPersonnelDocumentAttachment = createAction<PersonnelDocumentAttachment[]>('SET_PERSONNEL_DOCUMENT_ATTACHMENT');
export const updatePersonnelDocumentAttachment = createAction<PersonnelDocumentAttachment>('UPDATE_PERSONNEL_DOCUMENT_ATTACHMENT');
export const removePersonnelDocumentAttachment = createAction<PersonnelDocumentAttachment>('REMOVE_PERSONNEL_DOCUMENT_ATTACHMENT');

export interface initPersonnelDocumentAttachment {
    current?: PersonnelDocumentAttachment[];
}

export const initPersonnelDocumentAttachmentDetails: initPersonnelDocumentAttachment = {
    current: []
}

export const emptyPersonnelDocumentAttachment = (ids?: number[]): PersonnelDocumentAttachment => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        personnelId: 0,
        fileName: '',
        fileSize: 0,
        image: '',
        imageType: '',
        remarks: '',
        action: '',
        dateUploaded: new Date(),
    };
};

export const personnelDocumentAttachmentReducer = createReducer (initPersonnelDocumentAttachmentDetails, builder => 
    builder
        .addCase(addPersonnelDocumentAttachment, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removePersonnelDocumentAttachment, (state, action) => {
            if (action.payload.tempId !== undefined) {
                state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
            } else {
                state.current = state.current?.filter(x => x.id !== action.payload.id);
            }
        })
        .addCase(setPersonnelDocumentAttachment, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updatePersonnelDocumentAttachment, (state, action) => {
            if (state.current !== undefined) {
                var index: number = 0;
                if (action.payload.tempId !== undefined) {
                    index = state.current.findIndex(aai => aai.tempId === action.payload.tempId);
                } else {
                    index = state.current.findIndex(aai => aai.id === action.payload.id);
                }
                state.current[index] = action.payload;
            }
        })  
); 

