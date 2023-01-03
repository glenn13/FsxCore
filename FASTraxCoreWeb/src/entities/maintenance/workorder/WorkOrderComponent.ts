import * as yup from 'yup';

import { BaseEntity } from "../../base";
import Currency from "../../finance/standard-entries/Currency";
import MaintenanceDepartment from "../standard-entries/MaintenanceDepartment";
import MaintenanceLocation from "../standard-entries/MaintenanceLocation";
import PriorityLevel from "../standard-entries/PriorityLevel";
import RepairStatus from "../standard-entries/RepairStatus";
import WorkOrderStatus from "../standard-entries/WorkOrderStatus";
import WorkOrderType from "../standard-entries/WorkOrderType";
import WorkOrderComponentCustomerDetails from './WorkOrderComponentCustomerDetails';
import WorkOrderComponentMobileService from './WorkOrderComponentMobileService';
import WorkOrderComponentDate from './WorkOrderComponentDate';
import WorkOrderComponentTotal from './WorkOrderComponentTotal';

export default interface WorkOrderComponent extends BaseEntity {

    //Primary Details
    currencyId: number;
    exchangeRate: number;
    maintenanceDepartmentId: number;
    maintenanceLocationId: number;
    onSiteNumber: string;
    priorityLevelId: number;
    referenceCustomerOrderNumber: string;
    referenceEstimationNumber: string;
    referenceSalesInvoiceNumber: string;
    repairStatusId: number;
    reWorkReferenceNumber: string;
    workOrderNumber: string;
    workOrderStatusId: number;
    workOrderTypeId: number;

    //Asset Information
    currentOdometerReading: number;
    fuelPercentOnReceive: number;
    fuelPercentOnRelease: number;
    componentId: number;
    assetCategoryId?: number;
    
    //Technical Narative
    customerConcerns: string;
    findingsAndInstructions: string;
    safetyNotes: string;

    //One to One
    currency?: Currency;
    maintenanceDepartment?: MaintenanceDepartment;
    maintenanceLocation?: MaintenanceLocation;
    priorityLevel?: PriorityLevel;
    repairStatus?: RepairStatus;
    component?: Component;
    workOrderStatus?: WorkOrderStatus;
    workOrderType?: WorkOrderType;
    workOrderComponentCustomerDetails?: WorkOrderComponentCustomerDetails;
    workOrderComponentDate?: WorkOrderComponentDate;
    workOrderComponentMobileService?: WorkOrderComponentMobileService;
    workOrderComponentTotal?: WorkOrderComponentTotal;
}

export const workOrderComponentShape = {
    priorityLevelId: yup.number().min(1, 'Priority Level is required.').required(),
    workOrderStatusId: yup.number().min(1, 'Work Order Status is required.').required(),
    workOrderTypeId: yup.number().min(1, 'Work Order Type is required.').required(),
    maintenanceDepartmentId: yup.number().min(1, 'Maintenance Department is required.').required(),
    maintenanceLocationId: yup.number().min(1, 'Maintenance Location is required.').required(),
    repairStatusId: yup.number().min(1, 'Repair Status is required.').required(),
    currencyId: yup.number().min(1, 'Currency is required.').required(),
    componentId: yup.number().min(1, 'Asset is required.').required()
};
