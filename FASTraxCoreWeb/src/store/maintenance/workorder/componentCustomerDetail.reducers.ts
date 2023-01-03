import {createAction, createReducer} from '@reduxjs/toolkit';

import Customer from '@app/entities/crm/sales/Customer';
import WorkOrderComponentCustomerDetails from '@app/entities/maintenance/workorder/WorkOrderComponentCustomerDetails';

export const addWorkOrderComponentCustomerDetail = createAction<WorkOrderComponentCustomerDetails>(
  'ADD_WORK_ORDER_COMPONENT_CUSTOMER_DETAIL',
);
export const setWorkOrderComponentCustomerDetail = createAction<WorkOrderComponentCustomerDetails>(
  'SET_WORK_ORDER_COMPONENT_CUSTOMER_DETAIL',
);
export const updateWorkOrderComponentCustomerDetail = createAction<
  WorkOrderComponentCustomerDetails
>('UPDATE_WORK_ORDER_COMPONENT_CUSTOMER_DETAIL');

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

export const initWorkOrderComponentCustomerDetail = (): WorkOrderComponentCustomerDetails => ({
  id: 0,
  workOrderComponentId: 0,
  customer: initCustomer(),
  pocEmailAddress: '',
  pocMobileNumber: '',
  pointOfContactName: '',
});

export const workOrderComponentCustomerDetailReducer = createReducer(
  initWorkOrderComponentCustomerDetail(),
  builder =>
    builder.addCase(setWorkOrderComponentCustomerDetail, (_, action) => ({...action.payload})),
);
