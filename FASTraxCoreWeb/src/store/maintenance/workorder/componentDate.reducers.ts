import { createReducer, createAction } from '@reduxjs/toolkit';
import WorkOrderComponentDate from '@app/entities/maintenance/workorder/WorkOrderComponentDate';

export const setWorkOrderComponentDate = createAction<WorkOrderComponentDate>('SET_WORK_ORDER_COMPONENT_DATE');

export const initWorkOrderComponentDate = (): WorkOrderComponentDate => ({
    id: 0,
    workOrderComponentId: 0,
    dateClosed: new Date(),
    dateETC: new Date(),
    dateIssued: new Date(),
    dateReleased: new Date()
});

export const estimateVehicleDateReducer = createReducer(initWorkOrderComponentDate(), builder =>
    builder.addCase(setWorkOrderComponentDate, (_, action) => ({ ...action.payload }))
);
