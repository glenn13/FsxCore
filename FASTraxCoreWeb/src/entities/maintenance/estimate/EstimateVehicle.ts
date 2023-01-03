import * as Yup from 'yup';

import { BaseEntity } from './../../base';
import { Vehicle } from '../../asset/inventory/Vehicle';
import CostCenter from '../../finance/standard-entries/ConstCenter';
import Currency from '../../finance/standard-entries/Currency';
import EstimationStatus from '../standard-entries/EstimationStatus';
import EstimationType from '../standard-entries/EstimationType';
import MaintenanceDepartment from '../standard-entries/MaintenanceDepartment';
import MaintenanceLocation from '../standard-entries/MaintenanceLocation';
import PriorityLevel from '../standard-entries/PriorityLevel';
import EstimateVehicleCustomerDetails from './EstimateVehicleCustomerDetails';
import EstimateVehicleDate from './EstimateVehicleDate';
import EstimateVehicleTotal from './EstimateVehicleTotal';
import EstimateVehicleImageAttachment from './EstimateVehicleImageAttachment';

export default interface EstimateVehicle extends BaseEntity {
    //Primary Details 
    costCenterId: number;
    currencyId: number;
    estimationNumber: string;
    estimationStatusId: number;
    estimationTypeId: number;
    maintenanceDepartmentId: number;
    maintenanceLocationId: number;
    priorityLevelId: number;
    referenceCustomerOrderNumber: string;

    //Asset Information
    vehicleId: number;
    vehicle?: Vehicle;
    currentOdometerReading: number;

    //Technical Narrative
    customerConcerns: string;
    findingsAndInstructions: string;
    safetyNotes: string;

    costCenter?: CostCenter;
    currency?: Currency;
    estimationStatus?: EstimationStatus;
    estimationType?: EstimationType;
    maintenanceDepartment?: MaintenanceDepartment;
    maintenanceLocation?: MaintenanceLocation;
    priorityLevel?: PriorityLevel;
    
    estimateVehicleCustomerDetails?: EstimateVehicleCustomerDetails;
    estimateVehicleDate?: EstimateVehicleDate;
    estimateVehicleTotal?: EstimateVehicleTotal;
    estimateVehicleImageAttachment?: EstimateVehicleImageAttachment[];
}

export const estimateVehicleShape = {
    estimationNumber: Yup.string().required('Estimation Number is required.'),
    estimationTypeId: Yup.number().min(1, 'Estimation Type is required.').required(),
    referenceCustomerOrderNumber: Yup.string().required('Reference Customer Order Number is required.'),
    estimationStatusId: Yup.number().min(1, 'Estimation Status is required.').required(),
    maintenanceDepartmentId: Yup.number().min(1, 'Maintenance Department is required.').required(),
    maintenanceLocationId: Yup.number().min(1, 'Maintenance Location is required.').required(),
    costCenterId: Yup.number().min(1, 'Cost Center is required').required(),
    currencyId: Yup.number().min(1, 'Currency is required.').required(),
    priorityLevelId: Yup.number().min(1, 'Property Level is required.').required()
};


