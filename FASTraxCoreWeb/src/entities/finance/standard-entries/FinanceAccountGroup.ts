import {BaseEntity} from './../../base';

export interface FinanceAccountGroup extends BaseEntity {
    title: string,
}

export const newFinanceAccountGroup = (): FinanceAccountGroup => ({
    id : 0,
    title : '',
});

export { FinanceAccountGroup as default }