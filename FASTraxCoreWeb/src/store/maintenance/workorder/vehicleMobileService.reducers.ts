import { createAction } from '@reduxjs/toolkit';
import WorkOrderVehicleMobileService from '@app/entities/maintenance/workorder/WorkOrderVehicleMobileService';

export const setWorkOrderVehicleMobileService = createAction<WorkOrderVehicleMobileService>('SET_WORK_ORDER_VEHICLE_MOBILE_SERVICE');

export const initWorkOrderVehicleMobileService = (): WorkOrderVehicleMobileService => ({
    id: 0,
    workOrderVehicleId: 0,
    dateCompleted: new Date(),
    dateReceived: new Date()
});
