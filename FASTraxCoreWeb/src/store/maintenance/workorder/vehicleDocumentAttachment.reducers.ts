import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import WorkOrderVehicleDocumentAttachment from '@app/entities/maintenance/workorder/WorkOrderVehicleDocumentAttachment';

export const addWorkOrderVehicleDocumentAttachment = createAction<WorkOrderVehicleDocumentAttachment>('ADD_WORK_ORDER_VEHICLE_DOCUMENT_ATTACHMENT');
export const removeWorkOrderVehicleDocumentAttachment = createAction<WorkOrderVehicleDocumentAttachment>('REMOVE_WORK_ORDER_VEHICLE_DOCUMENT_ATTACHMENT');
export const setWorkOrderVehicleDocumentAttachments = createAction<WorkOrderVehicleDocumentAttachment[]>('SET_WORK_ORDER_VEHICLE_DOCUMENT_ATTACHMENT');
export const updateWorkOrderVehicleDocumentAttachment = createAction<WorkOrderVehicleDocumentAttachment>('UPDATE_WORK_ORDER_VEHICLE_DOCUMENT_ATTACHMENT');

export const initWorkOrderVehicleDocumentAttachment: WorkOrderVehicleDocumentAttachment[] = [];

export const emptyWorkOrderVehicleDocumentAttachment = (ids?: number[]): WorkOrderVehicleDocumentAttachment => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        workOrderVehicleId: 0,
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

export const workOrderVehicleDocumentAttachmentReducer = createReducer(initWorkOrderVehicleDocumentAttachment, builder =>
    builder
        .addCase(setWorkOrderVehicleDocumentAttachments, (_, action) => action.payload)
        .addCase(addWorkOrderVehicleDocumentAttachment, (state, action) => ([...state, action.payload]))
        .addCase(updateWorkOrderVehicleDocumentAttachment, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeWorkOrderVehicleDocumentAttachment, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);