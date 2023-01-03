import * as yup from 'yup';

import { BaseEntity } from "../../base";
import Currency from "../../finance/standard-entries/Currency";
import MaintenanceDepartment from "../standard-entries/MaintenanceDepartment";
import MaintenanceLocation from "../standard-entries/MaintenanceLocation";
import PriorityLevel from "../standard-entries/PriorityLevel";
import WorkOrderStatus from "../standard-entries/WorkOrderStatus";
import WorkOrderType from "../standard-entries/WorkOrderType";
import WorkOrderBOMCustomerDetails from './WorkOrderBOMCustomerDetails';
import WorkOrderBOMDate from './WorkOrderBOMDate';
import WorkOrderBOMTotal from './WorkOrderBOMTotal';

export default interface WorkOrderBOM extends BaseEntity {

    //Primary Details
    currencyId: number;
    exchangeRate: number;
    maintenanceDepartmentId: number;
    maintenanceLocationId: number;
    priorityLevelId: number;
    referenceCustomerOrderNumber: string;
    referenceEstimationNumber: string;
    referenceSalesInvoiceNumber: string;
    workOrderNumber: string;
    workOrderStatusId: number;
    workOrderTypeId: number;

    //Technical Narative
    workDescription: string;

    //One to One
    currency?: Currency;
    maintenanceDepartment?: MaintenanceDepartment;
    maintenanceLocation?: MaintenanceLocation;
    priorityLevel?: PriorityLevel;
    workOrderStatus?: WorkOrderStatus;
    workOrderType?: WorkOrderType;
    workOrderBOMCustomerDetails?: WorkOrderBOMCustomerDetails;
    workOrderBOMDate?: WorkOrderBOMDate;
    workOrderBOMTotal?: WorkOrderBOMTotal;
}

export const workOrderBOMShape = {
    priorityLevelId: yup.number().min(1, 'Priority Level is required.').required(),
    workOrderStatusId: yup.number().min(1, 'Work Order Status is required.').required(),
    workOrderTypeId: yup.number().min(1, 'Work Order Type is required.').required(),
    maintenanceDepartmentId: yup.number().min(1, 'Maintenance Department is required.').required(),
    maintenanceLocationId: yup.number().min(1, 'Maintenance Location is required.').required(),
    currencyId: yup.number().min(1, 'Currency is required.').required(),
};
