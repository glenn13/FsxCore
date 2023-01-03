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
import {FsxUri} from '@app/helpers/endpoints';
import InspectionGeneralAssetInfoPreviewFields from './InspectionGeneralAssetInfoPreviewFields';
import InspectionGeneralAssetInspectionDetailsDrawer from './InspectionGeneralAssetInspectionDetailsDrawer';
import InspectionGeneralAssetInspectionDetailsGrid from './InspectionGeneralAssetInspectionDetailsGrid';
import {InspectionGeneralAssetSchema} from '@app/entities/maintenance/inspection/maintenance.inspection.schema';
import http from '@app/services/http.service';
import httpService from '@app/services/http.service';
import {useCustomer} from '@app/services/crm/sales/customers.service';
import {useMaintenanceSchedules} from '@app/services/maintenance/standardentries/maintenanceSchedule.service';
import {useMaintenanceStatuses} from '@app/services/maintenance/standardentries/maintenanceStatus.service';
import {useGeneralAssets} from '@app/services/asset/register/generalasset.service';

const InspectionGeneralAssetEdit = () => {
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

  const {data: customer} = useCustomer(1);

  const {data: generalAssets, isLoading: generalAssetsIsLoading} = useGeneralAssets();

  // const {data: generalAssets, isLoading: generalAssetsIsLoading} = useQuery('generalAssets', () =>
  //   httpService.get(FsxUri.assets.generals.base),
  // );

  const modalSuccess = () => {
    Confirm({
      text: 'Inspection successfully updated',
      confirmButtonText: 'Done',
      icon: 'success',
      onConfirm: () => history.push('/app/maintenance/inspection'),
    });
  };

  const formSubmit = async (value: InspectionGeneralAsset) => {
    await http.patch(`${FsxUri.maintenance.inspectionGeneralAsset.base}/${id}`, value);
    modalSuccess();
  };

  // const {
  //   data: inspectionGeneralAsset,
  //   isLoading: inspectionGeneralAssetIsLoading,
  // } = useQuery('inspectionGeneralAsset', () =>
  //   http.get(`${FsxUri.maintenance.inspectionGeneralAsset.base}/${id}`),
  // );

  const [
    inspectionGeneralAsset,
    setInspectionGeneralAsset,
  ] = React.useState<InspectionGeneralAsset>();

  React.useEffect(() => {
    (async () => {
      const res = await http.get(`${FsxUri.maintenance.inspectionGeneralAsset.base}/${id}`);
      setInspectionGeneralAsset(res.data);
    })();
  }, [id]);

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  if (!inspectionGeneralAsset) return <Loader />;

  const initialValues: InspectionGeneralAsset = {
    id,
    inspectionNumber: inspectionGeneralAsset.inspectionNumber,
    dateIssued: inspectionGeneralAsset.dateIssued,
    dateCompleted: inspectionGeneralAsset.dateCompleted,
    maintenanceScheduleId: inspectionGeneralAsset.maintenanceScheduleId,
    maintenanceStatusId: inspectionGeneralAsset.maintenanceStatusId,
    workOrderGeneralAssetId: 0,
    estimateGeneralAssetId: 0,
    generalAssetId: inspectionGeneralAsset.generalAssetId,
    currentOdometerReading: inspectionGeneralAsset.currentOdometerReading,
    fuelOnReceive: inspectionGeneralAsset.fuelOnReceive,
    fuelOnRelease: inspectionGeneralAsset.fuelOnRelease,
    inspectionGeneralAssetCustomerDetails:
      inspectionGeneralAsset.inspectionGeneralAssetCustomerDetails,
    inspectionGeneralAssetAssignmentAndApproval:
      inspectionGeneralAsset.inspectionGeneralAssetAssignmentAndApproval,
    inspectionGeneralAssetInspectionDetails:
      inspectionGeneralAsset.inspectionGeneralAssetInspectionDetails,
  };

  return (
    <Suspense fallback={<Loader />}>
      <Formik
        initialValues={initialValues}
        validationSchema={InspectionGeneralAssetSchema}
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
                      General Inspection
                      <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
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
                        <FsxFormikInput
                          label="Work No. Reference:"
                          name="workOrderGeneralAssetId"
                        />
                        <FsxFormikInput
                          label="Estimation No. Reference:"
                          name="estimateGeneralAssetId"
                        />
                        {/* <FsxFormikDropDownList
                          label="Work No. Reference:"
                          name="workOrderGeneralAssetId"
                          required
                        />
                        <FsxFormikDropDownList
                          label="Estimation No. Reference:"
                          name="estimateGeneralAssetId"
                          required
                        /> */}
                      </div>
                    </div>
                    <div className="shadow-lg p-4 bg-white rounded">
                      Asset Information
                      <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        <FsxFormikDropDownList
                          label="Asset ID:"
                          name="generalAssetId"
                          dataItemKey="id"
                          textField="assetRefId"
                          data={generalAssets?.data}
                          loading={generalAssetsIsLoading}
                          required
                        />
                        {/* <InspectionGeneralAssetInfoPreviewFields generalAsset={generalAssets?.data}/> */}
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
                      <InspectionGeneralAssetInspectionDetailsGrid
                        formikField="inspectionGeneralAssetInspectionDetails"
                        tableActionOnAdd={() => setIsDrawerOpen(true)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="shadow-lg p-4 bg-white rounded">
                      Customer Details
                      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
                        <FsxFormikInput
                          label="Customer No:"
                          name="inspectionGeneralAssetCustomerDetails.customerId"
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
                          name="inspectionGeneralAssetCustomerDetails.pocName"
                          required
                        />
                        <FsxFormikInput
                          label="(POC) Mobile No.:"
                          name="inspectionGeneralAssetCustomerDetails.pocMobileNumber"
                          required
                        />
                        <FsxFormikInput
                          label="(POC) Email Address:"
                          name="inspectionGeneralAssetCustomerDetails.pocEmailAddress"
                          required
                        />
                      </div>
                    </div>
                    <div className="shadow-lg p-4 bg-white rounded">
                      Assignments and Approvals
                      <div className="grid grid-cols-1 gap-2">
                        <FsxFormikInput
                          label="Prepared By:"
                          name="inspectionGeneralAssetAssignmentAndApproval.preparedById"
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
                          name="inspectionGeneralAssetAssignmentAndApproval.performedById"
                          required
                        />
                        <FsxFormikDropDownList
                          label="Noted/Confirmed By:"
                          name="inspectionGeneralAssetAssignmentAndApproval.notedOrConfirmedById"
                          required
                        /> */}
                        <FsxFormikTextArea
                          label="Additional Remarks"
                          name="inspectionGeneralAssetAssignmentAndApproval.additionalRemarks"
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
              <InspectionGeneralAssetInspectionDetailsDrawer
                callBack={() => setIsDrawerOpen(false)}
              />
            </FsxDrawer>
          </>
        )}
      </Formik>
    </Suspense>
  );
};

export default InspectionGeneralAssetEdit;
