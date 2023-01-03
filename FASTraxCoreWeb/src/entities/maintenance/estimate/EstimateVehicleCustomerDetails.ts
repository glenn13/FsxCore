import { BaseEntity } from './../../base';
import Customer from '../../crm/sales/Customer';

export default interface EstimateVehicleCustomerDetails extends BaseEntity {
    estimateVehicleId: number;

    pocEmailAddress: string;
    pocMobileNumber: string;
    pointOfContactName: string;

    customer?: Customer;
}
