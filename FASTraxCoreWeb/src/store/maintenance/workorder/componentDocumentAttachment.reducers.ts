import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import WorkOrderComponentDocumentAttachment from '@app/entities/maintenance/workorder/WorkOrderComponentDocumentAttachment';

export const addWorkOrderComponentDocumentAttachment = createAction<WorkOrderComponentDocumentAttachment>('ADD_WORK_ORDER_COMPONENT_DOCUMENT_ATTACHMENT');
export const removeWorkOrderComponentDocumentAttachment = createAction<WorkOrderComponentDocumentAttachment>('REMOVE_WORK_ORDER_COMPONENT_DOCUMENT_ATTACHMENT');
export const setWorkOrderComponentDocumentAttachments = createAction<WorkOrderComponentDocumentAttachment[]>('SET_WORK_ORDER_COMPONENT_DOCUMENT_ATTACHMENT');
export const updateWorkOrderComponentDocumentAttachment = createAction<WorkOrderComponentDocumentAttachment>('UPDATE_WORK_ORDER_COMPONENT_DOCUMENT_ATTACHMENT');

export const initWorkOrderComponentDocumentAttachment: WorkOrderComponentDocumentAttachment[] = [];

export const emptyWorkOrderComponentDocumentAttachment = (ids?: number[]): WorkOrderComponentDocumentAttachment => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        workOrderComponentId: 0,
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

export const workOrderComponentDocumentAttachmentReducer = createReducer(initWorkOrderComponentDocumentAttachment, builder =>
    builder
        .addCase(setWorkOrderComponentDocumentAttachments, (_, action) => action.payload)
        .addCase(addWorkOrderComponentDocumentAttachment, (state, action) => ([...state, action.payload]))
        .addCase(updateWorkOrderComponentDocumentAttachment, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeWorkOrderComponentDocumentAttachment, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);