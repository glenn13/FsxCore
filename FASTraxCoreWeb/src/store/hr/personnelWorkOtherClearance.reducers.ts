import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import PersonnelWorkOtherClearance from '@app/entities/hr/PersonnelWorkOtherClearance';

export const addPersonnelWorkOtherClearance = createAction<PersonnelWorkOtherClearance>('ADD_PERSONNEL_WORK_OTHER_CLEARANCE');
export const setPersonnelWorkOtherClearance = createAction<PersonnelWorkOtherClearance[]>('SET_PERSONNEL_WORK_OTHER_CLEARANCE');
export const updatePersonnelWorkOtherClearance = createAction<PersonnelWorkOtherClearance>('UPDATE_PERSONNEL_WORK_OTHER_CLEARANCE');
export const removePersonnelWorkOtherClearance = createAction<PersonnelWorkOtherClearance>('REMOVE_PERSONNEL_WORK_OTHER_CLEARANCE');

export interface initPersonnelWorkOtherClearance {
    current?: PersonnelWorkOtherClearance[];
}

export const initPersonnelWorkOtherClearanceDetails: initPersonnelWorkOtherClearance = {
    current: []
}
// export const initPersonnelWorkOtherClearance: WorkOtherClearance[] = [];

export const emptyPersonnelWorkOtherClearance = (ids?: number[]): PersonnelWorkOtherClearance => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        personnelId: 0,
        documentName: '',
        documentNo: '',
        dateIssued: new Date(),
        countryId: 0,
        dateExpiry: new Date(),
        fileName: '',
        fileSize: 0,
        image: '',
        imageType: '',
        remarks: '',
        isActive: false,
        country: undefined,
    };
};

export const personnelWorkOtherClearanceReducer = createReducer (initPersonnelWorkOtherClearanceDetails, builder => 
    builder
        .addCase(addPersonnelWorkOtherClearance, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removePersonnelWorkOtherClearance, (state, action) => {
            if (action.payload.tempId !== undefined) {
                state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
            } else {
                state.current = state.current?.filter(x => x.id !== action.payload.id);
            }
        })
        .addCase(setPersonnelWorkOtherClearance, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updatePersonnelWorkOtherClearance, (state, action) => {
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
