import React from 'react';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';
import FsxFormikDatePicker from '@app/components/common/FsxFormik/FsxFormikDatePicker';
import FsxFormikNumericTextBox from '@app/components/common/FsxFormik/FsxFormikNumericTextBox';

import AssetStateDropdown from '@app/views/asset/common/Dropdowns/AssetState';
import DepreciationMethodDropdown from '@app/views/finance/common/Dropdowns/DepreciationMethods';
import PaymentTypesDropdown from '@app/views/finance/common/Dropdowns/PaymentTypes';
import { useFormikContext } from 'formik';
import { FSXDateFormat } from '@app/helpers/global/enum';

export interface PurchaseProps {
    isReadOnly: boolean;
}

const Purchase: React.FC<PurchaseProps> = ({isReadOnly}) => {
    const [totalAmount, setTotalAmount] = React.useState(0);

    const formik = useFormikContext<Component>();

     React.useEffect(() => {
         var _totalAmount = (formik.values.componentPurchase?.shippingCharges || 0) +
                            (formik.values.componentPurchase?.acquisitionAmount || 0) +
                            (formik.values.componentPurchase?.otherCharges || 0) +
                            (formik.values.componentPurchase?.taxCharges || 0);

            setTotalAmount(_totalAmount);
            if(formik.values.componentPurchase !== undefined) {
                formik.values.componentPurchase.totalAcquisitionAmount = _totalAmount;
             }
    }, [formik.values.componentPurchase?.shippingCharges,
        formik.values.componentPurchase?.acquisitionAmount,
        formik.values.componentPurchase?.otherCharges,
        formik.values.componentPurchase?.taxCharges]);
        
    return(
        <>
            <div className="col-span-3">
                <FsxFormikInput label="Supplier Name:" name={`componentPurchase.supplier`} disabled={isReadOnly}/>
            </div>
            <div className="col-span-1">
                <PaymentTypesDropdown name={`componentPurchase.paymentTypeId`} disabled={isReadOnly} isFormik required/>
            </div>
            <FsxFormikDatePicker label="Acquisition Date:" name={`componentPurchase.acquisitionDate`} disabled={isReadOnly} format={FSXDateFormat.Default} />
            <AssetStateDropdown name={`componentPurchase.assetStateId`} disabled={isReadOnly} isFormik required />
            <div className="col-span-2">
                <DepreciationMethodDropdown name={`componentDepreciation.depreciationMethodId`} disabled={isReadOnly} isFormik  /> 
            </div>
            <div className="col-span-2">
                <FsxFormikInput label="Reference PO No.:" name={`componentPurchase.referencePONo`} disabled={isReadOnly}/>
            </div>
            <div className="col-span-2">
                <FsxFormikNumericTextBox 
                    label="Shipping Charges:" 
                    name={`componentPurchase.shippingCharges`} 
                    min={0} 
                    disabled={isReadOnly}/>
            </div>
            <div className="col-span-2">
                <FsxFormikNumericTextBox 
                    label="Acquisition Amount:" 
                    name={`componentPurchase.acquisitionAmount`}
                    min={0}
                    disabled={isReadOnly}/>
            </div>
            <div className="col-span-2">
                <FsxFormikNumericTextBox 
                    label="Other Charges:" 
                    name={`componentPurchase.otherCharges`}
                    min={0} 
                    disabled={isReadOnly}/>
            </div>
            <div className="col-span-2">
                <FsxFormikNumericTextBox 
                    label="Tax Charges:" 
                    name={`componentPurchase.taxCharges`}
                    min={0}
                    disabled={isReadOnly}/>
            </div>
            <div className="col-span-2">
            <FsxFormikNumericTextBox 
                    label="Total Acquisition Amount:" 
                    name={`componentPurchase.totalAcquisitionAmount`}
                    value={totalAmount}
                    min={0}
                    disabled/>
            </div>
            
            
        </>
        
    );
};

export default React.memo(Purchase);