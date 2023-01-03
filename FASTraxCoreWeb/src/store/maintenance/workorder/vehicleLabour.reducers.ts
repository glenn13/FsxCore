import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import WorkOrderVehicleLabour from '@app/entities/maintenance/workorder/WorkOrderVehicleLabour';

export const addWorkOrderVehicleLabour = createAction<WorkOrderVehicleLabour>('ADD_WORK_ORDER_VEHICLE_LABOUR');
export const setWorkOrderVehicleLabours = createAction<WorkOrderVehicleLabour[]>('SET_WORK_ORDER_VEHICLE_LABOUR');
export const updateWorkOrderVehicleLabour = createAction<WorkOrderVehicleLabour>('UPDATE_WORK_ORDER_VEHICLE_LABOUR');
export const removeWorkOrderVehicleLabour = createAction<WorkOrderVehicleLabour>('REMOVE_WORK_ORDER_VEHICLE_LABOUR');

export const initWorkOrderVehicleLabour: WorkOrderVehicleLabour[] = [];

export const emptyWorkOrderVehicleLabour = (ids?: number[]): WorkOrderVehicleLabour => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        workOrderVehicleId: 0,
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

export const workOrderVehicleLabourReducer = createReducer(initWorkOrderVehicleLabour, builder =>
    builder
        .addCase(addWorkOrderVehicleLabour, (state, action) => ([...state, action.payload]))
        .addCase(setWorkOrderVehicleLabours, (_, action) => action.payload)
        .addCase(updateWorkOrderVehicleLabour, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeWorkOrderVehicleLabour, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);