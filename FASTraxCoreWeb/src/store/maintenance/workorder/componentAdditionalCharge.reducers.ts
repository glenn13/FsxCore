import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import WorkOrderComponentAdditionalCharge from '@app/entities/maintenance/workorder/WorkOrderComponentAdditionalCharge';

export const addWorkOrderComponentAdditionalCharge = createAction<WorkOrderComponentAdditionalCharge>('ADD_WORK_ORDER_COMPONENT_ADDITIONAL_CHARGE');
export const removeWorkOrderComponentAdditionalCharge = createAction<WorkOrderComponentAdditionalCharge>('REMOVE_WORK_ORDER_COMPONENT_ADDITIONAL_CHARGE');
export const setWorkOrderComponentAdditionalCharges = createAction<WorkOrderComponentAdditionalCharge[]>('SET_WORK_ORDER_COMPONENT_ADDITIONAL_CHARGE');
export const updateWorkOrderComponentAdditionalCharge = createAction<WorkOrderComponentAdditionalCharge>('UPDATE_WORK_ORDER_COMPONENT_ADDITIONAL_CHARGE');

export const initWorkOrderComponentAdditionalCharge: WorkOrderComponentAdditionalCharge[] = [];

export const initSingWorkOrderComponentAdditionalCharge = (ids?: number[]): WorkOrderComponentAdditionalCharge => ({
    tempId: generateNegativeNumber({ flat: ids }),
    id: 0,
    workOrderComponentId: 0,
    approvalStatusId: 0,
    description: '',
    quantity: 0,
    remarks: '',
    salesPrice: 0,
    totalSalesPrice: 0,
    assetUOMId: 0
});

export const emptyWorkOrderComponentAdditionalCharge = (ids?: number[]): WorkOrderComponentAdditionalCharge => {
    return initSingWorkOrderComponentAdditionalCharge(ids);
};

export const workOrderComponentAdditionalChargeReducer = createReducer(initWorkOrderComponentAdditionalCharge, builder =>
    builder
        .addCase(addWorkOrderComponentAdditionalCharge, (state, action) => ([...state, action.payload]))
        .addCase(setWorkOrderComponentAdditionalCharges, (_, action) => action.payload)
        .addCase(updateWorkOrderComponentAdditionalCharge, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeWorkOrderComponentAdditionalCharge, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);