import {createAction, createReducer} from '@reduxjs/toolkit';

import Customer from '@app/entities/crm/sales/Customer';
import EstimateVehicleCustomerDetails from '@app/entities/maintenance/estimate/EstimateVehicleCustomerDetails';

export const addEstimateVehicleCustomerDetail = createAction<EstimateVehicleCustomerDetails>(
  'ADD_ESTIMATE_VEHICLE_CUSTOMER_DETAIL',
);
export const setEstimateVehicleCustomerDetail = createAction<EstimateVehicleCustomerDetails>(
  'SET_ESTIMATE_VEHICLE_CUSTOMER_DETAIL',
);
export const updateEstimateVehicleCustomerDetail = createAction<EstimateVehicleCustomerDetails>(
  'UPDATE_ESTIMATE_VEHICLE_CUSTOMER_DETAIL',
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

export const initEstimateVehicleCustomerDetail = (): EstimateVehicleCustomerDetails => ({
  id: 0,
  estimateVehicleId: 0,
  customer: initCustomer(),
  pocEmailAddress: 'test@gmail.com',
  pocMobileNumber: '+97198292833',
  pointOfContactName: 'John Doe',
});

export const estimateVehicleCustomerDetailReducer = createReducer(
  initEstimateVehicleCustomerDetail(),
  builder =>
    builder.addCase(setEstimateVehicleCustomerDetail, (_, action) => ({...action.payload})),
);
