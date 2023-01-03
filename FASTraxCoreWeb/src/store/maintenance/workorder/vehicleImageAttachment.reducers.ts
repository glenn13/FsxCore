import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import WorkOrderVehicleImageAttachment from '@app/entities/maintenance/workorder/WorkOrderVehicleImageAttachment';

export const addWorkOrderVehicleImageAttachment = createAction<WorkOrderVehicleImageAttachment>('ADD_WORK_ORDER_VEHICLE_IMAGE_ATTACHMENT');
export const setWorkOrderVehicleImageAttachments = createAction<WorkOrderVehicleImageAttachment[]>('SET_WORK_ORDER_VEHICLE_IMAGE_ATTACHMENT');
export const updateWorkOrderVehicleImageAttachment = createAction<WorkOrderVehicleImageAttachment>('UPDATE_WORK_ORDER_VEHICLE_IMAGE_ATTACHMENT');
export const removeWorkOrderVehicleImageAttachment = createAction<WorkOrderVehicleImageAttachment>('REMOVE_WORK_ORDER_VEHICLE_IMAGE_ATTACHMENT');

export const initWorkOrderVehicleImageAttachment: WorkOrderVehicleImageAttachment[] = [];

export const emptyWorkOrderVehicleImageAttachment = (ids?: number[]): WorkOrderVehicleImageAttachment => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        workOrderVehicleId: 0,
        createdById: 0,
        dateUploaded: new Date(),
        fileName: '',
        fileSize: 0,
        image: '',
        imageType: '',
        isDefault: false,
        isPrintable: false,
        remarks: ''
    };
};

export const workOrderVehicleImageAttachmentReducer = createReducer(initWorkOrderVehicleImageAttachment, builder =>
    builder
        .addCase(setWorkOrderVehicleImageAttachments, (_, action) => action.payload)
        .addCase(addWorkOrderVehicleImageAttachment, (state, action) => {

            if (!action.payload.isDefault) return [...state, action.payload];

            const result: WorkOrderVehicleImageAttachment[] = [];

            state.forEach(imageAttachment => result.push({ ...imageAttachment, isDefault: false }));

            result.push(action.payload);

            return result;
        })

        .addCase(updateWorkOrderVehicleImageAttachment, (state, action) => {

            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeWorkOrderVehicleImageAttachment, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);
