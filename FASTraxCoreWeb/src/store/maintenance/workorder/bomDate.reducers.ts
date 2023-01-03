import { createReducer, createAction } from '@reduxjs/toolkit';
import WorkOrderBOMDate from '@app/entities/maintenance/workorder/WorkOrderBOMDate';

export const setWorkOrderBOMDate = createAction<WorkOrderBOMDate>('SET_WORK_ORDER_BOM_DATE');

export const initWorkOrderBOMDate = (): WorkOrderBOMDate => ({
    id: 0,
    workOrderBOMId: 0,
    dateClosed: new Date(),
    dateETC: new Date(),
    dateIssued: new Date(),
    dateReleased: new Date()
});

export const estimateBOMDateReducer = createReducer(initWorkOrderBOMDate(), builder =>
    builder.addCase(setWorkOrderBOMDate, (_, action) => ({ ...action.payload }))
);
