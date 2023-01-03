import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import WorkOrderComponentLabour from '@app/entities/maintenance/workorder/WorkOrderComponentLabour';

export const addWorkOrderComponentLabour = createAction<WorkOrderComponentLabour>('ADD_WORK_ORDER_COMPONENT_LABOUR');
export const setWorkOrderComponentLabours = createAction<WorkOrderComponentLabour[]>('SET_WORK_ORDER_COMPONENT_LABOUR');
export const updateWorkOrderComponentLabour = createAction<WorkOrderComponentLabour>('UPDATE_WORK_ORDER_COMPONENT_LABOUR');
export const removeWorkOrderComponentLabour = createAction<WorkOrderComponentLabour>('REMOVE_WORK_ORDER_COMPONENT_LABOUR');

export const initWorkOrderComponentLabour: WorkOrderComponentLabour[] = [];

export const emptyWorkOrderComponentLabour = (ids?: number[]): WorkOrderComponentLabour => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        workOrderComponentId: 0,
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

export const workOrderComponentLabourReducer = createReducer(initWorkOrderComponentLabour, builder =>
    builder
        .addCase(addWorkOrderComponentLabour, (state, action) => ([...state, action.payload]))
        .addCase(setWorkOrderComponentLabours, (_, action) => action.payload)
        .addCase(updateWorkOrderComponentLabour, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeWorkOrderComponentLabour, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);