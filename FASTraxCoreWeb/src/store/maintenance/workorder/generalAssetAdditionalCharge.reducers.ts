import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import WorkOrderGeneralAssetAdditionalCharge from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetAdditionalCharge';

export const addWorkOrderGeneralAssetAdditionalCharge = createAction<WorkOrderGeneralAssetAdditionalCharge>('ADD_WORK_ORDER_GENERAL_ASSET_ADDITIONAL_CHARGE');
export const removeWorkOrderGeneralAssetAdditionalCharge = createAction<WorkOrderGeneralAssetAdditionalCharge>('REMOVE_WORK_ORDER_GENERAL_ASSET_ADDITIONAL_CHARGE');
export const setWorkOrderGeneralAssetAdditionalCharges = createAction<WorkOrderGeneralAssetAdditionalCharge[]>('SET_WORK_ORDER_GENERAL_ASSET_ADDITIONAL_CHARGE');
export const updateWorkOrderGeneralAssetAdditionalCharge = createAction<WorkOrderGeneralAssetAdditionalCharge>('UPDATE_WORK_ORDER_GENERAL_ASSET_ADDITIONAL_CHARGE');

export const initWorkOrderGeneralAssetAdditionalCharge: WorkOrderGeneralAssetAdditionalCharge[] = [];

export const initSingWorkOrderGeneralAssetAdditionalCharge = (ids?: number[]): WorkOrderGeneralAssetAdditionalCharge => ({
    tempId: generateNegativeNumber({ flat: ids }),
    id: 0,
    workOrderGeneralAssetId: 0,
    approvalStatusId: 0,
    description: '',
    quantity: 0,
    remarks: '',
    salesPrice: 0,
    totalSalesPrice: 0,
    assetUOMId: 0
});

export const emptyWorkOrderGeneralAssetAdditionalCharge = (ids?: number[]): WorkOrderGeneralAssetAdditionalCharge => {
    return initSingWorkOrderGeneralAssetAdditionalCharge(ids);
};

export const workOrderGeneralAssetAdditionalChargeReducer = createReducer(initWorkOrderGeneralAssetAdditionalCharge, builder =>
    builder
        .addCase(addWorkOrderGeneralAssetAdditionalCharge, (state, action) => ([...state, action.payload]))
        .addCase(setWorkOrderGeneralAssetAdditionalCharges, (_, action) => action.payload)
        .addCase(updateWorkOrderGeneralAssetAdditionalCharge, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeWorkOrderGeneralAssetAdditionalCharge, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);