import React from 'react';
import {useFormikContext} from 'formik';
import {Asset} from '@app/entities/asset/inventory/Asset';
import CustomersDropdown from '@app/views/crm/common/Dropdowns/Customers';
import AssetStateDropdown from '../../../../common/Dropdowns/AssetState';
import SuppliersDropdown from '../../../../../stock/common/Dropdowns/Suppliers';
import {
  FsxFormikDatePicker,
  FsxFormikInput,
  FsxFormikNumericTextBox as FsxFormikNumericTextBox,
} from '@app/components/common/FsxFormik';
import PaymentTypesDropdown from '../../../../../finance/common/Dropdowns/PaymentTypes';
import DepreciationMethodsDropdown from '@app/views/finance/common/Dropdowns/DepreciationMethods';

export interface AssetOwnershipFormProps {}

const path = 'assetOwnership';

const AssetOwnershipForm: React.FC<AssetOwnershipFormProps> = () => {
  const formik = useFormikContext<Asset>();
  const {assetOwnership} = formik.values;

  return (
    <div className="flex flex-wrap flex-row py-4 px-3">
      <div className="flex flex-row w-full">
        <div className="lg:w-3/5 w-full w-col">
          <CustomersDropdown
            isFormik
            name={`${path}.customerId`}
            label="Purchased By:"
            className=""
            required
          />
        </div>
        <div className="lg:w-2/5 w-full w-col">
          <FsxFormikInput
            name="customerCode"
            disabled
            label="Customer Code:"
            value={formik.values.assetOwnership.customer?.code || ''}
          />
        </div>
      </div>

      <div className="flex flex-row w-full">
        <div className="lg:w-3/5 w-full w-col">
          <SuppliersDropdown isFormik name={`${path}.supplierId`} required />
        </div>
        <div className="lg:w-2/5 w-full w-col">
          <PaymentTypesDropdown isFormik name={`${path}.paymentTypeId`} required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full">
          <FsxFormikDatePicker name={`${path}.acquisitionDate`} label="Acquisition Date:" />
          <AssetStateDropdown isFormik name={`${path}.assetStateId`} required />
        </div>
        <DepreciationMethodsDropdown isFormik name={`${path}.depreciationMethodId`} required />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full">
        <FsxFormikInput name={`${path}.referencePO`} label="Reference PO:" required />
        <FsxFormikNumericTextBox name={`${path}.shippingCharges`} label="Shipping Charges:" />
        <FsxFormikNumericTextBox name={`${path}.acquisitionAmount`} label="Acquisition Amount:" />
        <FsxFormikNumericTextBox name={`${path}.otherCharges`} label="Other Charges:" />
        <FsxFormikNumericTextBox name={`${path}.taxCharges`} label="Tax Charges:" />
        <FsxFormikNumericTextBox
          name="totalAcquisitionAmount"
          value={
            assetOwnership.shippingCharges +
            assetOwnership.acquisitionAmount +
            assetOwnership.otherCharges +
            assetOwnership.taxCharges
          }
          label="Total Acquisition Amount:"
          disabled
        />
      </div>
    </div>
  );
};

export default React.memo(AssetOwnershipForm);
