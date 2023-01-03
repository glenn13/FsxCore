import * as yup from 'yup';

import {Form, Formik, FormikProps} from 'formik';
import WorkOrderVehicle, {
  workOrderVehicleShape,
} from '@app/entities/maintenance/workorder/WorkOrderVehicle';
import {
  loadWorkOrderVehicleAdditionalCharge,
  loadWorkOrderVehicleDocumentAttachments,
  loadWorkOrderVehicleImageAttachments,
  loadWorkOrderVehicleMaterials,
  submitWorkOrderVehicle,
  submitWorkOrderVehicleDetails,
} from '@app/store/maintenance/workorder/vehicle.actions';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {Confirm} from '@app/components/common/Alert';
import {Loader} from '@app/components/common';
import {RadialItem} from '@app/store/app/types';
import React from 'react';
import {StoreDispatch} from '@app/store/rootReducer';
import WorkOrderVehicleInformation from '@app/views/maintenance/WorkOrder/vehicle/WorkOrderVehicleInformation';
import {getWorkOrderVehicleFullInfo} from '@app/services/maintenance/workordervehicle.service';
import {useDispatch} from 'react-redux';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
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

interface RouteProps {
  id: string;
}

export interface EditWorkOrderVehicleRouteProps {}

const EditWorkOrderVehicleRoute: React.FC<EditWorkOrderVehicleRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const id = route.params.id;
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const formikRef = React.useRef<FormikProps<WorkOrderVehicle>>(null);
  const [varWorkOrderVehicle, setWorkOrderVehicle] = React.useState<WorkOrderVehicle>();

  React.useEffect(() => {
    getWorkOrderVehicleFullInfo(id).then(response => setWorkOrderVehicle(response.data));
    dispatch(loadWorkOrderVehicleAdditionalCharge(id));
    dispatch(loadWorkOrderVehicleDocumentAttachments(id));
    dispatch(loadWorkOrderVehicleImageAttachments(id));
    dispatch(loadWorkOrderVehicleMaterials(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const modalSuccess = () => {
    Confirm({
      text: 'Work order vehicle successfully saved',
      confirmButtonText: 'Done',
      icon: 'success',
      onConfirm: () => history.goBack(),
    });
  };

  const modalDanger = () => {
    Confirm({
      text: 'Error occur while saving primary information',
      confirmButtonText: 'Close',
      icon: 'error',
    });
  };

  const handleSubmit = async (workOrderVehicle: WorkOrderVehicle) => {
    dispatch(submitWorkOrderVehicle(workOrderVehicle))
      .then(response => {
        dispatch(submitWorkOrderVehicleDetails(Number(id)));
        modalSuccess();
      })
      .catch(() => {
        modalDanger();
      });
  };

  React.useEffect(() => {
    if (!varWorkOrderVehicle) return;

    const radialItems: RadialItem[] = [
      {onClick: () => formikRef.current?.submitForm(), icon: 'check', title: 'Save'},
      {icon: 'cross', title: 'Cancel', onClick: () => history.goBack()},
      {icon: 'save-print', title: 'Save & Print'},
    ];
    radialMenu.generate(radialItems);
  }, [dispatch, radialMenu, varWorkOrderVehicle, history]);

  React.useEffect(() => {
    dispatch(setWorkOrderVehicleAdditionalCharges(initWorkOrderVehicleAdditionalCharge));
    dispatch(setWorkOrderVehicleDocumentAttachments(initWorkOrderVehicleDocumentAttachment));
    dispatch(setWorkOrderVehicleImageAttachments(initWorkOrderVehicleImageAttachment));
    dispatch(setWorkOrderVehicleMaterials(initWorkOrderVehicleMaterial));
  }, [dispatch]);

  if (!varWorkOrderVehicle) return <Loader />;

  return (
    <Formik
      validationSchema={yup.object().shape(workOrderVehicleShape)}
      validateOnChange={false}
      initialValues={varWorkOrderVehicle}
      onSubmit={handleSubmit}
      innerRef={formikRef}>
      <Form>
        <React.Suspense fallback={<Loader />}>
          <WorkOrderVehicleInformation isEdit={true} />
        </React.Suspense>
      </Form>
    </Formik>
  );
};

export default EditWorkOrderVehicleRoute;
