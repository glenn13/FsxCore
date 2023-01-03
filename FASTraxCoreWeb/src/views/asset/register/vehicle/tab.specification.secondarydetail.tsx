import React from 'react';
import { useFormikContext } from 'formik';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';
import FsxFormikNumericTextBox from '@app/components/common/FsxFormik/FsxFormikNumericTextBox';
import FuelTypeDropdown from '@app/views/asset/common/Dropdowns/FuelType';
import EngineTypeDropdown from '@app/views/asset/common/Dropdowns/EngineType';
import TransmissionTypeDropdown from '@app/views/asset/common/Dropdowns/TransmissionType';
import MeterTypeDropdown from '@app/views/asset/common/Dropdowns/MeterType';

export interface SecondaryDetailProps {
    isReadOnly: boolean;
}

const SecondaryDetail: React.FC<SecondaryDetailProps> = ({isReadOnly}) => {
    const formik = useFormikContext<Vehicle>();

    return(
        <div className="m-4">
            <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
                <FsxFormikInput label="Engine No.:" name={`vehicleSecondaryDetail.engineNo`} disabled={isReadOnly} required />
                <FsxFormikInput label="Engine Size:" name={`vehicleSecondaryDetail.engineSize`} disabled={isReadOnly}/>
                <FuelTypeDropdown  name={`vehicleSecondaryDetail.fuelTypeId`} disabled={isReadOnly} isFormik required />
                <FsxFormikNumericTextBox label="Last Odometer Reading" name={`vehicleSecondaryDetail.lastOdometerReading`} min={0} disabled={isReadOnly}/>
                <TransmissionTypeDropdown name={`vehicleSecondaryDetail.transmissionTypeId`} disabled={isReadOnly} isFormik required />
                <EngineTypeDropdown name={`vehicleSecondaryDetail.engineTypeId`} disabled={isReadOnly} isFormik required />
                <FsxFormikInput label="Engine Code:" name={`vehicleSecondaryDetail.engineCode`} disabled={isReadOnly}/>
                <FsxFormikNumericTextBox label="Fuel Capacity:" name={`vehicleSecondaryDetail.fuelCapacity`} disabled={isReadOnly} min={0}/>
                <MeterTypeDropdown name={`vehicleSecondaryDetail.meterTypeId`} disabled={isReadOnly} isFormik required />
                <FsxFormikInput label="Transmission Code:" name={`vehicleSecondaryDetail.transmissionCode`} disabled={isReadOnly} />
                
                <div className="col-span-2">
                    <FsxFormikInput label="Assigned To Name:" name={`vehicleSecondaryDetail.assignedToName`} disabled={isReadOnly} />
                </div>
                <div className="col-span-2">
                    <FsxFormikInput label="Email Address:" name={`vehicleSecondaryDetail.emailAddress`} disabled={isReadOnly} />
                </div>
                <FsxFormikInput label="Contact No.:" name={`vehicleSecondaryDetail.contactNo`} disabled={isReadOnly} />
            </div>
        </div>
        
    );
};

export default React.memo(SecondaryDetail);