import { createReducer, createAction } from '@reduxjs/toolkit';
import WorkOrderGeneralAssetDate from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetDate';

export const setWorkOrderGeneralAssetDate = createAction<WorkOrderGeneralAssetDate>('SET_WORK_ORDER_GENERAL_ASSET_DATE');

export const initWorkOrderGeneralAssetDate = (): WorkOrderGeneralAssetDate => ({
    id: 0,
    workOrderGeneralAssetId: 0,
    dateClosed: new Date(),
    dateETC: new Date(),
    dateIssued: new Date(),
    dateReleased: new Date()
});

export const estimateVehicleDateReducer = createReducer(initWorkOrderGeneralAssetDate(), builder =>
    builder.addCase(setWorkOrderGeneralAssetDate, (_, action) => ({ ...action.payload }))
);
