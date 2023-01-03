import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import WorkOrderBOMDocumentAttachment from '@app/entities/maintenance/workorder/WorkOrderBOMDocumentAttachment';

export const addWorkOrderBOMDocumentAttachment = createAction<WorkOrderBOMDocumentAttachment>('ADD_WORK_ORDER_BOM_DOCUMENT_ATTACHMENT');
export const removeWorkOrderBOMDocumentAttachment = createAction<WorkOrderBOMDocumentAttachment>('REMOVE_WORK_ORDER_BOM_DOCUMENT_ATTACHMENT');
export const setWorkOrderBOMDocumentAttachments = createAction<WorkOrderBOMDocumentAttachment[]>('SET_WORK_ORDER_BOM_DOCUMENT_ATTACHMENT');
export const updateWorkOrderBOMDocumentAttachment = createAction<WorkOrderBOMDocumentAttachment>('UPDATE_WORK_ORDER_BOM_DOCUMENT_ATTACHMENT');

export const initWorkOrderBOMDocumentAttachment: WorkOrderBOMDocumentAttachment[] = [];

export const emptyWorkOrderBOMDocumentAttachment = (ids?: number[]): WorkOrderBOMDocumentAttachment => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        workOrderBOMId: 0,
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

export const workOrderBOMDocumentAttachmentReducer = createReducer(initWorkOrderBOMDocumentAttachment, builder =>
    builder
        .addCase(setWorkOrderBOMDocumentAttachments, (_, action) => action.payload)
        .addCase(addWorkOrderBOMDocumentAttachment, (state, action) => ([...state, action.payload]))
        .addCase(updateWorkOrderBOMDocumentAttachment, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeWorkOrderBOMDocumentAttachment, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);