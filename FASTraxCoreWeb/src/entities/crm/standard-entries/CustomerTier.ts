import {BaseEntity} from './../../base';

export interface CustomerTier extends BaseEntity {
    title: string,
}

export const newCustomerTier = (): CustomerTier => ({
    id : 0,
    title : '',
});

export { CustomerTier as default }