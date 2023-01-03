import {BaseEntity} from './../../base';

export interface CustomerGroup extends BaseEntity {
    title: string;
}

export const newCustomerGroup = (): CustomerGroup => ({
    id : 0,
    title : '',
});

export { CustomerGroup as default }