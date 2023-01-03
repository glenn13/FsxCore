import {Form, Formik} from 'formik';
import {FsxDrawer, Loader} from '@app/components/common';
import {
  FsxFormikDatePicker,
  FsxFormikDropDownList,
  FsxFormikInput,
  FsxFormikRadialNewItemMenu,
  FsxFormikTextArea,
} from '@app/components/common/FsxFormik';
import React, {Suspense} from 'react';
import {useHistory, useParams} from 'react-router-dom';

import {Confirm} from '@app/components/common/Alert';
import FsxInput from '@app/components/common/FsxInput';
import InspectionVehicleAssetInfoPreviewFields from './InspectionVehicleAssetInfoPreviewFields';
import InspectionVehicleInspectionDetailsDrawer from './InspectionVehicleInspectionDetailsDrawer';
import InspectionVehicleInspectionDetailsGrid from './InspectionVehicleInspectionDetailsGrid';
import {InspectionVehicleSchema} from '@app/entities/maintenance/inspection/maintenance.inspection.schema';
import {getVehicles} from '@app/services/asset/vehicles.service';
import http from '@app/services/http.service';
import uri from '@app/helpers/endpoints';
import {useCustomer} from '@app/services/crm/sales/customers.service';
import {useMaintenanceSchedules} from '@app/services/maintenance/standardentries/maintenanceSchedule.service';
import {useMaintenanceStatuses} from '@app/services/maintenance/standardentries/maintenanceStatus.service';
import {useVehicles} from '@app/services/asset/register/vehicle.service';

const InspectionVehicleEdit = () => {
  let history = useHistory();
  let {id} = useParams<any>();

  const {
    data: maintenanceSchedules,
    isLoading: maintenanceSchedulesIsLoading,
  } = useMaintenanceSchedules();

  const {
    data: maintenanceStatuses,
    isLoading: maintenanceStatusesIsLoading,
  } = useMaintenanceStatuses();

  const {data: vehicles, isLoading: vehiclesIsLoading} = useVehicles();

  const {data: customer} = useCustomer(1);

  // const {
  //   data: inspectionVehicle,
  //   isLoading: inspectionVehicleIsLoading,
  // } = useQuery('inspectionVehicleEdit', () =>
  //   http.get(`${uri.maintenance.inspectionVehicle.base}/${id}`),
  // );

  const [inspectionVehicle, setInspectionVehicle] = React.useState<InspectionVehicle>();

  React.useEffect(() => {
    (async () => {
      const res = await http.get(`${uri.maintenance.inspectionVehicle.base}/${id}`);
      setInspectionVehicle(res.data);
    })();
  }, [id]);

  const modalSuccess = () => {
    Confirm({
      text: 'Inspection successfully updated',
      confirmButtonText: 'Done',
      icon: 'success',
      onConfirm: () => history.push('/app/maintenance/inspection'),
    });
  };

  const formSubmit = async (value: InspectionVehicle) => {
    await http.patch(`${uri.maintenance.inspectionVehicle.base}/${id}`, value);
    modalSuccess();
  };

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  if (!inspectionVehicle) return <Loader />;

  const initialValues: InspectionVehicle = {
    id,
    inspectionNumber: inspectionVehicle.inspectionNumber,
    dateIssued: inspectionVehicle.dateIssued,
    dateCompleted: inspectionVehicle.dateCompleted,
    maintenanceScheduleId: inspectionVehicle.maintenanceScheduleId,
    maintenanceStatusId: inspectionVehicle.maintenanceStatusId,
    workOrderVehicleId: inspectionVehicle.workOrderVehicleId,
    estimateVehicleId: inspectionVehicle.estimateVehicleId,
    vehicleId: inspectionVehicle.vehicleId,
    currentOdometerReading: inspectionVehicle.currentOdometerReading,
    fuelOnReceive: inspectionVehicle.fuelOnReceive,
    fuelOnRelease: inspectionVehicle.fuelOnRelease,
    inspectionVehicleCustomerDetails: inspectionVehicle.inspectionVehicleCustomerDetails,
    inspectionVehicleAssignmentAndApproval:
      inspectionVehicle.inspectionVehicleAssignmentAndApproval,
    inspectionVehicleInspectionDetails: inspectionVehicle.inspectionVehicleInspectionDetails,
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
              <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="col-span-3">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="shadow-lg p-4 bg-white rounded">
                      Vehicle Inspection
                      <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                        />
                        <FsxFormikDropDownList
                          label="Estimation No. Reference:"
                          name="estimateVehicleId"
                          required
                        /> */}
                      </div>
                    </div>
                    <div className="shadow-lg p-4 bg-white rounded">
                      Asset Information
                      <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

                    <div className="shadow-lg p-4 bg-white rounded">
                      Inspection Details
                      <InspectionVehicleInspectionDetailsGrid
                        formikField="inspectionVehicleInspectionDetails"
                        tableActionOnAdd={() => setIsDrawerOpen(true)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="shadow-lg p-4 bg-white rounded">
                      Customer Details
                      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                        <FsxFormikInput
                          label="Customer No:"
                          name="inspectionVehicleCustomerDetails.customerId"
                          readOnly
                        />
                        <FsxInput
                          label="Customer Type:"
                          name="customerType"
                          value={customer?.data.customerType?.title}
                          readOnly
                        />
                        <FsxInput
                          className="col-span-2"
                          label="Customer Name:"
                          name="customerName"
                          value={customer?.data.name}
                          readOnly
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
                    <div className="shadow-lg p-4 bg-white rounded">
                      Assignments and Approvals
                      <div className="grid grid-cols-1 gap-4">
                        <FsxFormikInput
                          label="Prepared By:"
                          name="inspectionVehicleAssignmentAndApproval.preparedById"
                          readOnly
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

export default InspectionVehicleEdit;
