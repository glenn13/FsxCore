import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import PersonnelWorkVisa from '@app/entities/hr/PersonnelWorkVisa';

export const addPersonnelWorkVisa = createAction<PersonnelWorkVisa>('ADD_PERSONNEL_WORK_VISA');
export const setPersonnelWorkVisa = createAction<PersonnelWorkVisa[]>('SET_PERSONNEL_WORK_VISA');
export const updatePersonnelWorkVisa = createAction<PersonnelWorkVisa>('UPDATE_PERSONNEL_WORK_VISA');
export const removePersonnelWorkVisa = createAction<PersonnelWorkVisa>('REMOVE_PERSONNEL_WORK_VISA');

export interface initPersonnelWorkVisa {
    current?: PersonnelWorkVisa[];
}

export const initPersonnelWorkVisaDetails: initPersonnelWorkVisa = {
    current: []
}

export const emptyPersonnelWorkVisa = (ids?: number[]): PersonnelWorkVisa => {
    return {
        id: 0,
        tempId: generateNegativeNumber({ flat: ids }),
        personnelId: 0,
        documentNo: '',
        dateIssued: new Date(),
        dateEntry: new Date(),
        countryId: 0,
        dateExpiry: new Date(),
        dateRenewal: new Date(),
        isActive: false,
        fileName: '',
        fileSize: 0,
        image: '',
        imageType: '',
        remarks: '', 
        country: undefined,
    };
};

export const personnelWorkVisaReducer = createReducer (initPersonnelWorkVisaDetails, builder => 
    builder
        .addCase(addPersonnelWorkVisa, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removePersonnelWorkVisa, (state, action) => {
            if (action.payload.tempId !== undefined) {
                state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
            } else {
                state.current = state.current?.filter(x => x.id !== action.payload.id);
            }
        })
        .addCase(setPersonnelWorkVisa, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updatePersonnelWorkVisa, (state, action) => {
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

