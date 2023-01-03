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

    const formik = useFormikContext<GeneralAsset>();

     React.useEffect(() => {
         var _totalAmount = (formik.values.generalAssetPurchase?.shippingCharges || 0) +
                            (formik.values.generalAssetPurchase?.acquisitionAmount || 0) +
                            (formik.values.generalAssetPurchase?.otherCharges || 0) +
                            (formik.values.generalAssetPurchase?.taxCharges || 0);

            setTotalAmount(_totalAmount);
            if(formik.values.generalAssetPurchase !== undefined) {
                formik.values.generalAssetPurchase.totalAcquisitionAmount = _totalAmount;
             }
    }, [formik.values.generalAssetPurchase?.shippingCharges,
        formik.values.generalAssetPurchase?.acquisitionAmount,
        formik.values.generalAssetPurchase?.otherCharges,
        formik.values.generalAssetPurchase?.taxCharges]);
        
    return(
        <>
            <div className="col-span-3">
                <FsxFormikInput label="Supplier Name:" name={`generalAssetPurchase.supplier`} disabled={isReadOnly}/>
            </div>
            <div className="col-span-1">
                <PaymentTypesDropdown name={`generalAssetPurchase.paymentTypeId`} disabled={isReadOnly} isFormik required/>
            </div>
            <FsxFormikDatePicker label="Acquisition Date:" name={`generalAssetPurchase.acquisitionDate`} format={FSXDateFormat.Default} disabled={isReadOnly} />
            <AssetStateDropdown name={`generalAssetPurchase.assetStateId`} disabled={isReadOnly} isFormik required />
            <div className="col-span-2">
                <DepreciationMethodDropdown name={`generalAssetDepreciation.depreciationMethodId`} disabled={isReadOnly} isFormik  /> 
            </div>
            <div className="col-span-2">
                <FsxFormikInput label="Reference PO No.:" name={`generalAssetPurchase.referencePONo`} disabled={isReadOnly}/>
            </div>
            <div className="col-span-2">
                <FsxFormikNumericTextBox 
                    label="Shipping Charges:" 
                    name={`generalAssetPurchase.shippingCharges`} 
                    min={0}
                    disabled={isReadOnly}/>
            </div>
            <div className="col-span-2">
                <FsxFormikNumericTextBox 
                    label="Acquisition Amount:" 
                    name={`generalAssetPurchase.acquisitionAmount`}
                    min={0}
                    disabled={isReadOnly}/>
            </div>
            <div className="col-span-2">
                <FsxFormikNumericTextBox 
                    label="Other Charges:" 
                    name={`generalAssetPurchase.otherCharges`}
                    min={0}
                    disabled={isReadOnly}/>
            </div>
            <div className="col-span-2">
                <FsxFormikNumericTextBox 
                    label="Tax Charges:" 
                    name={`generalAssetPurchase.taxCharges`}
                    min={0}
                    disabled={isReadOnly}/>
            </div>
            <div className="col-span-2">
            <FsxFormikNumericTextBox 
                    label="Total Acquisition Amount:" 
                    name={`generalAssetPurchase.totalAcquisitionAmount`}
                    value={totalAmount}
                    min={0}
                    disabled/>

            </div>
            
            
        </>
        
    );
};

export default React.memo(Purchase);