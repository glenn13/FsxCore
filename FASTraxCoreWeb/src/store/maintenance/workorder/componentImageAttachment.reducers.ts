import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import WorkOrderComponentImageAttachment from '@app/entities/maintenance/workorder/WorkOrderComponentImageAttachment';

export const addWorkOrderComponentImageAttachment = createAction<WorkOrderComponentImageAttachment>('ADD_WORK_ORDER_COMPONENT_IMAGE_ATTACHMENT');
export const setWorkOrderComponentImageAttachments = createAction<WorkOrderComponentImageAttachment[]>('SET_WORK_ORDER_COMPONENT_IMAGE_ATTACHMENT');
export const updateWorkOrderComponentImageAttachment = createAction<WorkOrderComponentImageAttachment>('UPDATE_WORK_ORDER_COMPONENT_IMAGE_ATTACHMENT');
export const removeWorkOrderComponentImageAttachment = createAction<WorkOrderComponentImageAttachment>('REMOVE_WORK_ORDER_COMPONENT_IMAGE_ATTACHMENT');

export const initWorkOrderComponentImageAttachment: WorkOrderComponentImageAttachment[] = [];

export const emptyWorkOrderComponentImageAttachment = (ids?: number[]): WorkOrderComponentImageAttachment => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        workOrderComponentId: 0,
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

export const workOrderComponentImageAttachmentReducer = createReducer(initWorkOrderComponentImageAttachment, builder =>
    builder
        .addCase(setWorkOrderComponentImageAttachments, (_, action) => action.payload)
        .addCase(addWorkOrderComponentImageAttachment, (state, action) => {

            if (!action.payload.isDefault) return [...state, action.payload];

            const result: WorkOrderComponentImageAttachment[] = [];

            state.forEach(imageAttachment => result.push({ ...imageAttachment, isDefault: false }));

            result.push(action.payload);

            return result;
        })
        .addCase(updateWorkOrderComponentImageAttachment, (state, action) => {

            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeWorkOrderComponentImageAttachment, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);
