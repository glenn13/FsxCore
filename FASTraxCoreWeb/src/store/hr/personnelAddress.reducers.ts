import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import PersonnelAddress from '@app/entities/hr/PersonnelAddress';

export const addPersonnelAddress = createAction<PersonnelAddress>('ADD_PERSONNEL_ADDRESS');
export const setPersonnelAddress = createAction<PersonnelAddress[]>('SET_PERSONNEL_ADDRESS');
export const updatePersonnelAddress = createAction<PersonnelAddress>('UPDATE_PERSONNEL_ADDRESS');
export const removePersonnelAddress = createAction<PersonnelAddress>('REMOVE_PERSONNEL_ADDRESS');

export interface initPersonnelAddress {
    current?: PersonnelAddress[];
}

export const initPersonnelAddressDetails: initPersonnelAddress = {
    current: []
}

export const emptyPersonnelAddress = (ids?: number[]): PersonnelAddress => {
    return {
        id: 0,
        tempId: generateNegativeNumber({ flat: ids }),
        personnelId: 0,
        address: '',
        city: '',
        countryId: 0,
        zipCode: '',
        country: undefined,
    };
};

export const personnelAddressReducer = createReducer (initPersonnelAddressDetails, builder => 
    builder
        .addCase(addPersonnelAddress, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removePersonnelAddress, (state, action) => {
            if (action.payload.tempId !== undefined) {
                state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
            } else {
                state.current = state.current?.filter(x => x.id !== action.payload.id);
            }
        })
        .addCase(setPersonnelAddress, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updatePersonnelAddress, (state, action) => {
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

