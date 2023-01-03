import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import WorkOrderBOMLabour from '@app/entities/maintenance/workorder/WorkOrderBOMLabour';

export const addWorkOrderBOMLabour = createAction<WorkOrderBOMLabour>('ADD_WORK_ORDER_BOM_LABOUR');
export const setWorkOrderBOMLabours = createAction<WorkOrderBOMLabour[]>('SET_WORK_ORDER_BOM_LABOUR');
export const updateWorkOrderBOMLabour = createAction<WorkOrderBOMLabour>('UPDATE_WORK_ORDER_BOM_LABOUR');
export const removeWorkOrderBOMLabour = createAction<WorkOrderBOMLabour>('REMOVE_WORK_ORDER_BOM_LABOUR');

export const initWorkOrderBOMLabour: WorkOrderBOMLabour[] = [];

export const emptyWorkOrderBOMLabour = (ids?: number[]): WorkOrderBOMLabour => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        workOrderBOMId: 0,
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

export const workOrderBOMLabourReducer = createReducer(initWorkOrderBOMLabour, builder =>
    builder
        .addCase(addWorkOrderBOMLabour, (state, action) => ([...state, action.payload]))
        .addCase(setWorkOrderBOMLabours, (_, action) => action.payload)
        .addCase(updateWorkOrderBOMLabour, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeWorkOrderBOMLabour, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);