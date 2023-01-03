import React from 'react';
import {
  FsxFormikInput,
  FsxFormikNumericTextBox,
} from '@app/components/common/FsxFormik';
import FuelTypesDropdown from '../../../common/Dropdowns/FuelType';
import MeterTypesDropdown from '../../../common/Dropdowns/MeterType';
import EngineTypesDropdown from '../../../common/Dropdowns/EngineType';
import TransmissionTypesDropdown from '../../../common/Dropdowns/TransmissionType';

export interface SecondaryDetailsProps {}

const property = 'vehicleSecondaryDetail';

const SecondaryDetails: React.FC<SecondaryDetailsProps> = () => {
  return (
    <div className="grid grid-cols-5 gap-x-4 gap-y-2 lg:w-5/6 w-full py-2 mt-5 px-8">
      <FsxFormikInput name={`${property}.engineNo`} label="Engine No.:" required />
      <FsxFormikInput name={`${property}.engineSize`} label="Engine Size:" required />
      <FuelTypesDropdown isFormik name={`${property}.fuelTypeId`} label="Fuel Type:" required />
      <FsxFormikNumericTextBox
        name={`${property}.lastOdometerReading`}
        label="Last Odometer Reading:"
        required
      />
      <TransmissionTypesDropdown
        isFormik
        label="Transmission Type:"
        name={`${property}.transmissionTypeId`}
        required
      />
      <EngineTypesDropdown
        isFormik
        name={`${property}.engineTypeId`}
        label="Engine Type:"
        required
      />
      <FsxFormikInput name={`${property}.engineCode`} label="Engine Code:" required />
      <FsxFormikNumericTextBox name={`${property}.fuelCapacity`} label="Fuel Capacity:" required />
      <MeterTypesDropdown isFormik name={`${property}.meterTypeId`} label="Meter Type:" required />
      <FsxFormikInput name={`${property}.transmissionCode`} label="Transmission Code:" required />
      <FsxFormikInput name={`${property}.assignedToName`} label="Assigned To Name:" />
      <FsxFormikInput name={`${property}.contactNo`} label="Contact No.:" />
      <FsxFormikInput name={`${property}.email`} label="Email Address:" />
    </div>
  );
};

export default React.memo(SecondaryDetails);
