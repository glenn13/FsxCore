import React from 'react';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';

export interface OwnershipProps {
    isReadOnly: boolean;
}

const Ownership: React.FC<OwnershipProps> = ({isReadOnly}) => {
    return(
        <>
            <div className="col-span-3">
                <FsxFormikInput label="Purchased By:" name={`generalAssetOwnership.purchasedBy`} disabled={isReadOnly}/>
            </div>

            <div className="col-span-1">
                <FsxFormikInput label="Customer Code:" name={`generalAssetOwnership.customerCode`} disabled={isReadOnly}/>
            </div>
            
        </>
        
    );
};

export default React.memo(Ownership);