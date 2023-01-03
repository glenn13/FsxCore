import { createReducer, createAction } from '@reduxjs/toolkit';

import _ from 'lodash';

export const addGeneralAssetRegistrationDetail = createAction<GeneralAssetRegistrationDetail>('ADD_GENERAL_ASSET_REGISTRATION_DETAIL');
export const removeGeneralAssetRegistrationDetail= createAction<GeneralAssetRegistrationDetail>('REMOVE_GENERAL_ASSET_REGISTRATION_DETAIL');
export const setGeneralAssetRegistrationDetail = createAction<GeneralAssetRegistrationDetail[]>('SET_GENERAL_ASSET_REGISTRATION_DETAIL');
export const updateGeneralAssetRegistrationDetail = createAction<GeneralAssetRegistrationDetail>('UPDATE_GENERAL_ASSET_REGISTRATION_DETAIL');

export interface IGeneralAssetRegistrationDetail {
    current?: GeneralAssetRegistrationDetail[];
}

export const initGeneralAssetRegistrationDetail: IGeneralAssetRegistrationDetail = {
    current: []
}

export const generalAssetRegistrationDetailReducer = createReducer(initGeneralAssetRegistrationDetail, builder =>
    builder
        .addCase(addGeneralAssetRegistrationDetail, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeGeneralAssetRegistrationDetail, (state, action) => {
            if (action.payload.tempId !== undefined) {
                state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
            } else {
                state.current = state.current?.filter(x => x.id !== action.payload.id);
            }
        })
        .addCase(setGeneralAssetRegistrationDetail, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updateGeneralAssetRegistrationDetail, (state, action) => {
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
