import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import EstimateComponentDocumentAttachment from '@app/entities/maintenance/estimate/EstimateComponentDocumentAttachment';

export const addEstimateComponentDocumentAttachment = createAction<EstimateComponentDocumentAttachment>('ADD_ESTIMATE_COMPONENT_DOCUMENT_ATTACHMENT');
export const removeEstimateComponentDocumentAttachment = createAction<EstimateComponentDocumentAttachment>('REMOVE_ESTIMATE_COMPONENT_DOCUMENT_ATTACHMENT');
export const setEstimateComponentDocumentAttachments = createAction<EstimateComponentDocumentAttachment[]>('SET_ESTIMATE_COMPONENT_DOCUMENT_ATTACHMENT');
export const updateEstimateComponentDocumentAttachment = createAction<EstimateComponentDocumentAttachment>('UPDATE_ESTIMATE_COMPONENT_DOCUMENT_ATTACHMENT');

export const initEstimateComponentDocumentAttachment: EstimateComponentDocumentAttachment[] = [];

export const emptyEstimateComponentDocumentAttachment = (ids?: number[]): EstimateComponentDocumentAttachment => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        estimateComponentId: 0,
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

export const estimateComponentDocumentAttachmentReducer = createReducer(initEstimateComponentDocumentAttachment, builder =>
    builder
        .addCase(setEstimateComponentDocumentAttachments, (_, action) => action.payload)
        .addCase(addEstimateComponentDocumentAttachment, (state, action) => ([...state, action.payload]))
        .addCase(updateEstimateComponentDocumentAttachment, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeEstimateComponentDocumentAttachment, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);