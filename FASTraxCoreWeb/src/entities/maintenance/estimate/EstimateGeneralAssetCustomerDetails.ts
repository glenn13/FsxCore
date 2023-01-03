import { BaseEntity } from './../../base';
import Customer from '../../crm/sales/Customer';

export default interface EstimateGeneralAssetCustomerDetails extends BaseEntity {
    estimateGeneralAssetId: number;

    pocEmailAddress: string;
    pocMobileNumber: string;
    pointOfContactName: string;

    customer?: Customer;
}
