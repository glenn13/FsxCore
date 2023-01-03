import {createAction, createReducer} from '@reduxjs/toolkit';

import Customer from '@app/entities/crm/sales/Customer';
import WorkOrderVehicleCustomerDetails from '@app/entities/maintenance/workorder/WorkOrderVehicleCustomerDetails';

export const addWorkOrderVehicleCustomerDetail = createAction<WorkOrderVehicleCustomerDetails>(
  'ADD_WORK_ORDER_VEHICLE_CUSTOMER_DETAIL',
);
export const setWorkOrderVehicleCustomerDetail = createAction<WorkOrderVehicleCustomerDetails>(
  'SET_WORK_ORDER_VEHICLE_CUSTOMER_DETAIL',
);
export const updateWorkOrderVehicleCustomerDetail = createAction<WorkOrderVehicleCustomerDetails>(
  'UPDATE_WORK_ORDER_VEHICLE_CUSTOMER_DETAIL',
);

const initCustomer = (): Customer => ({
  id: 0,
  code: '',
  name: '',
  address: '',
  contactName: '',
  contactNo: '',
  customerTypeId: 0,
  websiteUrl: '',
});

export const initWorkOrderVehicleCustomerDetail = (): WorkOrderVehicleCustomerDetails => ({
  id: 0,
  workOrderVehicleId: 0,
  customer: initCustomer(),
  pocEmailAddress: '',
  pocMobileNumber: '',
  pointOfContactName: '',
});

export const workOrderVehicleCustomerDetailReducer = createReducer(
  initWorkOrderVehicleCustomerDetail(),
  builder =>
    builder.addCase(setWorkOrderVehicleCustomerDetail, (_, action) => ({...action.payload})),
);
