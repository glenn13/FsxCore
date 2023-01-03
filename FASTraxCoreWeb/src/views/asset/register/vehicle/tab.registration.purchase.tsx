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

    const formik = useFormikContext<Vehicle>();

     React.useEffect(() => {
         var _totalAmount = (formik.values.vehiclePurchase?.shippingCharges || 0) +
                            (formik.values.vehiclePurchase?.acquisitionAmount || 0) +
                            (formik.values.vehiclePurchase?.otherCharges || 0) +
                            (formik.values.vehiclePurchase?.taxCharges || 0);

            setTotalAmount(_totalAmount);
            if(formik.values.vehiclePurchase !== undefined) {
                formik.values.vehiclePurchase.totalAcquisitionAmount = _totalAmount;
             }
    }, [formik.values.vehiclePurchase?.shippingCharges,
        formik.values.vehiclePurchase?.acquisitionAmount,
        formik.values.vehiclePurchase?.otherCharges,
        formik.values.vehiclePurchase?.taxCharges]);
        
    return(
        <>
            <div className="col-span-3">
                <FsxFormikInput label="Supplier Name:" name={`vehiclePurchase.supplier`} disabled={isReadOnly}/>
            </div>
            <div className="col-span-1">
                <PaymentTypesDropdown name={`vehiclePurchase.paymentTypeId`} disabled={isReadOnly} isFormik required/>
            </div>
            <FsxFormikDatePicker label="Acquisition Date:" name={`vehiclePurchase.acquisitionDate`} disabled={isReadOnly} format={FSXDateFormat.Default} />
            <AssetStateDropdown name={`vehiclePurchase.assetStateId`} disabled={isReadOnly} isFormik required />
            <div className="col-span-2">
                <DepreciationMethodDropdown name={`vehicleDepreciation.depreciationMethodId`} disabled={isReadOnly} isFormik  /> 
            </div>
            <div className="col-span-2">
                <FsxFormikInput label="Reference PO No.:" name={`vehiclePurchase.referencePONo`} disabled={isReadOnly}/>
            </div>
            <div className="col-span-2">
                <FsxFormikNumericTextBox 
                    label="Shipping Charges:" 
                    name={`vehiclePurchase.shippingCharges`} 
                    min={0}
                    disabled={isReadOnly} />
            </div>
            <div className="col-span-2">
                <FsxFormikNumericTextBox 
                    label="Acquisition Amount:" 
                    name={`vehiclePurchase.acquisitionAmount`}
                    min={0}
                    disabled={isReadOnly}/>
            </div>
            <div className="col-span-2">
                <FsxFormikNumericTextBox 
                    label="Other Charges:" 
                    name={`vehiclePurchase.otherCharges`}
                    min={0}
                    disabled />
            </div>
            <div className="col-span-2">
                <FsxFormikNumericTextBox 
                    label="Tax Charges:" 
                    name={`vehiclePurchase.taxCharges`}
                    min={0}
                    disabled={isReadOnly}/>
            </div>
            <div className="col-span-2">
            <FsxFormikNumericTextBox 
                    label="Total Acquisition Amount:" 
                    name={`vehiclePurchase.totalAcquisitionAmount`}
                    value={totalAmount}
                    min={0}
                    disabled/>

            </div>
            
            
        </>
        
    );
};

export default React.memo(Purchase);