import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import PersonnelWorkPermit from '@app/entities/hr/PersonnelWorkPermit';

export const addPersonnelWorkPermit = createAction<PersonnelWorkPermit>('ADD_PERSONNEL_WORK_PERMIT');
export const setPersonnelWorkPermit = createAction<PersonnelWorkPermit[]>('SET_PERSONNEL_WORK_PERMIT');
export const updatePersonnelWorkPermit = createAction<PersonnelWorkPermit>('UPDATE_PERSONNEL_WORK_PERMIT');
export const removePersonnelWorkPermit = createAction<PersonnelWorkPermit>('REMOVE_PERSONNEL_WORK_PERMIT');

export interface initPersonnelWorkPermit {
    current?: PersonnelWorkPermit[];
}

export const initPersonnelWorkPermitDetails: initPersonnelWorkPermit = {
    current: []
}
// export const initPersonnelWorkPermit: PersonnelWorkPermit[] = [];

export const emptyPersonnelWorkPermit = (ids?: number[]): PersonnelWorkPermit => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,  
        personnelId: 0,
        documentNo: '',
        description: '',
        dateEntry: new Date(),
        countryId: 0,
        dateExpiry: new Date(),
        dateRenewal: new Date(),
        isActive: false,
        fileName: '',
        fileSize: 0,
        image: '',
        imageType: '', 
        country: undefined,
    };
};

export const personnelWorkPermitReducer = createReducer (initPersonnelWorkPermitDetails, builder => 
    builder
        .addCase(addPersonnelWorkPermit, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removePersonnelWorkPermit, (state, action) => {
            if (action.payload.tempId !== undefined) {
                state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
            } else {
                state.current = state.current?.filter(x => x.id !== action.payload.id);
            }
        })
        .addCase(setPersonnelWorkPermit, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updatePersonnelWorkPermit, (state, action) => {
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
