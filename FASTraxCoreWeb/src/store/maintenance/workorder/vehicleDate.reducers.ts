import { createReducer, createAction } from '@reduxjs/toolkit';
import WorkOrderVehicleDate from '@app/entities/maintenance/workorder/WorkOrderVehicleDate';

export const setWorkOrderVehicleDate = createAction<WorkOrderVehicleDate>('SET_WORK_ORDER_VEHICLE_DATE');

export const initWorkOrderVehicleDate = (): WorkOrderVehicleDate => ({
    id: 0,
    workOrderVehicleId: 0,
    dateClosed: new Date(),
    dateETC: new Date(),
    dateIssued: new Date(),
    dateReleased: new Date()
});

export const estimateVehicleDateReducer = createReducer(initWorkOrderVehicleDate(), builder =>
    builder.addCase(setWorkOrderVehicleDate, (_, action) => ({ ...action.payload }))
);
