import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import WorkOrderBOMAdditionalCharge from '@app/entities/maintenance/workorder/WorkOrderBOMAdditionalCharge';

export const addWorkOrderBOMAdditionalCharge = createAction<WorkOrderBOMAdditionalCharge>('ADD_WORK_ORDER_BOM_ADDITIONAL_CHARGE');
export const removeWorkOrderBOMAdditionalCharge = createAction<WorkOrderBOMAdditionalCharge>('REMOVE_WORK_ORDER_BOM_ADDITIONAL_CHARGE');
export const setWorkOrderBOMAdditionalCharges = createAction<WorkOrderBOMAdditionalCharge[]>('SET_WORK_ORDER_BOM_ADDITIONAL_CHARGE');
export const updateWorkOrderBOMAdditionalCharge = createAction<WorkOrderBOMAdditionalCharge>('UPDATE_WORK_ORDER_BOM_ADDITIONAL_CHARGE');

export const initWorkOrderBOMAdditionalCharge: WorkOrderBOMAdditionalCharge[] = [];

export const initSingWorkOrderBOMAdditionalCharge = (ids?: number[]): WorkOrderBOMAdditionalCharge => ({
    tempId: generateNegativeNumber({ flat: ids }),
    id: 0,
    workOrderBOMId: 0,
    approvalStatusId: 1,
    description: 'Test Description',
    quantity: 4,
    remarks: 'Test Remakrs',
    salesPrice: 5,
    totalSalesPrice: 20,
    assetUOMId: 1
});

export const emptyWorkOrderBOMAdditionalCharge = (ids?: number[]): WorkOrderBOMAdditionalCharge => {
    return initSingWorkOrderBOMAdditionalCharge(ids);
};

export const workOrderBOMAdditionalChargeReducer = createReducer(initWorkOrderBOMAdditionalCharge, builder =>
    builder
        .addCase(addWorkOrderBOMAdditionalCharge, (state, action) => ([...state, action.payload]))
        .addCase(setWorkOrderBOMAdditionalCharges, (_, action) => action.payload)
        .addCase(updateWorkOrderBOMAdditionalCharge, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeWorkOrderBOMAdditionalCharge, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);