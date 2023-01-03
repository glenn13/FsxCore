import * as yup from 'yup';

import {Form, Formik, FormikProps} from 'formik';
import React, {Suspense} from 'react';
import WorkOrderGeneralAsset, {
  workOrderGeneralAssetShape,
} from '@app/entities/maintenance/workorder/WorkOrderGeneralAsset';
import {
  loadWorkOrderGeneralAssetAdditionalCharge,
  loadWorkOrderGeneralAssetDocumentAttachments,
  loadWorkOrderGeneralAssetImageAttachments,
  loadWorkOrderGeneralAssetMaterials,
  submitWorkOrderGeneralAsset,
  submitWorkOrderGeneralAssetDetails,
} from '@app/store/maintenance/workorder/generalAsset.actions';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {Confirm} from '@app/components/common/Alert';
import {Loader} from '@app/components/common';
import {RadialItem} from '@app/store/app/types';
import {StoreDispatch} from '@app/store/rootReducer';
import WorkOrderGeneralAssetInformation from '@app/views/maintenance/WorkOrder/generalasset/WorkOrderGeneralAssetInformation';
import {getWorkOrderGeneralAssetFullInfo} from '@app/services/maintenance/workordergeneralasset.service';
import {useDispatch} from 'react-redux';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import {setWorkOrderGeneralAssetAdditionalCharges} from '@app/store/maintenance/workorder/generalAssetAdditionalCharge.reducers';
import {setWorkOrderGeneralAssetDocumentAttachments} from '@app/store/maintenance/workorder/generalAssetDocumentAttachment.reducers';
import {setWorkOrderGeneralAssetImageAttachments} from '@app/store/maintenance/workorder/generalAssetImageAttachment.reducers';
import {setWorkOrderGeneralAssetMaterials} from '@app/store/maintenance/workorder/generalAssetMaterial.reducers';

interface RouteProps {
  id: string;
}

export interface EditWorkOrderGeneralAssetRouteProps {}

const EditWorkOrderGeneralAssetRoute: React.FC<EditWorkOrderGeneralAssetRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const id = route.params.id;
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const formikRef = React.useRef<FormikProps<WorkOrderGeneralAsset>>(null);
  const [
    varWorkOrderGeneralAsset,
    setWorkOrderGeneralAsset,
  ] = React.useState<WorkOrderGeneralAsset>();

  React.useEffect(() => {
    getWorkOrderGeneralAssetFullInfo(id).then(response => setWorkOrderGeneralAsset(response.data));
    dispatch(loadWorkOrderGeneralAssetAdditionalCharge(id));
    dispatch(loadWorkOrderGeneralAssetDocumentAttachments(id));
    dispatch(loadWorkOrderGeneralAssetImageAttachments(id));
    dispatch(loadWorkOrderGeneralAssetMaterials(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const modalSuccess = () => {
    Confirm({
      text: 'Work order general asset successfully saved',
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

  const handleSubmit = async (workOrderGeneralAsset: WorkOrderGeneralAsset) => {
    dispatch(submitWorkOrderGeneralAsset(workOrderGeneralAsset))
      .then(response => {
        dispatch(submitWorkOrderGeneralAssetDetails(Number(id)));
        modalSuccess();
      })
      .catch(() => {
        modalDanger();
      });
  };

  React.useEffect(() => {
    if (!varWorkOrderGeneralAsset) return;

    const radialItems: RadialItem[] = [
      {onClick: () => formikRef.current?.submitForm(), icon: 'check', title: 'Save'},
      {icon: 'cross', title: 'Cancel', onClick: () => history.goBack()},
      {icon: 'save-print', title: 'Save & Print'},
    ];
    radialMenu.generate(radialItems);
  }, [dispatch, radialMenu, varWorkOrderGeneralAsset, history]);

  React.useEffect(() => {
    dispatch(setWorkOrderGeneralAssetAdditionalCharges([]));
    dispatch(setWorkOrderGeneralAssetDocumentAttachments([]));
    dispatch(setWorkOrderGeneralAssetImageAttachments([]));
    dispatch(setWorkOrderGeneralAssetMaterials([]));
  }, [dispatch]);

  if (!varWorkOrderGeneralAsset) return <Loader />;

  return (
    <Formik
      validationSchema={yup.object().shape(workOrderGeneralAssetShape)}
      validateOnChange={false}
      initialValues={varWorkOrderGeneralAsset}
      onSubmit={handleSubmit}
      innerRef={formikRef}>
      <Form>
        <Suspense fallback={<Loader />}>
          <WorkOrderGeneralAssetInformation isEdit={true} />
        </Suspense>
      </Form>
    </Formik>
  );
};

export default EditWorkOrderGeneralAssetRoute;
