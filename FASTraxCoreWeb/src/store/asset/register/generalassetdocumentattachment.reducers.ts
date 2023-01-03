import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';

export const addGeneralAssetDocumentAttachment = createAction<GeneralAssetDocumentAttachment>('ADD_GENERAL_ASSET_DOCUMENT_ATTACHMENT');
export const removeGeneralAssetDocumentAttachment= createAction<GeneralAssetDocumentAttachment>('REMOVE_GENERAL_ASSET_DOCUMENT_ATTACHMENT');
export const setGeneralAssetDocumentAttachment = createAction<GeneralAssetDocumentAttachment[]>('SET_GENERAL_ASSET_DOCUMENT_ATTACHMENT');
export const updateGeneralAssetDocumentAttachment = createAction<GeneralAssetDocumentAttachment>('UPDATE_GENERAL_ASSET_DOCUMENT_ATTACHMENT');

export interface IGeneralAssetDocumentAttachment {
    current?: GeneralAssetDocumentAttachment[];
}

export const initGeneralAssetDocumentAttachment: IGeneralAssetDocumentAttachment = {
    current: []
}

export const generalAssetDocumentAttachmentReducer = createReducer(initGeneralAssetDocumentAttachment, builder =>
    builder
        .addCase(addGeneralAssetDocumentAttachment, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeGeneralAssetDocumentAttachment, (state, action) => {
            if (action.payload.tempId !== undefined) {
                state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
            } else {
                state.current = state.current?.filter(x => x.id !== action.payload.id);
            }
        })
        .addCase(setGeneralAssetDocumentAttachment, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updateGeneralAssetDocumentAttachment, (state, action) => {
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
