import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import WorkOrderGeneralAssetLabour from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetLabour';

export const addWorkOrderGeneralAssetLabour = createAction<WorkOrderGeneralAssetLabour>('ADD_WORK_ORDER_GENERAL_ASSET_LABOUR');
export const setWorkOrderGeneralAssetLabours = createAction<WorkOrderGeneralAssetLabour[]>('SET_WORK_ORDER_GENERAL_ASSET_LABOUR');
export const updateWorkOrderGeneralAssetLabour = createAction<WorkOrderGeneralAssetLabour>('UPDATE_WORK_ORDER_GENERAL_ASSET_LABOUR');
export const removeWorkOrderGeneralAssetLabour = createAction<WorkOrderGeneralAssetLabour>('REMOVE_WORK_ORDER_GENERAL_ASSET_LABOUR');

export const initWorkOrderGeneralAssetLabour: WorkOrderGeneralAssetLabour[] = [];

export const emptyWorkOrderGeneralAssetLabour = (ids?: number[]): WorkOrderGeneralAssetLabour => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        workOrderGeneralAssetId: 0,
        datePerformed: new Date(),
        hour: 0,
        isOJT: false,
        isReWork: false,
        maintenanceDepartmentId: 0,
        remarks: '',
        serviceCode: '',
        timeIn: new Date(),
        timeOut: new Date()
    };
};

export const workOrderGeneralAssetLabourReducer = createReducer(initWorkOrderGeneralAssetLabour, builder =>
    builder
        .addCase(addWorkOrderGeneralAssetLabour, (state, action) => ([...state, action.payload]))
        .addCase(setWorkOrderGeneralAssetLabours, (_, action) => action.payload)
        .addCase(updateWorkOrderGeneralAssetLabour, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeWorkOrderGeneralAssetLabour, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);