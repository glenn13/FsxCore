import * as yup from 'yup';
import Customer from '../../crm/sales/Customer';

export const newAssetOwnership = (): AssetOwnership => ({
  id: 0,
  customerId: 0,
  supplierId: 0,
  paymentTypeId: 0,
  assetStateId: 0,
  depreciationMethodId: 0,
  acquisitionDate: new Date(),
  referencePO: '',
  shippingCharges: 0,
  acquisitionAmount: 0,
  otherCharges: 0,
  taxCharges: 0,
});

export interface AssetOwnership {
  id: number;
  customerId: number;
  supplierId: number;
  paymentTypeId: number;
  assetStateId: number;
  depreciationMethodId: number;
  acquisitionDate: Date;
  referencePO: string;
  shippingCharges: number;
  acquisitionAmount: number;
  otherCharges: number;
  taxCharges: number;

  customer?: Customer;
}

export const assetOwnershipPath = 'assetOwnership';

export const assetOwnershipShape = {
  customerId: yup.number().min(1, 'Purchased By is required!').required(),
  supplierId: yup.number().min(1, 'Supplier is required!').required(),
  paymentTypeId: yup.number().min(1, 'Payment Type is required!').required(),
  assetStateId: yup.number().min(1, 'Asset State is required!').required(),
  depreciationMethodId: yup.number().min(1, 'Depreciation Method is required!').required(),
  acquisitionDate: yup.date(),
  referencePO: yup.string().required('Reference P.O. is required!'),
  shippingCharges: yup.number().min(0, "ShippingCharges can't be a negative number!"),
  acquisitionAmount: yup.number().min(0, "AcquisitionAmount can't be a negative number!"),
  otherCharges: yup.number().min(0, "OtherCharges can't be a negative number!"),
  taxCharges: yup.number().min(0, "TaxCharges can't be a negative number!"),
  totalAcquisitionAmount: yup.number(),
};
