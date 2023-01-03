import {BaseEntity} from './../../base';

export interface PaymentType extends BaseEntity {
  title: string,
}

export const newPaymentType = (): PaymentType => ({
  id: 0,
  title: '',
});

export {PaymentType as default};
