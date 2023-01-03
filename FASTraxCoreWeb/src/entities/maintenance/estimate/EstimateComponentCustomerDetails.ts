import { BaseEntity } from './../../base';
import Customer from '../../crm/sales/Customer';

export default interface EstimateComponentCustomerDetails extends BaseEntity {
    estimateComponentId: number;

    pocEmailAddress: string;
    pocMobileNumber: string;
    pointOfContactName: string;

    customer?: Customer;
}
