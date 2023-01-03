import {Form, Formik} from 'formik';
import {FsxDrawer, Loader} from '@app/components/common';
import React, {Suspense} from 'react';

import {Confirm} from '@app/components/common/Alert';
import FsxFormikDatePicker from '@app/components/common/FsxFormik/FsxFormikDatePicker';
import FsxFormikDropDownList from '@app/components/common/FsxFormik/FsxFormikDropDownList';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';
import FsxFormikRadialNewItemMenu from '@app/components/common/FsxFormik/FsxFormikRadialNewItemMenu';
import FsxFormikTextArea from '@app/components/common/FsxFormik/FsxFormikTextArea';
import FsxInput from '@app/components/common/FsxInput';
import InspectionVehicleAssetInfoPreviewFields from './InspectionVehicleAssetInfoPreviewFields';
import InspectionVehicleInspectionDetailsDrawer from './InspectionVehicleInspectionDetailsDrawer';
import InspectionVehicleInspectionDetailsGrid from './InspectionVehicleInspectionDetailsGrid';
import {InspectionVehicleSchema} from '@app/entities/maintenance/inspection/maintenance.inspection.schema';
import {generateUUID} from '@app/helpers/randoms';
import http from '@app/services/http.service';
import uri from '@app/helpers/endpoints';
import {useCustomer} from '@app/services/crm/sales/customers.service';
import {useHistory} from 'react-router-dom';
import {useMaintenanceSchedules} from '@app/services/maintenance/standardentries/maintenanceSchedule.service';
import {useMaintenanceStatuses} from '@app/services/maintenance/standardentries/maintenanceStatus.service';
import {useVehicleSummaryForGrid} from '@app/services/asset/register/vehicle.service';

// import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';

const InspectionVehicleNew = () => {
  let history = useHistory();

  const {
    data: maintenanceSchedules,
    isLoading: maintenanceSchedulesIsLoading,
  } = useMaintenanceSchedules();

  const {
    data: maintenanceStatuses,
    isLoading: maintenanceStatusesIsLoading,
  } = useMaintenanceStatuses();

  const {data: vehicles, isLoading: vehiclesIsLoading} = useVehicleSummaryForGrid();

  const {data: customer} = useCustomer(1);

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const modalSuccess = () => {
    Confirm({
      text: 'Inspection successfully created',
      confirmButtonText: 'Done',
      icon: 'success',
      onConfirm: () => history.push('/app/maintenance/inspection'),
    });
  };

  const formSubmit = async (value: InspectionVehicle) => {
    await http.post(uri.maintenance.inspectionVehicle.base, value);
    modalSuccess();
  };

  const initialValues: InspectionVehicle = {
    inspectionNumber: generateUUID(true).toUpperCase(),
    dateIssued: new Date(),
    dateCompleted: null,
    maintenanceScheduleId: null,
    maintenanceStatusId: null,
    workOrderVehicleId: 0,
    estimateVehicleId: 0,
    vehicleId: null,
    currentOdometerReading: '',
    fuelOnReceive: '',
    fuelOnRelease: '',
    inspectionVehicleCustomerDetails: {
      customerId: 1,
      pocName: '',
      pocMobileNumber: '',
      pocEmailAddress: '',
    },
    inspectionVehicleAssignmentAndApproval: {
      preparedById: 1,
      performedById: 1,
      notedOrConfirmedById: 1,
      additionalRemarks: 'Test',
    },
    inspectionVehicleInspectionDetails: [],
  };

  return (
    <Suspense fallback={<Loader />}>
      <Formik
        initialValues={initialValues}
        validationSchema={InspectionVehicleSchema}
        onSubmit={value => {
          formSubmit(value);
        }}>
        {() => (
          <>
            <Form>
              <FsxFormikRadialNewItemMenu />
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                <div className="col-span-3">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-white rounded shadow-lg">
                      Vehicle Inspection
                      <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                        <FsxFormikInput
                          label="Inspection No:"
                          name="inspectionNumber"
                          type="text"
                        />
                        <FsxFormikDatePicker label="Date Issued:" name="dateIssued" />
                        <FsxFormikDropDownList
                          label="Schedule:"
                          name="maintenanceScheduleId"
                          dataItemKey="id"
                          textField="title"
                          loading={maintenanceSchedulesIsLoading}
                          data={maintenanceSchedules?.data}
                          required
                        />
                        <FsxFormikDatePicker label="Date Completed:" name="dateCompleted" />
                        <FsxFormikDropDownList
                          label="Status:"
                          name="maintenanceStatusId"
                          dataItemKey="id"
                          textField="title"
                          data={maintenanceStatuses?.data}
                          loading={maintenanceStatusesIsLoading}
                          required
                        />
                        <FsxFormikInput label="Work No. Reference:" name="workOrderVehicleId" />
                        <FsxFormikInput
                          label="Estimation No. Reference:"
                          name="estimateVehicleId"
                        />
                        {/* <FsxFormikDropDownList
                          label="Work No. Reference:"
                          name="workOrderVehicleId"
                          required
                        /> */}
                        {/* <FsxFormikDropDownList
                          label="Estimation No. Reference:"
                          name="estimateVehicleId"
                          required
                        /> */}
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded shadow-lg">
                      Asset Information
                      <div className="grid gap-2 sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-4">
                        <FsxFormikDropDownList
                          label="Asset ID:"
                          name="vehicleId"
                          dataItemKey="id"
                          textField="assetRefId"
                          data={vehicles?.data}
                          loading={vehiclesIsLoading}
                          required
                        />
                        {/* <InspectionVehicleAssetInfoPreviewFields vehicles={vehicles?.data} /> */}
                        <FsxFormikInput
                          label="Current Odometer Reading:"
                          name="currentOdometerReading"
                          required
                        />
                        <FsxFormikInput label="Fuel % On Receive:" name="fuelOnReceive" required />
                        <FsxFormikInput label="Fuel % On Release:" name="fuelOnRelease" required />
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded shadow-lg">
                      Inspection Details
                      <InspectionVehicleInspectionDetailsGrid
                        formikField="inspectionVehicleInspectionDetails"
                        tableActionOnAdd={() => setIsDrawerOpen(true)}
                        new
                      />
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-white rounded shadow-lg">
                      Customer Details
                      <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2">
                        <FsxFormikInput
                          label="Customer No:"
                          name="inspectionVehicleCustomerDetails.customerId"
                          readOnly
                          disabled
                        />
                        <FsxInput
                          label="Customer Type:"
                          name="customerType"
                          value={customer?.data.customerType?.title}
                          readOnly
                          disabled
                        />
                        <FsxInput
                          className="col-span-2"
                          label="Customer Name:"
                          name="customerName"
                          value={customer?.data.name}
                          readOnly
                          disabled
                        />
                        <FsxFormikInput
                          className="col-span-2"
                          label="(POC) Name:"
                          name="inspectionVehicleCustomerDetails.pocName"
                          required
                        />
                        <FsxFormikInput
                          label="(POC) Mobile No.:"
                          name="inspectionVehicleCustomerDetails.pocMobileNumber"
                          required
                        />
                        <FsxFormikInput
                          label="(POC) Email Address:"
                          name="inspectionVehicleCustomerDetails.pocEmailAddress"
                          required
                        />
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded shadow-lg">
                      Assignments and Approvals
                      <div className="grid grid-cols-1 gap-2">
                        <FsxFormikInput
                          label="Prepared By:"
                          name="inspectionVehicleAssignmentAndApproval.preparedById"
                          disabled
                        />
                        <FsxFormikInput
                          label="Performed By:"
                          name="inspectionVehicleAssignmentAndApproval.performedById"
                          disabled
                        />
                        <FsxFormikInput
                          label="Noted/Confirmed By:"
                          name="inspectionVehicleAssignmentAndApproval.notedOrConfirmedById"
                          disabled
                        />
                        {/* <FsxFormikDropDownList
                          label="Performed By:"
                          name="inspectionVehicleAssignmentAndApproval.performedById"
                          required
                        />
                        <FsxFormikDropDownList
                          label="Noted/Confirmed By:"
                          name="inspectionVehicleAssignmentAndApproval.notedOrConfirmedById"
                          required
                        /> */}
                        <FsxFormikTextArea
                          label="Additional Remarks"
                          name="inspectionVehicleAssignmentAndApproval.additionalRemarks"
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
            <FsxDrawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              title="Inspection Area List">
              <InspectionVehicleInspectionDetailsDrawer callBack={() => setIsDrawerOpen(false)} />
            </FsxDrawer>
          </>
        )}
      </Formik>
    </Suspense>
  );
};

export default InspectionVehicleNew;
