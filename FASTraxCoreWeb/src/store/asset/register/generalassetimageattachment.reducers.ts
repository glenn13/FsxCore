import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';

export const addGeneralAssetImageAttachment = createAction<GeneralAssetImageAttachment>('ADD_GENERAL_ASSET_IMAGE_ATTACHMENT');
export const removeGeneralAssetImageAttachment= createAction<GeneralAssetImageAttachment>('REMOVE_GENERAL_ASSET_IMAGE_ATTACHMENT');
export const setGeneralAssetImageAttachment = createAction<GeneralAssetImageAttachment[]>('SET_GENERAL_ASSET_IMAGE_ATTACHMENT');
export const updateGeneralAssetImageAttachment = createAction<GeneralAssetImageAttachment>('UPDATE_GENERAL_ASSET_IMAGE_ATTACHMENT');

export interface IGeneralAssetImageAttachment {
    current?: GeneralAssetImageAttachment[];
}

export const initGeneralAssetImageAttachment: IGeneralAssetImageAttachment = {
    current: []
}

export const generalAssetImageAttachmentReducer = createReducer(initGeneralAssetImageAttachment, builder =>
    builder
        .addCase(addGeneralAssetImageAttachment, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeGeneralAssetImageAttachment, (state, action) => {
            if (action.payload.tempId !== undefined) {
                state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
            } else {
                state.current = state.current?.filter(x => x.id !== action.payload.id);
            }
        })
        .addCase(setGeneralAssetImageAttachment, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updateGeneralAssetImageAttachment, (state, action) => {
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
