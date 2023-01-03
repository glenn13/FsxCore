import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import RepairOperationDetails from '@app/entities/maintenance/RepairOperationDetails';

export const addRepairOperationDetails = createAction<RepairOperationDetails>('ADD_REPAIR_OPERATION_DETAILS');
export const removeRepairOperationDetails = createAction<RepairOperationDetails>('REMOVE_REPAIR_OPERATION_DETAILS');
export const setRepairOperationDetails = createAction<RepairOperationDetails[]>('SET_REPAIR_OPERATION_DETAILS');
export const updateRepairOperationDetails = createAction<RepairOperationDetails>('UPDATE_REPAIR_OPERATION_DETAILS');

export const initRepairOperationDetails: RepairOperationDetails[] = [];

export const initSingRepairOperationDetails = (ids?: number[]): RepairOperationDetails => ({
    tempId: generateNegativeNumber({ flat: ids }),
    id: 0,
    repairOperationActionId: 0,
    repairOperationId: 0,
    repairGroupId: 0,
    repairSubGroupId: 0,
    repairOperationSRO: '',
    repairOperation: '',
    hours: 0,
    salesPrice: 0,
    serviceType: '',
    repairAction: '',
    repairLevel: '',
    checked: false,
    selected: false
});

export const emptyRepairOperationDetails = (ids?: number[]): RepairOperationDetails => {
    return initSingRepairOperationDetails(ids);
};

export const repairOperationDetailsReducer = createReducer(initRepairOperationDetails, builder =>
    builder
        .addCase(addRepairOperationDetails, (state, action) => ([...state, action.payload]))
        .addCase(setRepairOperationDetails, (_, action) => action.payload)
        .addCase(updateRepairOperationDetails, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeRepairOperationDetails, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);