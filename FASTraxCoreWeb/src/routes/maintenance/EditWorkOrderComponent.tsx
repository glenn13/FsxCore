import * as yup from 'yup';

import {Form, Formik, FormikProps} from 'formik';
import React, {Suspense} from 'react';
import WorkOrderComponent, {
  workOrderComponentShape,
} from '@app/entities/maintenance/workorder/WorkOrderComponent';
import {
  loadWorkOrderComponentAdditionalCharge,
  loadWorkOrderComponentDocumentAttachments,
  loadWorkOrderComponentImageAttachments,
  loadWorkOrderComponentMaterials,
  submitWorkOrderComponent,
  submitWorkOrderComponentDetails,
} from '@app/store/maintenance/workorder/component.actions';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {Confirm} from '@app/components/common/Alert';
import {Loader} from '@app/components/common';
import {RadialItem} from '@app/store/app/types';
import {StoreDispatch} from '@app/store/rootReducer';
import WorkOrderComponentInformation from '@app/views/maintenance/WorkOrder/component/WorkOrderComponentInformation';
import {getWorkOrderComponentFullInfo} from '@app/services/maintenance/workordercomponent.service';
import {useDispatch} from 'react-redux';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import {
  setWorkOrderComponentAdditionalCharges,
  initWorkOrderComponentAdditionalCharge,
} from '@app/store/maintenance/workorder/componentAdditionalCharge.reducers';
import {
  setWorkOrderComponentDocumentAttachments,
  initWorkOrderComponentDocumentAttachment,
} from '@app/store/maintenance/workorder/componentDocumentAttachment.reducers';
import {
  setWorkOrderComponentImageAttachments,
  initWorkOrderComponentImageAttachment,
} from '@app/store/maintenance/workorder/componentImageAttachment.reducers';
import {
  setWorkOrderComponentMaterials,
  initWorkOrderComponentMaterial,
} from '@app/store/maintenance/workorder/componentMaterial.reducers';
interface RouteProps {
  id: string;
}

export interface EditWorkOrderComponentRouteProps {}

const EditWorkOrderComponentRoute: React.FC<EditWorkOrderComponentRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const id = route.params.id;
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const formikRef = React.useRef<FormikProps<WorkOrderComponent>>(null);
  const [varWorkOrderComponent, setWorkOrderComponent] = React.useState<WorkOrderComponent>();

  React.useEffect(() => {
    getWorkOrderComponentFullInfo(id).then(response => setWorkOrderComponent(response.data));
    dispatch(loadWorkOrderComponentAdditionalCharge(id));
    dispatch(loadWorkOrderComponentDocumentAttachments(id));
    dispatch(loadWorkOrderComponentImageAttachments(id));
    dispatch(loadWorkOrderComponentMaterials(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const modalSuccess = () => {
    Confirm({
      text: 'Work order component successfully saved',
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

  const handleSubmit = async (workOrderComponent: WorkOrderComponent) => {
    dispatch(submitWorkOrderComponent(workOrderComponent))
      .then(response => {
        dispatch(submitWorkOrderComponentDetails(Number(id)));
        modalSuccess();
      })
      .catch(() => {
        modalDanger();
      });
  };

  React.useEffect(() => {
    if (!varWorkOrderComponent) return;

    const radialItems: RadialItem[] = [
      {onClick: () => formikRef.current?.submitForm(), icon: 'check', title: 'Save'},
      {icon: 'cross', title: 'Cancel', onClick: () => history.goBack()},
      {icon: 'save-print', title: 'Save & Print'},
    ];
    radialMenu.generate(radialItems);
  }, [dispatch, radialMenu, varWorkOrderComponent, history]);

  React.useEffect(() => {
    dispatch(setWorkOrderComponentAdditionalCharges(initWorkOrderComponentAdditionalCharge));
    dispatch(setWorkOrderComponentDocumentAttachments(initWorkOrderComponentDocumentAttachment));
    dispatch(setWorkOrderComponentImageAttachments(initWorkOrderComponentImageAttachment));
    dispatch(setWorkOrderComponentMaterials(initWorkOrderComponentMaterial));
  }, [dispatch]);

  if (!varWorkOrderComponent) return <Loader />;

  return (
    <Formik
      validationSchema={yup.object().shape(workOrderComponentShape)}
      validateOnChange={false}
      initialValues={varWorkOrderComponent}
      onSubmit={handleSubmit}
      innerRef={formikRef}>
      <Form>
        <Suspense fallback={<Loader />}>
          <WorkOrderComponentInformation isEdit={true} />
        </Suspense>
      </Form>
    </Formik>
  );
};

export default EditWorkOrderComponentRoute;
