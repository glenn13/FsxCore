import { BaseEntity } from "../../base";
import Customer from "../../crm/sales/Customer";

export default interface WorkOrderBOMCustomerDetails extends BaseEntity {
    workOrderBOMId: number;

    pocEmailAddress: string;
    pocMobileNumber: string;
    pointOfContactName: string;

    customer?: Customer;
}