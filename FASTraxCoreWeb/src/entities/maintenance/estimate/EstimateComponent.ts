import * as yup from 'yup';

import { BaseEntity } from './../../base';
import { Component } from '../../asset/inventory/Component';
import CostCenter from '../../finance/standard-entries/ConstCenter';
import Currency from '../../finance/standard-entries/Currency';
import EstimationStatus from '../standard-entries/EstimationStatus';
import EstimationType from '../standard-entries/EstimationType';
import MaintenanceDepartment from '../standard-entries/MaintenanceDepartment';
import MaintenanceLocation from '../standard-entries/MaintenanceLocation';
import PriorityLevel from '../standard-entries/PriorityLevel';
import EstimateComponentCustomerDetails from './EstimateComponentCustomerDetails';
import EstimateComponentDate from './EstimateComponentDate';
import EstimateComponentTotal from './EstimateComponentTotal';

export default interface EstimateComponent extends BaseEntity {
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
    componentId: number;
    component?: Component;
    currentOdometerReading: number;

    //Technical Narrative
    customerConcerns: string;
    findingsAndInstructions: string;
    safetyNotes: string;

    //One to One
    costCenter?: CostCenter;
    currency?: Currency;
    maintenanceDepartment?: MaintenanceDepartment;
    maintenanceLocation?: MaintenanceLocation;
    priorityLevel?: PriorityLevel;
    estimateComponentCustomerDetails?: EstimateComponentCustomerDetails;
    estimateComponentDate?: EstimateComponentDate;
    estimateComponentTotal?: EstimateComponentTotal;
    estimationStatus?: EstimationStatus;
    estimationType?: EstimationType;
}

export const estimateComponentShape = {
    costCenterId: yup.number().min(1, 'Cost Center is required').required(),
    currencyId: yup.number().min(1, 'Currency is required.').required(),
    estimationNumber: yup.string().required('Estimation Number is required.'),
    estimationStatusId: yup.number().min(1, 'Estimation Status is required.').required(),
    estimationTypeId: yup.number().min(1, 'Estimation Type is required.').required(),
    maintenanceDepartmentId: yup.number().min(1, 'Maintenance Department is required.').required(),
    maintenanceLocationId: yup.number().min(1, 'Maintenance Location is required.').required(),
    priorityLevelId: yup.number().min(1, 'Property Level is required.').required(),
    referenceCustomerOrderNumber: yup.string().required('Reference Customer Order Number is required.')
};
