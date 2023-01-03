import React from 'react';
import * as yup from 'yup';
import {RootState} from '@app/store/rootReducer';
import {FormikProps, Form, Formik} from 'formik';
import {RadialItem} from '@app/store/app/types';
import {StoreDispatch} from '@app/store/rootReducer';
import {Loader} from '@app/components/common';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import {Confirm} from '@app/components/common/Alert';
import {AssetCategoryEnum} from '@app/helpers/asset/enum';
import {generateUUID} from '@app/helpers/randoms';
import {initWorkOrderGeneralAsset} from '@app/store/maintenance/workorder/generalAsset.reducers';
import {
  setWorkOrderGeneralAssetAdditionalCharges,
  initWorkOrderGeneralAssetAdditionalCharge,
} from '@app/store/maintenance/workorder/generalAssetAdditionalCharge.reducers';
import {
  setWorkOrderGeneralAssetDocumentAttachments,
  initWorkOrderGeneralAssetDocumentAttachment,
} from '@app/store/maintenance/workorder/generalAssetDocumentAttachment.reducers';
import {
  setWorkOrderGeneralAssetImageAttachments,
  initWorkOrderGeneralAssetImageAttachment,
} from '@app/store/maintenance/workorder/generalAssetImageAttachment.reducers';
import {
  setWorkOrderGeneralAssetMaterials,
  initWorkOrderGeneralAssetMaterial,
} from '@app/store/maintenance/workorder/generalAssetMaterial.reducers';
import {
  submitWorkOrderGeneralAsset,
  submitWorkOrderGeneralAssetDetails,
} from '@app/store/maintenance/workorder/generalAsset.actions';
import {getGeneralAssetFullInfo} from '@app/services/asset/register/generalasset.service';
import WorkOrderGeneralAssetInformation from '@app/views/maintenance/WorkOrder/generalasset/WorkOrderGeneralAssetInformation';
import WorkOrderGeneralAsset, {
  workOrderGeneralAssetShape,
} from '@app/entities/maintenance/workorder/WorkOrderGeneralAsset';

interface RouteProps {
  id: string;
}

export interface NewWorkOrderGeneralAssetRouteProps {}

const NewWorkOrderGeneralAssetRoute: React.FC<NewWorkOrderGeneralAssetRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const formikRef = React.useRef<FormikProps<WorkOrderGeneralAsset>>(null);
  const id = route.params.id;

  const modalSuccess = () => {
    Confirm({
      text: 'Work order general asset successfully saved',
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

  const handleSubmit = async (workOrderGeneralAsset: WorkOrderGeneralAsset) => {
    dispatch(submitWorkOrderGeneralAsset(workOrderGeneralAsset))
      .then(response => {
        const _workOrderGeneralAssetId =
          workOrderGeneralAsset.generalAssetId === 0
            ? Number(response.data)
            : workOrderGeneralAsset.generalAssetId;
        if (_workOrderGeneralAssetId > 0) {
          dispatch(submitWorkOrderGeneralAssetDetails(_workOrderGeneralAssetId));
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

  const [workOrderGeneralAsset, setWorkOrderGeneralAsset] = React.useState<WorkOrderGeneralAsset>();

  React.useEffect(() => {
    getGeneralAssetFullInfo(id).then(response => {
      let _wordOrderGeneralAsset: WorkOrderGeneralAsset = {
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
        generalAssetId: parseInt(id),

        //Technical Narative
        customerConcerns: '',
        findingsAndInstructions: '',
        safetyNotes: '',
        assetCategoryId: Number(AssetCategoryEnum.GeneralAsset),

        generalAsset: response.data,
      };

      setWorkOrderGeneralAsset(_wordOrderGeneralAsset);
    });
  }, [dispatch, id]);

  /*
   * Added this when a page is being un-mount, all models will be initialize.
   * This is the fix when a user edit a certain record and suddenly click the main menu and load the initial grid view,
   * upon creating new transaction, previous data still mount in the reducer.
   */
  React.useEffect(() => {
    dispatch(setWorkOrderGeneralAssetAdditionalCharges(initWorkOrderGeneralAssetAdditionalCharge));
    dispatch(
      setWorkOrderGeneralAssetDocumentAttachments(initWorkOrderGeneralAssetDocumentAttachment),
    );
    dispatch(setWorkOrderGeneralAssetImageAttachments(initWorkOrderGeneralAssetImageAttachment));
    dispatch(setWorkOrderGeneralAssetMaterials(initWorkOrderGeneralAssetMaterial));
  }, [dispatch]);

  if (!workOrderGeneralAsset) return <Loader />;
  console.log(workOrderGeneralAsset);

  return (
    <Formik
      validationSchema={yup.object().shape(workOrderGeneralAssetShape)}
      validateOnChange={false}
      initialValues={workOrderGeneralAsset}
      onSubmit={handleSubmit}
      innerRef={formikRef}>
      <Form>
        <React.Suspense fallback={<Loader />}>
          <WorkOrderGeneralAssetInformation isEdit={false} />
        </React.Suspense>
      </Form>
    </Formik>
  );
};

export default NewWorkOrderGeneralAssetRoute;
