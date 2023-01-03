import CostCenterDropdown from '@app/views/finance/common/Dropdowns/CostCenter';
import CurrencyDropdown from '@app/views/finance/common/Dropdowns/Currency';
import EstimateComponent from '@app/entities/maintenance/estimate/EstimateComponent';
import EstimateComponentAssetInfoPreviewFields from './EstimateComponentAssetInfoPreviewFields';
import EstimateComponentTab from './EstimateComponentTab';
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
import {useComponentsGrid} from '@app/services/asset/inventory/components.service';
import {useFormikContext} from 'formik';
import {useSelector} from 'react-redux';

export interface EstimateComponentInformationProps {
  isEdit: boolean;
}

const EstimateComponentInformation: React.FC<EstimateComponentInformationProps> = ({isEdit}) => {
  const formik = useFormikContext<EstimateComponent>();
  const selectorProject = useSelector((state: RootState) => state.projects.current);

  const {data: components, isLoading: componentsIsLoading} = useComponentsGrid();

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
                label="Work Order No.:"
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
              <FsxInput value="" label="Reference WO No. :" disabled />
            </div>
          </div>
          {/** End - Primary Details **/}

          {/** Start - Asset Information **/}
          <div className="shadow-lg p-4 bg-white rounded mt-4">
            Asset Information
            <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
              <FsxFormikDropDownList
                label="Asset ID:"
                name="componentId"
                dataItemKey="id"
                textField="assetRefId"
                data={components?.data}
                loading={componentsIsLoading}
                disabled={isEdit}
                required
              />
              <EstimateComponentAssetInfoPreviewFields components={components?.data} />
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
                name={`estimateComponentDate.dateCreated`}
              />
              <FsxFormikDatePicker
                label="Date Closed :"
                name={`estimateComponentDate.dateClosed`}
              />
              <FsxFormikDatePicker
                label="Submitted for Approval :"
                name={`estimateComponentDate.dateSubmittedForApproval`}
              />
              <FsxFormikDatePicker
                label="Date ApprovedDeclined :"
                name={`estimateComponentDate.dateApprovedDeclined`}
              />
            </div>
          </div>
          {/*End - Estimation Date Details*/}

          {/*Start - Customer Details*/}
          <div className="shadow-lg p-4 bg-white rounded">
            <Heading title="Customer Details" />
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
              <FsxInput
                value={formik.values.estimateComponentCustomerDetails?.customer?.code}
                label="Customer No. :"
                disabled
              />
              <FsxInput value="" label="Customer Type:" disabled />
              <FsxInput
                className="col-span-2"
                value={formik.values.estimateComponentCustomerDetails?.customer?.name}
                label="Customer Name :"
                disabled
              />

              <div className="col-span-2">
                <FsxFormikInput
                  name="estimateComponentCustomerDetails.pointOfContactName"
                  label="Point Of Contact Name :"
                  type="text"
                />
              </div>

              <FsxFormikInput
                name="estimateComponentCustomerDetails.pocMobileNumber"
                label="POC Mobile No :"
                type="text"
              />
              <FsxFormikInput
                name="estimateComponentCustomerDetails.pocEmailAddress"
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
              <div className="uppercase">Actual</div>

              <FsxFormikNumericTextBox
                name={`estimateComponentTotal.estimateLabour`}
                label="Labour :"
              />
              <FsxFormikNumericTextBox
                name={`estimateComponentTotal.approvedLabour`}
                label="Labour :"
              />

              <FsxFormikNumericTextBox
                name={`estimateComponentTotal.estimateMaterial`}
                label="Material :"
              />
              <FsxFormikNumericTextBox
                name={`estimateComponentTotal.approvedMaterial`}
                label="Material :"
              />

              <FsxFormikNumericTextBox
                name={`estimateComponentTotal.estimateOther`}
                label="Other :"
              />
              <FsxFormikNumericTextBox
                name={`estimateComponentTotal.approvedOther`}
                label="Other :"
              />

              <FsxFormikNumericTextBox
                name={`estimateComponentTotal.estimateGross`}
                label="Gross :"
              />
              <FsxFormikNumericTextBox
                name={`estimateComponentTotal.approvedGross`}
                label="Gross :"
              />

              <FsxFormikNumericTextBox
                name={`estimateComponentTotal.estimateDiscount`}
                label="Discount :"
              />
              <FsxFormikNumericTextBox
                name={`estimateComponentTotal.approvedDiscount`}
                label="Discount :"
              />

              <FsxFormikNumericTextBox name={`estimateComponentTotal.estimateNet`} label="Net :" />
              <FsxFormikNumericTextBox name={`estimateComponentTotal.approvedNet`} label="Net :" />
            </div>
          </div>
          {/*End - Estimation Total Details*/}
        </div>
      </div>
      {/** End - Right Group Box **/}

      {/*Start - Tab groups*/}
      <div className="col-span-4">
        <div className="shadow-lg bg-white p-5 w-full lg:w-4/4 md:w-4/4 px-5 m-2">
          <EstimateComponentTab />
        </div>
      </div>
      {/*End - Tab groups*/}
    </div>
  );
};

export default React.memo(EstimateComponentInformation);
