import {createAction, createReducer} from '@reduxjs/toolkit';

import Customer from '@app/entities/crm/sales/Customer';
import WorkOrderBOMCustomerDetails from '@app/entities/maintenance/workorder/WorkOrderBOMCustomerDetails';

export const addWorkOrderBOMCustomerDetail = createAction<WorkOrderBOMCustomerDetails>(
  'ADD_WORK_ORDER_BOM_CUSTOMER_DETAIL',
);
export const setWorkOrderBOMCustomerDetail = createAction<WorkOrderBOMCustomerDetails>(
  'SET_WORK_ORDER_BOM_CUSTOMER_DETAIL',
);
export const updateWorkOrderBOMCustomerDetail = createAction<WorkOrderBOMCustomerDetails>(
  'UPDATE_WORK_ORDER_BOM_CUSTOMER_DETAIL',
);

const initCustomer = (): Customer => ({
  id: 0,
  code: 'CUSTCODE111',
  name: 'CUSTOMERNAME',
  address: '',
  contactName: '',
  contactNo: '',
  customerTypeId: 0,
  websiteUrl: '',
});

export const initWorkOrderBOMCustomerDetail = (): WorkOrderBOMCustomerDetails => ({
  id: 0,
  workOrderBOMId: 0,
  customer: initCustomer(),
  pocEmailAddress: 'test@gmail.com',
  pocMobileNumber: '+97198292833',
  pointOfContactName: 'John Doe',
});

export const workOrderBOMCustomerDetailReducer = createReducer(
  initWorkOrderBOMCustomerDetail(),
  builder => builder.addCase(setWorkOrderBOMCustomerDetail, (_, action) => ({...action.payload})),
);
