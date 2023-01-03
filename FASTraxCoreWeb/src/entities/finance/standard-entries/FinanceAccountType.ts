import {BaseEntity} from './../../base';

export interface FinanceAccountType extends BaseEntity {
    title: string
}

export const newFinanceAccountType = (): FinanceAccountType => ({
    id: 0,
    title: '',
});

export { FinanceAccountType as default };