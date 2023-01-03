import { BaseEntity } from "../../base";
import Customer from "../../crm/sales/Customer";

export default interface WorkOrderComponentCustomerDetails extends BaseEntity {
    workOrderComponentId: number;

    pocEmailAddress: string;
    pocMobileNumber: string;
    pointOfContactName: string;

    customer?: Customer;
}