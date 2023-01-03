import * as Yup from 'yup';

export const InspectionVehicleSchema = Yup.object().shape({
  inspectionNumber: Yup.string().required('Inspection Number is required'),
  dateIssued: Yup.date().required('Date issued is required'),
  dateCompleted: Yup.date().nullable().notRequired(),
  maintenanceScheduleId: Yup.number().required('Schedule is required'),
  maintenanceStatusId: Yup.number().required('Status is required'),
  workOrderVehicleId: Yup.number().required('Work number reference is required'),
  estimateVehicleId: Yup.number().required('Estimation number reference is required'),
  vehicleId: Yup.number().required('Asset ID is required'),
  currentOdometerReading: Yup.string().required('Current odometer reading is required'),
  fuelOnReceive: Yup.number().min(0).max(100).required('Fuel on receive is required'),
  fuelOnRelease: Yup.number().min(0).max(100).required('Fuel on release is required'),
  inspectionVehicleCustomerDetails: Yup.object().shape({
    customerId: Yup.number().required('Customer number is required'),
    pocName: Yup.string().required('POC Name is required'),
    pocMobileNumber: Yup.string().required('POC Mobile number is required'),
    pocEmailAddress: Yup.string().required('POC Email address is required'),
  }),
  inspectionVehicleAssignmentAndApproval: Yup.object().shape({
    preparedById: Yup.string().required('Prepared by is required'),
    performedById: Yup.string().required('Performed by is required'),
    notedOrConfirmedById: Yup.string().required('Noted or confirmed by is required'),
    additionalRemarks: Yup.string().nullable().notRequired(),
  }),
});

export const InspectionGeneralAssetSchema = Yup.object().shape({
  inspectionNumber: Yup.string().required('Inspection Number is required'),
  dateIssued: Yup.date().required('Date issued is required'),
  dateCompleted: Yup.date().nullable().notRequired(),
  maintenanceScheduleId: Yup.number().required('Schedule is required'),
  maintenanceStatusId: Yup.number().required('Status is required'),
  workOrderGeneralAssetId: Yup.number().required('Work number reference is required'),
  estimateGeneralAssetId: Yup.number().required('Estimation number reference is required'),
  generalAssetId: Yup.number().required('Asset ID is required'),
  currentOdometerReading: Yup.string().required('Current odometer reading is required'),
  fuelOnReceive: Yup.number().min(0).max(100).required('Fuel on receive is required'),
  fuelOnRelease: Yup.number().min(0).max(100).required('Fuel on release is required'),
  inspectionGeneralAssetCustomerDetails: Yup.object().shape({
    customerId: Yup.number().required('Customer number is required'),
    pocName: Yup.string().required('POC Name is required'),
    pocMobileNumber: Yup.string().required('POC Mobile number is required'),
    pocEmailAddress: Yup.string().required('POC Email address is required'),
  }),
  inspectionGeneralAssetAssignmentAndApproval: Yup.object().shape({
    preparedById: Yup.string().required('Prepared by is required'),
    performedById: Yup.string().required('Performed by is required'),
    notedOrConfirmedById: Yup.string().required('Noted or confirmed by is required'),
    additionalRemarks: Yup.string().nullable().notRequired(),
  }),
});

export const InspectionComponentSchema = Yup.object().shape({
  inspectionNumber: Yup.string().required('Inspection Number is required'),
  dateIssued: Yup.date().required('Date issued is required'),
  dateCompleted: Yup.date().nullable().notRequired(),
  maintenanceScheduleId: Yup.number().required('Schedule is required'),
  maintenanceStatusId: Yup.number().required('Status is required'),
  workOrderComponentId: Yup.number().required('Work number reference is required'),
  estimateComponentId: Yup.number().required('Estimation number reference is required'),
  componentId: Yup.number().required('Asset ID is required'),
  inspectionComponentCustomerDetails: Yup.object().shape({
    customerId: Yup.number().required('Customer number is required'),
    pocName: Yup.string().required('POC Name is required'),
    pocMobileNumber: Yup.string().required('POC Mobile number is required'),
    pocEmailAddress: Yup.string().required('POC Email address is required'),
  }),
  inspectionComponentAssignmentAndApproval: Yup.object().shape({
    preparedById: Yup.string().required('Prepared by is required'),
    performedById: Yup.string().required('Performed by is required'),
    notedOrConfirmedById: Yup.string().required('Noted or confirmed by is required'),
    additionalRemarks: Yup.string().nullable().notRequired(),
  }),
});
