import { BaseEntity } from "../../base";
import Customer from "../../crm/sales/Customer";

export default interface WorkOrderGeneralAssetCustomerDetails extends BaseEntity {
    workOrderGeneralAssetId: number;

    pocEmailAddress: string;
    pocMobileNumber: string;
    pointOfContactName: string;

    customer?: Customer;
}