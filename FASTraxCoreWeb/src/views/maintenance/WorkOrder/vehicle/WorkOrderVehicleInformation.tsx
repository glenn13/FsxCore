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
import RepairStatusDropdown from '../../common/Dropdowns/RepairStatus';
import {RootState} from '@app/store/rootReducer';
import WorkOrderStatusDropdown from '../../common/Dropdowns/WorkOrderStatus';
import WorkOrderTypeDropdown from '../../common/Dropdowns/WorkOrderType';
import WorkOrderVehicle from '@app/entities/maintenance/workorder/WorkOrderVehicle';
import WorkOrderVehicleTab from './WorkOrderVehicleTab';
import {useFormikContext} from 'formik';
import {useSelector} from 'react-redux';
import AssetTypeDropdown from '@app/views/asset/common/Dropdowns/AssetType';
import AssetManufacturerDropdown from '@app/views/asset/common/Dropdowns/AssetManufacturer';
import AssetModelDropdown from '@app/views/asset/common/Dropdowns/AssetModel';
import AssetGroupDropdown from '@app/views/asset/common/Dropdowns/AssetGroup';
import AssetOwnershipTypeDropdown from '@app/views/asset/common/Dropdowns/AssetOwnershipType';
import AssetColorDropdown from '@app/views/asset/common/Dropdowns/AssetColor';
import {AssetCategoryEnum} from '@app/helpers/asset/enum';

export interface WorkOrderVehicleInformationProps {
  isEdit: boolean;
}

const WorkOrderVehicleInformation: React.FC<WorkOrderVehicleInformationProps> = ({isEdit}) => {
  const formik = useFormikContext<WorkOrderVehicle>();
  const selectorProject = useSelector((state: RootState) => state.projects.current);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-full">
      {/** Start - Left Group Box **/}
      <div className="col-span-3">
        <div className="flex flex-col h-full">
          <FsxFormikNumericTextBox
            name={`inspectionVehicle.inspectionNumber`}
            label="inspectionNumber :"
          />

          {/*Start - Primary Details*/}
          <div className="shadow-lg p-4 bg-white rounded">
            <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
              <InputGroup
                disabled
                label="Work Order No. :"
                value={formik.values.workOrderNumber}
                inputGroupText={selectorProject?.selectedProjectSite?.code}
              />
              <PriorityLevelDropdown isFormik required />
              <WorkOrderStatusDropdown isFormik required />
              <FsxInput value="" label="Issued By :" disabled />
              <WorkOrderTypeDropdown isFormik required />
              <MaintenanceDepartmentDropdown isFormik required/>
              <RepairStatusDropdown isFormik required />
              <CurrencyDropdown isFormik required />
              <FsxInput value="" label="Re-Work Reference No :" disabled />
              <MaintenanceLocationDropdown isFormik required />
              <FsxFormikInput label="On-Site No (OSN) :" name="onSiteNumber" type="text" />
              <FsxInput value="" label="Exchange Rate :" disabled />
            </div>
          </div>
          {/*End - Primary Details*/}

          {/** Start - Asset Information **/}
          <div className="shadow-lg p-4 bg-white rounded mt-4">
            <div className="uppercase mb-2">Asset Information</div>
            <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
              <FsxFormikInput label="Asset ID:" name={`vehicle.assetRefId`} type="text" disabled />
              <AssetTypeDropdown
                isFormik
                label="Asset Type:"
                name={`vehicle.assetTypeId`}
                assetCategoryId={AssetCategoryEnum.Vehicle}
                disabled
              />
              <FsxFormikInput label="Serial No.:" name={`vehicle.serialNo`} type="text" disabled />
              <AssetManufacturerDropdown
                isFormik
                name={`vehicle.assetManufacturerId`}
                assetTypeId={formik.values.vehicle?.assetTypeId || 0}
                disabled
              />
              <AssetModelDropdown
                isFormik
                name={`vehicle.assetModelId`}
                assetManufacturerId={formik.values.vehicle?.assetManufacturerId || 0}
                disabled
              />
              <FsxFormikInput label="Series:" name={`vehicle.series`} type="text" disabled />
              <AssetGroupDropdown isFormik name={`vehicle.assetGroupId`} disabled />
              <AssetOwnershipTypeDropdown isFormik name={`vehicle.assetOwnershipTypeId`} disabled />
              <AssetColorDropdown isFormik name={`vehicle.assetColorId`} disabled />
              <FsxFormikNumericTextBox
                name={`vehicle.vehicleSecondaryDetail.lastOdometerReading`}
                label="Current Odometer :"
              />
              <FsxFormikNumericTextBox
                name={`vehicle.vehicleSecondaryDetail.fuelCapacity`}
                label="Fuel % On Receive :"
              />
              <FsxFormikNumericTextBox name={`fuelPercentOnRelease`} label="Fuel % On Release :" />
            </div>
          </div>
          {/** End - Asset Information **/}

          {/*Start - Technical Narrative Details*/}
          <div className="shadow-lg p-4 bg-white rounded mt-4 flex-1">
            <div className="uppercase mb-2">Technical Narrative</div>
            <div className="flex flex-col h-full">
              <FsxFormikTextarea
                name="customerConcerns"
                label="Customer Concerns :"
                className="flex-grow mb-3"
              />
              <FsxFormikTextarea
                name="findingsAndInstructions"
                label="Findings and Instructions :"
                className="flex-grow mb-3"
              />
              <FsxFormikTextarea
                name="safetyNotes"
                label="Safety Notes :"
                className="flex-grow mb-8"
              />
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
            <div className="grid sm:grod-cols-1 md:grid-cols-4 lg:grid-cols-2 gap-2 my-4">
              <FsxFormikDatePicker label="Date Issued :" name={`workOrderVehicleDate.dateIssued`} />
              <FsxFormikDatePicker
                label="WO Date Closed :"
                name={`workOrderVehicleDate.dateClosed`}
              />
              <FsxFormikDatePicker label="ETC Date :" name={`workOrderVehicleDate.dateETC`} />
              <FsxFormikDatePicker
                label="Date Released :"
                name={`workOrderVehicleDate.dateReleased`}
              />
            </div>
            <Heading title="Mobile Service" />
            <div className="grid sm:grod-cols-1 md:grid-cols-4 lg:grid-cols-2 gap-2 mt-4">
              <FsxFormikDatePicker
                label="Date Received :"
                name={`workOrderVehicleMobileService.dateReceived`}
              />
              <FsxFormikDatePicker
                label="Date Completed :"
                name={`workOrderVehicleMobileService.dateCompleted`}
              />
            </div>
          </div>
          {/*End - Work Order Date Details*/}

          {/*Start - Customer Details*/}
          <div className="shadow-lg p-4 bg-white rounded">
            <Heading title="Customer Details" />
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2 mt-4">
              <FsxInput
                value={formik.values.workOrderVehicleCustomerDetails?.customer?.code}
                label="Customer No. :"
                disabled
              />
              <FsxInput value="" label="Customer Type:" disabled />
              <div className="col-span-2">
                <FsxInput
                  value={formik.values.workOrderVehicleCustomerDetails?.customer?.name}
                  label="Customer Name :"
                  disabled
                />
              </div>
              <div className="col-span-2">
                <FsxFormikInput
                  name="workOrderVehicleCustomerDetails.pointOfContactName"
                  label="Point Of Contact Name :"
                  type="text"
                />
              </div>
              <FsxFormikInput
                name="workOrderVehicleCustomerDetails.pocMobileNumber"
                label="POC Mobile No :"
                type="text"
              />
              <FsxFormikInput
                name="workOrderVehicleCustomerDetails.pocEmailAddress"
                label="POC Email Address :"
                type="text"
              />
            </div>
          </div>
          {/*End - Customer Details*/}

          {/*Start - Work Order Total Details*/}
          <div className="shadow-lg p-4 bg-white rounded">
            <Heading title="Work Order Total" />
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2 mt-4">
              <div className="uppercase">Estimate</div>
              <div className="uppercase">Actual</div>
              <FsxFormikNumericTextBox
                name={`workOrderVehicleTotal.estimateLabour`}
                label="Labour :"
              />
              <FsxFormikNumericTextBox
                name={`workOrderVehicleTotal.actualLabour`}
                label="Labour :"
              />

              <FsxFormikNumericTextBox
                name={`workOrderVehicleTotal.estimateMaterial`}
                label="Material :"
              />
              <FsxFormikNumericTextBox
                name={`workOrderVehicleTotal.actualMaterial`}
                label="Material :"
              />

              <FsxFormikNumericTextBox
                name={`workOrderVehicleTotal.estimateOther`}
                label="Other :"
              />
              <FsxFormikNumericTextBox name={`workOrderVehicleTotal.actualOther`} label="Other :" />

              <FsxFormikNumericTextBox
                name={`workOrderVehicleTotal.estimateGross`}
                label="Gross :"
              />
              <FsxFormikNumericTextBox name={`workOrderVehicleTotal.actualGross`} label="Gross :" />

              <FsxFormikNumericTextBox
                name={`workOrderVehicleTotal.estimateDiscount`}
                label="Discount :"
              />
              <FsxFormikNumericTextBox
                name={`workOrderVehicleTotal.actualDiscount`}
                label="Discount :"
              />

              <FsxFormikNumericTextBox name={`workOrderVehicleTotal.estimateNet`} label="Net :" />
              <FsxFormikNumericTextBox name={`workOrderVehicleTotal.actualNet`} label="Net :" />
            </div>
          </div>
          {/*End - Work Order Total Details*/}
        </div>
      </div>
      {/** End - Right Group Box **/}

      {/*Start - Tab groups*/}
      <div className="col-span-4">
        <WorkOrderVehicleTab />
      </div>
      {/*End - Tab groups*/}
    </div>
  );
};

export default React.memo(WorkOrderVehicleInformation);
