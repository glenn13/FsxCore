import React from 'react';
import * as yup from 'yup';
import {FormikProps, Form, Formik} from 'formik';
import {RadialItem} from '@app/store/app/types';
import {StoreDispatch} from '@app/store/rootReducer';
import {Loader} from '@app/components/common';
import {useDispatch} from 'react-redux';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import {Confirm} from '@app/components/common/Alert';
import {AssetCategoryEnum} from '@app/helpers/asset/enum';
import {generateUUID} from '@app/helpers/randoms';
import {
  setWorkOrderVehicleAdditionalCharges,
  initWorkOrderVehicleAdditionalCharge,
} from '@app/store/maintenance/workorder/vehicleAdditionalCharge.reducers';
import {
  setWorkOrderVehicleDocumentAttachments,
  initWorkOrderVehicleDocumentAttachment,
} from '@app/store/maintenance/workorder/vehicleDocumentAttachment.reducers';
import {
  setWorkOrderVehicleImageAttachments,
  initWorkOrderVehicleImageAttachment,
} from '@app/store/maintenance/workorder/vehicleImageAttachment.reducers';
import {
  setWorkOrderVehicleMaterials,
  initWorkOrderVehicleMaterial,
} from '@app/store/maintenance/workorder/vehicleMaterial.reducers';
import {
  submitWorkOrderVehicle,
  submitWorkOrderVehicleDetails,
} from '@app/store/maintenance/workorder/vehicle.actions';
import {getVehicleFullInfo} from '@app/services/asset/register/vehicle.service';
import WorkOrderVehicleInformation from '@app/views/maintenance/WorkOrder/vehicle/WorkOrderVehicleInformation';
import WorkOrderVehicle, {
  workOrderVehicleShape,
} from '@app/entities/maintenance/workorder/WorkOrderVehicle';

interface RouteProps {
  id: string;
}

export interface NewWorkOrderVehicleRouteProps {}

const NewWorkOrderVehicleRoute: React.FC<NewWorkOrderVehicleRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const formikRef = React.useRef<FormikProps<WorkOrderVehicle>>(null);
  const id = route.params.id;

  const modalSuccess = () => {
    Confirm({
      text: 'Work order vehicle successfully saved',
      confirmButtonText: 'Done',
      icon: 'success',
      onConfirm: () => history.push('/app/maintenance/workorder'),
    });
  };

  const modalDanger = () => {
    Confirm({
      text: 'Error occur while saving primary information',
      confirmButtonText: 'Done',
      icon: 'error',
    });
  };

  const handleSubmit = async (workOrderVehicle: WorkOrderVehicle) => {
    dispatch(submitWorkOrderVehicle(workOrderVehicle))
      .then(response => {
        const _workOrderVehicleId =
          workOrderVehicle.vehicleId === 0 ? Number(response.data) : workOrderVehicle.vehicleId;
        if (_workOrderVehicleId > 0) {
          dispatch(submitWorkOrderVehicleDetails(_workOrderVehicleId));
          modalSuccess();
        }
      })
      .catch(e => {
        console.log(e);
        modalDanger();
      });
  };

  React.useEffect(() => {
    const radialItems: RadialItem[] = [
      {onClick: () => formikRef.current?.submitForm(), icon: 'check', title: 'Save'},
      {icon: 'cross', title: 'Cancel', onClick: () => history.goBack()},
      {icon: 'save-print', title: 'Save & Print'},
    ];
    radialMenu.generate(radialItems);
  }, [radialMenu, history]);

  const [workOrderVehicle, setWorkOrderVehicle] = React.useState<WorkOrderVehicle>();

  React.useEffect(() => {
    getVehicleFullInfo(id).then(response => {
      let _wordOrderVehicle: WorkOrderVehicle = {
        id: 0,

        //Primary Details
        currencyId: 0,
        exchangeRate: 0,
        maintenanceDepartmentId: 0,
        maintenanceLocationId: 0,
        onSiteNumber: '',
        priorityLevelId: 0,
        referenceCustomerOrderNumber: '',
        referenceEstimationNumber: '',
        referenceSalesInvoiceNumber: '',
        repairStatusId: 0,
        reWorkReferenceNumber: '',
        workOrderNumber: generateUUID(true).toUpperCase(),
        workOrderStatusId: 0,
        workOrderTypeId: 0,

        //Asset Information
        currentOdometerReading: 0,
        fuelPercentOnReceive: 0,
        fuelPercentOnRelease: 0,
        vehicleId: parseInt(id),

        //Technical Narative
        customerConcerns: '',
        findingsAndInstructions: '',
        safetyNotes: '',
        assetCategoryId: Number(AssetCategoryEnum.Vehicle),

        vehicle: response.data,
      };

      setWorkOrderVehicle(_wordOrderVehicle);
    });
  }, [dispatch, id]);

  /*
   * Added this when a page is being un-mount, all models will be initialize.
   * This is the fix when a user edit a certain record and suddenly click the main menu and load the initial grid view,
   * upon creating new transaction, previous data still mount in the reducer.
   */
  React.useEffect(() => {
    dispatch(setWorkOrderVehicleAdditionalCharges(initWorkOrderVehicleAdditionalCharge));
    dispatch(setWorkOrderVehicleDocumentAttachments(initWorkOrderVehicleDocumentAttachment));
    dispatch(setWorkOrderVehicleImageAttachments(initWorkOrderVehicleImageAttachment));
    dispatch(setWorkOrderVehicleMaterials(initWorkOrderVehicleMaterial));
  }, [dispatch]);

  if (!workOrderVehicle) return <Loader />;
  console.log(workOrderVehicle);

  return (
    <Formik
      validationSchema={yup.object().shape(workOrderVehicleShape)}
      validateOnChange={false}
      initialValues={workOrderVehicle}
      onSubmit={handleSubmit}
      innerRef={formikRef}>
      <Form>
        <React.Suspense fallback={<Loader />}>
          <WorkOrderVehicleInformation isEdit={false} />
        </React.Suspense>
      </Form>
    </Formik>
  );
};

export default NewWorkOrderVehicleRoute;
