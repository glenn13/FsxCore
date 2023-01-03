import { createAction } from '@reduxjs/toolkit';
import WorkOrderComponentMobileService from '@app/entities/maintenance/workorder/WorkOrderComponentMobileService';

export const setWorkOrderComponentMobileService = createAction<WorkOrderComponentMobileService>('SET_WORK_ORDER_COMPONENT_MOBILE_SERVICE');

export const initWorkOrderComponentMobileService = (): WorkOrderComponentMobileService => ({
    id: 0,
    workOrderComponentId: 0,
    dateCompleted: new Date(),
    dateReceived: new Date()
});
