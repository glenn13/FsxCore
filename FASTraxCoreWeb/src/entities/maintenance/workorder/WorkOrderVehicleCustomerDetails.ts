import { BaseEntity } from "../../base";
import Customer from "../../crm/sales/Customer";

export default interface WorkOrderVehicleCustomerDetails extends BaseEntity {
    workOrderVehicleId: number;

    pocEmailAddress: string;
    pocMobileNumber: string;
    pointOfContactName: string;
   
    customer?: Customer;
}