import CostCenterDropdown from '@app/views/finance/common/Dropdowns/CostCenter';
import CurrencyDropdown from '@app/views/finance/common/Dropdowns/Currency';
import EstimateVehicle from '@app/entities/maintenance/estimate/EstimateVehicle';
import EstimateVehicleAssetInfoPreviewFields from './EstimateVehicleAssetInfoPreviewFields';
import EstimateVehicleTab from './EstimateVehicleTab';
import EstimationStatusDropdown from '../../common/Dropdowns/EstimationStatus';
import EstimationTypeDropdown from '../../common/Dropdowns/EstimationType';
import FsxFormikDatePicker from '@app/components/common/FsxFormik/FsxFormikDatePicker';
import FsxFormikDropDownList from '@app/components/common/FsxFormik/FsxFormikDropDownList';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';
import FsxFormikNumericTextBox from '@app/components/common/FsxFormik/FsxFormikNumericTextBox';
import FsxFormikTextarea from '@app/components/common/FsxFormik/FsxFormikTextArea';
import {FsxInput} from '@app/components/common';
import Heading from '@app/views/common/Heading';
import InputGroup from '@app/components/common/InputGroup';
import MaintenanceDepartmentDropdown from '../../common/Dropdowns/MaintenanceDepartment';
import MaintenanceLocationDropdown from '../../common/Dropdowns/MaintenanceLocation';
import PriorityLevelDropdown from '../../common/Dropdowns/PriorityLevel';
import React from 'react';
import {RootState} from '@app/store/rootReducer';
import {useFormikContext} from 'formik';
import {useSelector} from 'react-redux';
import {useVehicles} from '@app/services/asset/vehicles.service';

export interface EstimateVehicleInformationProps {
  isEdit: boolean;
}

const EstimateVehicleInformation: React.FC<EstimateVehicleInformationProps> = ({isEdit}) => {
  const formik = useFormikContext<EstimateVehicle>();
  const selectorProject = useSelector((state: RootState) => state.projects.current);

  const {data: vehicles, isLoading: vehiclesIsLoading} = useVehicles();

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-full">
      {/** Start - Left Group Box **/}
      <div className="col-span-3">
        <div className="flex flex-col h-full">
          {/** Start - Primary Details **/}
          <div className="shadow-lg p-4 bg-white rounded">
            <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
              <InputGroup
                disabled
                label="Estimation No.:"
                value={formik.values.estimationNumber}
                inputGroupText={selectorProject?.selectedProjectSite?.code}
              />
              <EstimationStatusDropdown isFormik required />
              <CostCenterDropdown isFormik required />
              <FsxInput value="" label="Prepared By :" disabled />
              <EstimationTypeDropdown isFormik />
              <MaintenanceDepartmentDropdown isFormik required />
              <CurrencyDropdown isFormik required />
              <FsxInput value="" label="Exchange Rate :" disabled />
              <FsxFormikInput
                label="Reference Customer Order No. :"
                name="referenceCustomerOrderNumber"
                type="text"
                required
              />
              <MaintenanceLocationDropdown isFormik required />
              <PriorityLevelDropdown isFormik required />
              <FsxInput value="" label="Reference WOs No. :" disabled />
            </div>
          </div>
          {/** End - Primary Details **/}

          {/** Start - Asset Information **/}
          <div className="shadow-lg p-4 bg-white rounded mt-4">
            Asset Information
            <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
              <FsxFormikDropDownList
                label="Asset ID:"
                name="vehicleId"
                dataItemKey="id"
                textField="assetRefId"
                data={vehicles?.data}
                loading={vehiclesIsLoading}
                disabled={isEdit}
                required
              />
              <EstimateVehicleAssetInfoPreviewFields vehicles={vehicles?.data} />
              <FsxFormikNumericTextBox
                name={`currentOdometerReading`}
                label="Current Odometer :"
                required
              />
            </div>
          </div>
          {/** End - Asset Information **/}

          {/*Start - Technical Narrative Details*/}
          <div className="shadow-lg p-4 bg-white rounded mt-4 flex-1">
            <div className="flex flex-col h-full">
              <FsxFormikTextarea
                name="customerConcerns"
                label="Customer Concerns :"
                className="flex-grow"
              />
              <FsxFormikTextarea
                name="findingsAndInstructions"
                label="Findings and Instructions :"
                className="flex-grow"
              />
              <FsxFormikTextarea name="safetyNotes" label="Safety Notes :" className="flex-grow" />
            </div>
          </div>
          {/*End - Technical Narrative Details*/}
        </div>
      </div>
      {/** End - Left Group Box **/}

      {/** Start - Right Group Box **/}
      <div className="col-auto">
        <div className="grid grid-cols-1 gap-4">
          {/*Start - Estimation Date Details*/}
          <div className="shadow-lg p-4 bg-white rounded">
            <Heading title="Estimation Date" />
            <div className="grid sm:grod-cols-1 md:grid-cols-4 lg:grid-cols-2 gap-2">
              <FsxFormikDatePicker
                label="Date Created :"
                defaultView={{enabled: true, view: 'decade'}}
                format={'yyyy'}
                name={`estimateVehicleDate.dateCreated`}
              />
              <FsxFormikDatePicker label="Date Closed :" name={`estimateVehicleDate.dateClosed`} />
              <FsxFormikDatePicker
                label="Submitted for Approval :"
                name={`estimateVehicleDate.dateSubmittedForApproval`}
              />
              <FsxFormikDatePicker
                label="Date ApprovedDeclined :"
                name={`estimateVehicleDate.dateApprovedDeclined`}
              />
            </div>
          </div>
          {/*End - Estimation Date Details*/}

          {/*Start - Customer Details*/}
          <div className="shadow-lg p-4 bg-white rounded">
            <Heading title="Customer Details" />
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
              <FsxInput
                value={formik.values.estimateVehicleCustomerDetails?.customer?.code}
                label="Customer No. :"
                disabled
              />
              <FsxInput value="" label="Customer Type:" disabled />
              <FsxInput
                className="col-span-2"
                value={formik.values.estimateVehicleCustomerDetails?.customer?.name}
                label="Customer Name :"
                disabled
              />

              <div className="col-span-2">
                <FsxFormikInput
                  name="estimateVehicleCustomerDetails.pointOfContactName"
                  label="Point Of Contact Name :"
                  type="text"
                />
              </div>

              <FsxFormikInput
                name="estimateVehicleCustomerDetails.pocMobileNumber"
                label="POC Mobile No :"
                type="text"
              />
              <FsxFormikInput
                name="estimateVehicleCustomerDetails.pocEmailAddress"
                label="POC Email Address :"
                type="text"
              />
            </div>
          </div>
          {/*End - Customer Details*/}

          {/*Start - Estimation Total Details*/}
          <div className="shadow-lg p-4 bg-white rounded">
            <Heading title="Customer Details" />
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
              <div className="uppercase">Estimate</div>
              <div className="uppercase">Approved</div>
              <FsxFormikNumericTextBox
                name={`estimateVehicleTotal.estimateLabour`}
                label="Labour :"
              />
              <FsxFormikNumericTextBox
                name={`estimateVehicleTotal.approvedLabour`}
                label="Labour :"
              />

              <FsxFormikNumericTextBox
                name={`estimateVehicleTotal.estimateMaterial`}
                label="Material :"
              />
              <FsxFormikNumericTextBox
                name={`estimateVehicleTotal.approvedMaterial`}
                label="Material :"
              />

              <FsxFormikNumericTextBox
                name={`estimateVehicleTotal.estimateOther`}
                label="Other :"
              />
              <FsxFormikNumericTextBox
                name={`estimateVehicleTotal.approvedOther`}
                label="Other :"
              />

              <FsxFormikNumericTextBox
                name={`estimateVehicleTotal.estimateGross`}
                label="Gross :"
              />
              <FsxFormikNumericTextBox
                name={`estimateVehicleTotal.approvedGross`}
                label="Gross :"
              />

              <FsxFormikNumericTextBox
                name={`estimateVehicleTotal.estimateDiscount`}
                label="Discount :"
              />
              <FsxFormikNumericTextBox
                name={`estimateVehicleTotal.approvedDiscount`}
                label="Discount :"
              />

              <FsxFormikNumericTextBox name={`estimateVehicleTotal.estimateNet`} label="Net :" />
              <FsxFormikNumericTextBox name={`estimateVehicleTotal.approvedNet`} label="Net :" />
            </div>
          </div>
          {/*End - Estimation Total Details*/}
        </div>
      </div>
      {/** End - Right Group Box **/}

      {/*Start - Tab groups*/}
      <div className="col-span-4">
        <div className="shadow-lg bg-white p-5 w-full lg:w-4/4 md:w-4/4 px-5 m-2">
          <EstimateVehicleTab />
        </div>
      </div>
      {/*End - Tab groups*/}
    </div>
  );
};

export default React.memo(EstimateVehicleInformation);
