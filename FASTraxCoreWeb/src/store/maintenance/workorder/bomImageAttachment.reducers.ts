import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import WorkOrderBOMImageAttachment from '@app/entities/maintenance/workorder/WorkOrderBOMImageAttachment';

export const addWorkOrderBOMImageAttachment = createAction<WorkOrderBOMImageAttachment>('ADD_WORK_ORDER_BOM_IMAGE_ATTACHMENT');
export const setWorkOrderBOMImageAttachments = createAction<WorkOrderBOMImageAttachment[]>('SET_WORK_ORDER_BOM_IMAGE_ATTACHMENT');
export const updateWorkOrderBOMImageAttachment = createAction<WorkOrderBOMImageAttachment>('UPDATE_WORK_ORDER_BOM_IMAGE_ATTACHMENT');
export const removeWorkOrderBOMImageAttachment = createAction<WorkOrderBOMImageAttachment>('REMOVE_WORK_ORDER_BOM_IMAGE_ATTACHMENT');

export const initWorkOrderBOMImageAttachment: WorkOrderBOMImageAttachment[] = [];

export const emptyWorkOrderBOMImageAttachment = (ids?: number[]): WorkOrderBOMImageAttachment => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        workOrderBOMId: 0,
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

export const workOrderBOMImageAttachmentReducer = createReducer(initWorkOrderBOMImageAttachment, builder =>
    builder
        .addCase(setWorkOrderBOMImageAttachments, (_, action) => action.payload)
        .addCase(addWorkOrderBOMImageAttachment, (state, action) => {

            if (!action.payload.isDefault) return [...state, action.payload];

            const result: WorkOrderBOMImageAttachment[] = [];

            state.forEach(imageAttachment => result.push({ ...imageAttachment, isDefault: false }));

            result.push(action.payload);

            return result;
        })

        .addCase(updateWorkOrderBOMImageAttachment, (state, action) => {

            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeWorkOrderBOMImageAttachment, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);
