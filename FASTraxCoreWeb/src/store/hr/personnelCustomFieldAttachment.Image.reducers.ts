import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import PersonnelImageAttachment from '@app/entities/hr/PersonnelImageAttachment';

export const addPersonnelImageAttachment = createAction<PersonnelImageAttachment>('ADD_PERSONNEL_IMAGE_ATTACHMENT');
export const setPersonnelImageAttachment = createAction<PersonnelImageAttachment[]>('SET_PERSONNEL_IMAGE_ATTACHMENT');
export const updatePersonnelImageAttachment = createAction<PersonnelImageAttachment>('UPDATE_PERSONNEL_IMAGE_ATTACHMENT');
export const removePersonnelImageAttachment = createAction<PersonnelImageAttachment>('REMOVE_PERSONNEL_IMAGE_ATTACHMENT');

export interface initPersonnelImageAttachment {
    current?: PersonnelImageAttachment[];
}

export const initPersonnelImageAttachmentDetails: initPersonnelImageAttachment = {
    current: []
}

export const emptyPersonnelImageAttachment = (ids?: number[]): PersonnelImageAttachment => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        personnelId: 0,
        fileName: '',
        fileSize: 0,
        image: '',
        imageType: '',
        remarks: '',
        orientation: '',
        dateUploaded: new Date(),
        isPrintable: false,
        isDefault: false
    };
};

export const personnelImageAttachmentReducer = createReducer (initPersonnelImageAttachmentDetails, builder => 
    builder
        .addCase(addPersonnelImageAttachment, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removePersonnelImageAttachment, (state, action) => {
            if (action.payload.tempId !== undefined) {
                state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
            } else {
                state.current = state.current?.filter(x => x.id !== action.payload.id);
            }
        })
        .addCase(setPersonnelImageAttachment, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updatePersonnelImageAttachment, (state, action) => {
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

