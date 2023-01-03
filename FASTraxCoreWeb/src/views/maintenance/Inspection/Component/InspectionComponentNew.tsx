import {Form, Formik} from 'formik';
import {FsxDrawer, Loader} from '@app/components/common';
import {
  FsxFormikDatePicker,
  FsxFormikDropDownList,
  FsxFormikInput,
  FsxFormikRadialNewItemMenu,
  FsxFormikTextArea,
} from '@app/components/common/FsxFormik/';
import React, {Suspense} from 'react';

import {Confirm} from '@app/components/common/Alert';
import FsxInput from '@app/components/common/FsxInput';
import FsxUri from '@app/helpers/endpoints';
import InspectionComponentAssetInfoPreviewFields from './InspectionComponentAssetInfoPreviewFields';
import InspectionComponentInspectionDetailsDrawer from './InspectionComponentInspectionDetailsDrawer';
import InspectionComponentInspectionDetailsGrid from './InspectionComponentInspectionDetailsGrid';
import {InspectionComponentSchema} from '@app/entities/maintenance/inspection/maintenance.inspection.schema';
import {generateUUID} from '@app/helpers/randoms';
import httpService from '@app/services/http.service';
import {useCustomer} from '@app/services/crm/sales/customers.service';
import {useHistory} from 'react-router-dom';
import {useMaintenanceSchedules} from '@app/services/maintenance/standardentries/maintenanceSchedule.service';
import {useMaintenanceStatuses} from '@app/services/maintenance/standardentries/maintenanceStatus.service';
import {useQuery} from 'react-query';
import {useComponentSummaryForGrid} from '@app/services/asset/register/component.service';

const InspectionComponentNew = () => {
  let history = useHistory();

  const initialValues: InspectionComponent = {
    inspectionNumber: generateUUID(true).toUpperCase(),
    dateIssued: new Date(),
    dateCompleted: null,
    maintenanceScheduleId: null,
    maintenanceStatusId: null,
    workOrderComponentId: 0,
    estimateComponentId: 0,
    componentId: null,
    inspectionComponentCustomerDetails: {
      customerId: 1,
      pocName: '',
      pocMobileNumber: '',
      pocEmailAddress: '',
    },
    inspectionComponentAssignmentAndApproval: {
      preparedById: 1,
      performedById: 1,
      notedOrConfirmedById: 1,
    },
    inspectionComponentInspectionDetails: [],
  };

  const {
    data: maintenanceSchedules,
    isLoading: maintenanceSchedulesIsLoading,
  } = useMaintenanceSchedules();

  const {
    data: maintenanceStatuses,
    isLoading: maintenanceStatusesIsLoading,
  } = useMaintenanceStatuses();

  const {data: customer} = useCustomer(1);

  const {data: components, isLoading: componentsIsLoading} = useComponentSummaryForGrid();

  const modalSuccess = () => {
    Confirm({
      text: 'Inspection successfully created',
      confirmButtonText: 'Done',
      icon: 'success',
      onConfirm: () => history.push('/app/maintenance/inspection'),
    });
  };

  const formSubmit = async (value: InspectionComponent) => {
    await httpService.post(FsxUri.maintenance.inspectionComponent.base, value);
    modalSuccess();
  };

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  return (
    <Suspense fallback={<Loader />}>
      <Formik
        initialValues={initialValues}
        validationSchema={InspectionComponentSchema}
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
                      Component Inspection
                      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                        <FsxFormikInput label="Work No. Reference:" name="workOrderComponentId" />
                        <FsxFormikInput
                          label="Estimation No. Reference:"
                          name="estimateComponentId"
                        />
                        {/* <FsxFormikDropDownList
                          label="Work No. Reference:"
                          name="workOrderComponentId"
                          required
                        />
                        <FsxFormikDropDownList
                          label="Estimation No. Reference:"
                          name="estimateComponentId"
                          required
                        /> */}
                      </div>
                    </div>
                    <div className="shadow-lg p-4 bg-white rounded">
                      Asset Information
                      <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <FsxFormikDropDownList
                          label="Asset ID:"
                          name="componentId"
                          dataItemKey="id"
                          textField="assetRefId"
                          data={components?.data}
                          loading={componentsIsLoading}
                          required
                        />
                        {/* <InspectionComponentAssetInfoPreviewFields components={components?.data} /> */}
                      </div>
                    </div>
                    <div className="shadow-lg p-4 bg-white rounded">
                      Inspection Details
                      <InspectionComponentInspectionDetailsGrid
                        formikField="inspectionComponentInspectionDetails"
                        tableActionOnAdd={() => setIsDrawerOpen(true)}
                        new
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
                          name="inspectionComponentCustomerDetails.customerId"
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
                          name="inspectionComponentCustomerDetails.pocName"
                          required
                        />
                        <FsxFormikInput
                          label="(POC) Mobile No.:"
                          name="inspectionComponentCustomerDetails.pocMobileNumber"
                          required
                        />
                        <FsxFormikInput
                          label="(POC) Email Address:"
                          name="inspectionComponentCustomerDetails.pocEmailAddress"
                          required
                        />
                      </div>
                    </div>
                    <div className="shadow-lg p-4 bg-white rounded">
                      Assignments and Approvals
                      <div className="grid grid-cols-1 gap-4">
                        <FsxFormikInput
                          label="Prepared By:"
                          name="inspectionComponentAssignmentAndApproval.preparedById"
                          readOnly
                        />
                        <FsxFormikInput
                          label="Performed By:"
                          name="inspectionComponentAssignmentAndApproval.performedById"
                          disabled
                        />
                        <FsxFormikInput
                          label="Noted/Confirmed By:"
                          name="inspectionComponentAssignmentAndApproval.notedOrConfirmedById"
                          disabled
                        />
                        {/* <FsxFormikDropDownList
                          label="Performed By:"
                          name="inspectionComponentAssignmentAndApproval.performedById"
                          required
                        />
                        <FsxFormikDropDownList
                          label="Noted/Confirmed By:"
                          name="inspectionComponentAssignmentAndApproval.notedOrConfirmedById"
                          required
                        /> */}
                        <FsxFormikTextArea
                          label="Additional Remarks"
                          name="inspectionComponentAssignmentAndApproval.additionalRemarks"
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
              <InspectionComponentInspectionDetailsDrawer callBack={() => setIsDrawerOpen(false)} />
            </FsxDrawer>
          </>
        )}
      </Formik>
    </Suspense>
  );
};

export default InspectionComponentNew;
