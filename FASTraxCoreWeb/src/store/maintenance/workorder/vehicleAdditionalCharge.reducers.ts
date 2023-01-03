import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import WorkOrderVehicleAdditionalCharge from '@app/entities/maintenance/workorder/WorkOrderVehicleAdditionalCharge';

export const addWorkOrderVehicleAdditionalCharge = createAction<WorkOrderVehicleAdditionalCharge>('ADD_WORK_ORDER_VEHICLE_ADDITIONAL_CHARGE');
export const removeWorkOrderVehicleAdditionalCharge = createAction<WorkOrderVehicleAdditionalCharge>('REMOVE_WORK_ORDER_VEHICLE_ADDITIONAL_CHARGE');
export const setWorkOrderVehicleAdditionalCharges = createAction<WorkOrderVehicleAdditionalCharge[]>('SET_WORK_ORDER_VEHICLE_ADDITIONAL_CHARGE');
export const updateWorkOrderVehicleAdditionalCharge = createAction<WorkOrderVehicleAdditionalCharge>('UPDATE_WORK_ORDER_VEHICLE_ADDITIONAL_CHARGE');

export const initWorkOrderVehicleAdditionalCharge: WorkOrderVehicleAdditionalCharge[] = [];

export const initSingWorkOrderVehicleAdditionalCharge = (ids?: number[]): WorkOrderVehicleAdditionalCharge => ({
    tempId: generateNegativeNumber({ flat: ids }),
    id: 0,
    workOrderVehicleId: 0,
    approvalStatusId: 0,
    description: '0',
    quantity: 0,
    remarks: '',
    salesPrice: 0,
    totalSalesPrice: 0,
    assetUOMId: 0
});

export const emptyWorkOrderVehicleAdditionalCharge = (ids?: number[]): WorkOrderVehicleAdditionalCharge => {
    return initSingWorkOrderVehicleAdditionalCharge(ids);
};

export const workOrderVehicleAdditionalChargeReducer = createReducer(initWorkOrderVehicleAdditionalCharge, builder =>
    builder
        .addCase(addWorkOrderVehicleAdditionalCharge, (state, action) => ([...state, action.payload]))
        .addCase(setWorkOrderVehicleAdditionalCharges, (_, action) => action.payload)
        .addCase(updateWorkOrderVehicleAdditionalCharge, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeWorkOrderVehicleAdditionalCharge, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);