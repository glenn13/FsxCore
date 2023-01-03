import {BaseEntity} from './../../base';

export default interface Customer extends BaseEntity {
  code: string;
  name: string;
  address: string;
  websiteUrl: string;
  contactName: string;
  contactNo: string;
  customerTypeId: number;
  customerType?: {
    code: string;
    title: string;
    description: string;
    id: number;
  };
}
