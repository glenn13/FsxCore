import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import WorkOrderGeneralAssetDocumentAttachment from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetDocumentAttachment';

export const addWorkOrderGeneralAssetDocumentAttachment = createAction<WorkOrderGeneralAssetDocumentAttachment>('ADD_WORK_ORDER_GENERAL_ASSET_DOCUMENT_ATTACHMENT');
export const removeWorkOrderGeneralAssetDocumentAttachment = createAction<WorkOrderGeneralAssetDocumentAttachment>('REMOVE_WORK_ORDER_GENERAL_ASSET_DOCUMENT_ATTACHMENT');
export const setWorkOrderGeneralAssetDocumentAttachments = createAction<WorkOrderGeneralAssetDocumentAttachment[]>('SET_WORK_ORDER_GENERAL_ASSET_DOCUMENT_ATTACHMENT');
export const updateWorkOrderGeneralAssetDocumentAttachment = createAction<WorkOrderGeneralAssetDocumentAttachment>('UPDATE_WORK_ORDER_GENERAL_ASSET_DOCUMENT_ATTACHMENT');

export const initWorkOrderGeneralAssetDocumentAttachment: WorkOrderGeneralAssetDocumentAttachment[] = [];

export const emptyWorkOrderGeneralAssetDocumentAttachment = (ids?: number[]): WorkOrderGeneralAssetDocumentAttachment => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        workOrderGeneralAssetId: 0,
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

export const workOrderGeneralAssetDocumentAttachmentReducer = createReducer(initWorkOrderGeneralAssetDocumentAttachment, builder =>
    builder
        .addCase(setWorkOrderGeneralAssetDocumentAttachments, (_, action) => action.payload)
        .addCase(addWorkOrderGeneralAssetDocumentAttachment, (state, action) => ([...state, action.payload]))
        .addCase(updateWorkOrderGeneralAssetDocumentAttachment, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeWorkOrderGeneralAssetDocumentAttachment, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);