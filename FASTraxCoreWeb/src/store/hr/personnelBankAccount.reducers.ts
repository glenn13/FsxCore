import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import PersonnelBankAccount from '@app/entities/hr/PersonnelBankAccount';

export const addPersonnelBankAccount = createAction<PersonnelBankAccount>('ADD_PERSONNEL_BANK_ACCOUNT');
export const setPersonnelBankAccount = createAction<PersonnelBankAccount[]>('SET_PERSONNEL_BANK_ACCOUNT');
export const updatePersonnelBankAccount = createAction<PersonnelBankAccount>('UPDATE_PERSONNEL_BANK_ACCOUNT');
export const removePersonnelBankAccount = createAction<PersonnelBankAccount>('REMOVE_PERSONNEL_BANK_ACCOUNT');

export interface initPersonnelBankAccount {
    current?: PersonnelBankAccount[];
}

export const initPersonnelBankAccountDetails: initPersonnelBankAccount = {
    current: []
}

export const emptyPersonnelBankAccount = (ids?: number[]): PersonnelBankAccount => {
    return {
        id: 0,
        tempId: generateNegativeNumber({ flat: ids }),
        personnelId: 0,
        accountHolderName: '',
        bankName: '',
        bankAddress: '',
        accountNumber: '',
        accountType: '',
        iban: '',
        swiftCode: '',
        countryId: 0,
        effectivityDate: new Date(),
        isPrimaryAccount: false,
        country: undefined
    };
};

export const personnelBankAccountReducer = createReducer (initPersonnelBankAccountDetails, builder => 
    builder
        .addCase(addPersonnelBankAccount, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removePersonnelBankAccount, (state, action) => {
            if (action.payload.tempId !== undefined) {
                state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
            } else {
                state.current = state.current?.filter(x => x.id !== action.payload.id);
            }
        })
        .addCase(setPersonnelBankAccount, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updatePersonnelBankAccount, (state, action) => {
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

