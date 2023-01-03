import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import PersonnelWorkHistory from '@app/entities/hr/PersonnelWorkHistory';

export const addPersonnelWorkHistory = createAction<PersonnelWorkHistory>('ADD_PERSONNEL_WORK_HISTORY');
export const setPersonnelWorkHistory = createAction<PersonnelWorkHistory[]>('SET_PERSONNEL_WORK_HISTORY');
export const updatePersonnelWorkHistory = createAction<PersonnelWorkHistory>('UPDATE_PERSONNEL_WORK_HISTORY');
export const removePersonnelWorkHistory = createAction<PersonnelWorkHistory>('REMOVE_PERSONNEL_WORK_HISTORY');

export interface initPersonnelWorkHistory {
    current?: PersonnelWorkHistory[];
}

export const initPersonnelWorkHistoryDetails: initPersonnelWorkHistory = {
    current: []
}


export const personnelWorkHistoryReducer = createReducer (initPersonnelWorkHistoryDetails, builder => 
    builder
        .addCase(setPersonnelWorkHistory, (state, action) => {
            state.current = action.payload;
        })
); 
