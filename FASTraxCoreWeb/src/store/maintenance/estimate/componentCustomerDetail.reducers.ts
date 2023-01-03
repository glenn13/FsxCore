import {createAction, createReducer} from '@reduxjs/toolkit';

import Customer from '@app/entities/crm/sales/Customer';
import EstimateComponentCustomerDetails from '@app/entities/maintenance/estimate/EstimateComponentCustomerDetails';

export const addEstimateComponentCustomerDetail = createAction<EstimateComponentCustomerDetails>(
  'ADD_ESTIMATE_COMPONENT_CUSTOMER_DETAIL',
);
export const setEstimateComponentCustomerDetail = createAction<EstimateComponentCustomerDetails>(
  'SET_ESTIMATE_COMPONENT_CUSTOMER_DETAIL',
);
export const updateEstimateComponentCustomerDetail = createAction<EstimateComponentCustomerDetails>(
  'UPDATE_ESTIMATE_COMPONENT_CUSTOMER_DETAIL',
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

export const initEstimateComponentCustomerDetail = (): EstimateComponentCustomerDetails => ({
  id: 0,
  estimateComponentId: 0,
  customer: initCustomer(),
  pocEmailAddress: 'test@gmail.com',
  pocMobileNumber: '+97198292833',
  pointOfContactName: 'John Doe',
});

export const estimateComponentCustomerDetailReducer = createReducer(
  initEstimateComponentCustomerDetail(),
  builder =>
    builder.addCase(setEstimateComponentCustomerDetail, (_, action) => ({...action.payload})),
);
