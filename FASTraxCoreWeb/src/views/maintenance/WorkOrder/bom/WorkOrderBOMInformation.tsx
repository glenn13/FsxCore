import CurrencyDropdown from '@app/views/finance/common/Dropdowns/Currency';
import FsxFormikDatePicker from '@app/components/common/FsxFormik/FsxFormikDatePicker';
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
import WorkOrderBOM from '@app/entities/maintenance/workorder/WorkOrderBOM';
import WorkOrderBOMTab from './WorkOrderBOMTab';
import WorkOrderStatusDropdown from '../../common/Dropdowns/WorkOrderStatus';
import WorkOrderTypeDropdown from '../../common/Dropdowns/WorkOrderType';
import {useFormikContext} from 'formik';
import {useSelector} from 'react-redux';

export interface WorkOrderBOMInformationProps {}

const WorkOrderBOMInformation: React.FC<WorkOrderBOMInformationProps> = () => {
  const formik = useFormikContext<WorkOrderBOM>();
  const selectorProject = useSelector((state: RootState) => state.projects.current);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-full">
      {/** Start - Left Group Box **/}
      <div className="col-span-3">
        <div className="flex flex-col h-full">
          {/*Start - Primary Details*/}
          <div className="shadow-lg p-4 bg-white rounded">
            <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
              <InputGroup
                disabled
                label="Work Order No.:"
                value={formik.values.workOrderNumber}
                inputGroupText={selectorProject?.selectedProjectSite?.code}
              />
              <PriorityLevelDropdown isFormik required />
              <WorkOrderStatusDropdown isFormik required />
              <FsxInput value="" label="Issued By :" disabled />
              <WorkOrderTypeDropdown isFormik required />
              <MaintenanceDepartmentDropdown isFormik required />
              <MaintenanceLocationDropdown isFormik required />
              <CurrencyDropdown isFormik required />
              <FsxFormikInput
                label="Reference Customer Order No. :"
                name="referenceCustomerOrderNumber"
                type="text"
              />
              <FsxFormikInput
                label="Reference Estimation No. :"
                name="referenceEstimationNumber"
                type="text"
              />
              <FsxFormikInput
                label="Reference Sales Invoice No. :"
                name="referenceSalesInvoiceNumber"
                type="text"
              />
              <FsxInput value="" label="Exchange Rate :" disabled />
            </div>
          </div>
          {/*End - Primary Details*/}

          {/*Start - Technical Narrative Details*/}
          <div className="shadow-lg p-4 bg-white rounded mt-4 flex-1">
            TECHNICAL NARRATIVE
            <div className="flex flex-col h-full">
              <FsxFormikTextarea
                name="workDescription"
                label="Work Description :"
                className="flex-grow"
              />
              <div className="w-full mb-8" />
            </div>
          </div>
          {/*End - Technical Narrative Details*/}
        </div>
      </div>
      {/** End - Left Group Box **/}

      {/** Start - Right Group Box **/}
      <div className="col-auto">
        <div className="grid grid-cols-1 gap-4">
          {/*Start - Work Order Date Details*/}
          <div className="shadow-lg p-4 bg-white rounded">
            <Heading title="Work Order Date" />
            <div className="grid sm:grod-cols-1 md:grid-cols-4 lg:grid-cols-2 gap-2">
              <FsxFormikDatePicker label="Date Issued :" name={`workOrderBOMDate.dateIssued`} />
              <FsxFormikDatePicker label="WO Date Closed :" name={`workOrderBOMDate.dateClosed`} />
              <FsxFormikDatePicker label="ETC Date :" name={`workOrderBOMDate.dateETC`} />
              <FsxFormikDatePicker label="Date Released :" name={`workOrderBOMDate.dateReleased`} />
            </div>
          </div>
          {/*End - Work Order Date Details*/}

          {/*Start - Customer Details*/}
          <div className="shadow-lg p-4 bg-white rounded">
            <Heading title="Customer Details" />
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
              <FsxInput
                value={formik.values.workOrderBOMCustomerDetails?.customer?.code}
                label="Customer No. :"
                disabled
              />
              <FsxInput value="" label="Customer Type:" disabled />
              <FsxInput
                value={formik.values.workOrderBOMCustomerDetails?.customer?.name}
                label="Customer Name :"
                disabled
              />
              <div className="col-span-2">
                <FsxFormikInput
                  name="workOrderBOMCustomerDetails.pointOfContactName"
                  label="Point Of Contact Name :"
                  type="text"
                />
              </div>
              <FsxFormikInput
                name="workOrderBOMCustomerDetails.pocMobileNumber"
                label="POC Mobile No :"
                type="text"
              />
              <FsxFormikInput
                name="workOrderBOMCustomerDetails.pocEmailAddress"
                label="POC Email Address :"
                type="text"
              />
            </div>
          </div>
          {/*End - Customer Details*/}

          {/*Start - Work Order Total Details*/}
          <div className="shadow-lg p-4 bg-white rounded">
            <Heading title="Work Order Total" />
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
              <div className="uppercase">Estimate</div>
              <div className="uppercase">Actual</div>
              <FsxFormikNumericTextBox name={`workOrderBOMTotal.estimateLabour`} label="Labour :" />
              <FsxFormikNumericTextBox name={`workOrderBOMTotal.actualLabour`} label="Labour :" />

              <FsxFormikNumericTextBox
                name={`workOrderBOMTotal.estimateMaterial`}
                label="Material :"
              />
              <FsxFormikNumericTextBox
                name={`workOrderBOMTotal.actualMaterial`}
                label="Material :"
              />

              <FsxFormikNumericTextBox name={`workOrderBOMTotal.estimateOther`} label="Other :" />
              <FsxFormikNumericTextBox name={`workOrderBOMTotal.actualOther`} label="Other :" />

              <FsxFormikNumericTextBox name={`workOrderBOMTotal.estimateGross`} label="Gross :" />
              <FsxFormikNumericTextBox name={`workOrderBOMTotal.actualGross`} label="Gross :" />

              <FsxFormikNumericTextBox
                name={`workOrderBOMTotal.estimateDiscount`}
                label="Discount :"
              />
              <FsxFormikNumericTextBox
                name={`workOrderBOMTotal.actualDiscount`}
                label="Discount :"
              />

              <FsxFormikNumericTextBox name={`workOrderBOMTotal.estimateNet`} label="Net :" />
              <FsxFormikNumericTextBox name={`workOrderBOMTotal.actualNet`} label="Net :" />
            </div>
          </div>
          {/*End - Work Order Total Details*/}
        </div>
      </div>
      {/** End - Right Group Box **/}

      {/*Start - Tab groups*/}
      <div className="col-span-4">
        <div className="shadow-lg bg-white p-5 w-full lg:w-4/4 md:w-4/4 px-5 m-2">
          <WorkOrderBOMTab />
        </div>
      </div>
      {/*End - Tab groups*/}
    </div>
  );
};

export default React.memo(WorkOrderBOMInformation);
