import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import EstimateGeneralAssetDocumentAttachment from '@app/entities/maintenance/estimate/EstimateGeneralAssetDocumentAttachment';

export const addEstimateGeneralAssetDocumentAttachment = createAction<EstimateGeneralAssetDocumentAttachment>('ADD_ESTIMATE_GENERAL_ASSET_DOCUMENT_ATTACHMENT');
export const removeEstimateGeneralAssetDocumentAttachment = createAction<EstimateGeneralAssetDocumentAttachment>('REMOVE_ESTIMATE_GENERAL_ASSET_DOCUMENT_ATTACHMENT');
export const setEstimateGeneralAssetDocumentAttachments = createAction<EstimateGeneralAssetDocumentAttachment[]>('SET_ESTIMATE_GENERAL_ASSET_DOCUMENT_ATTACHMENT');
export const updateEstimateGeneralAssetDocumentAttachment = createAction<EstimateGeneralAssetDocumentAttachment>('UPDATE_ESTIMATE_GENERAL_ASSET_DOCUMENT_ATTACHMENT');

export const initEstimateGeneralAssetDocumentAttachment: EstimateGeneralAssetDocumentAttachment[] = [];

export const emptyEstimateGeneralAssetDocumentAttachment = (ids?: number[]): EstimateGeneralAssetDocumentAttachment => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        estimateGeneralAssetId: 0,
        action: '',
        createdById: 0,
        dateUploaded: new Date(),
        file: '',
        fileName: '',
        fileSize: 0,
        fileType: '',
        remarks: ''
    };
};

export const estimateGeneralAssetDocumentAttachmentReducer = createReducer(initEstimateGeneralAssetDocumentAttachment, builder =>
    builder
        .addCase(setEstimateGeneralAssetDocumentAttachments, (_, action) => action.payload)
        .addCase(addEstimateGeneralAssetDocumentAttachment, (state, action) => ([...state, action.payload]))
        .addCase(updateEstimateGeneralAssetDocumentAttachment, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeEstimateGeneralAssetDocumentAttachment, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);