import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import WorkOrderGeneralAssetImageAttachment from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetImageAttachment';

export const addWorkOrderGeneralAssetImageAttachment = createAction<WorkOrderGeneralAssetImageAttachment>('ADD_WORK_ORDER_GENERAL_ASSET_IMAGE_ATTACHMENT');
export const setWorkOrderGeneralAssetImageAttachments = createAction<WorkOrderGeneralAssetImageAttachment[]>('SET_WORK_ORDER_GENERAL_ASSET_IMAGE_ATTACHMENT');
export const updateWorkOrderGeneralAssetImageAttachment = createAction<WorkOrderGeneralAssetImageAttachment>('UPDATE_WORK_ORDER_GENERAL_ASSET_IMAGE_ATTACHMENT');
export const removeWorkOrderGeneralAssetImageAttachment = createAction<WorkOrderGeneralAssetImageAttachment>('REMOVE_WORK_ORDER_GENERAL_ASSET_IMAGE_ATTACHMENT');

export const initWorkOrderGeneralAssetImageAttachment: WorkOrderGeneralAssetImageAttachment[] = [];

export const emptyWorkOrderGeneralAssetImageAttachment = (ids?: number[]): WorkOrderGeneralAssetImageAttachment => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        workOrderGeneralAssetId: 0,
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

export const workOrderGeneralAssetImageAttachmentReducer = createReducer(initWorkOrderGeneralAssetImageAttachment, builder =>
    builder
        .addCase(setWorkOrderGeneralAssetImageAttachments, (_, action) => action.payload)
        .addCase(addWorkOrderGeneralAssetImageAttachment, (state, action) => {

            if (!action.payload.isDefault) return [...state, action.payload];

            const result: WorkOrderGeneralAssetImageAttachment[] = [];

            state.forEach(imageAttachment => result.push({ ...imageAttachment, isDefault: false }));

            result.push(action.payload);

            return result;
        })
        .addCase(updateWorkOrderGeneralAssetImageAttachment, (state, action) => {

            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeWorkOrderGeneralAssetImageAttachment, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);
