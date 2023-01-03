import { createAction } from '@reduxjs/toolkit';
import WorkOrderGeneralAssetMobileService from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetMobileService';

export const setWorkOrderGeneralAssetMobileService = createAction<WorkOrderGeneralAssetMobileService>('SET_WORK_ORDER_GENERAL_ASSET_MOBILE_SERVICE');

export const initWorkOrderGeneralAssetMobileService = (): WorkOrderGeneralAssetMobileService => ({
    id: 0,
    workOrderGeneralAssetId: 0,
    dateCompleted: new Date(),
    dateReceived: new Date()
});
