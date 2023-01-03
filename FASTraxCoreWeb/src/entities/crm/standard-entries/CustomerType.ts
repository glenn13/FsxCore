import {BaseEntity} from './../../base';

export interface CustomerType extends BaseEntity {
    title: string,
}

export const newCustomerType = (): CustomerType => ({
    id : 0,
    title : '',
});

export { CustomerType as default }