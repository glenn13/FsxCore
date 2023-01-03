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
import {
  setWorkOrderComponentRepairSelections,
  initWorkOrderComponentRepairSelections,
} from '@app/store/maintenance/workorder/componentRepairSelection.reducers';
import {
  submitWorkOrderComponent,
  submitWorkOrderComponentDetails,
  loadWorkOrderComponentRepairSelection,
} from '@app/store/maintenance/workorder/component.actions';
import {getComponentFullInfo} from '@app/services/asset/register/component.service';
import WorkOrderComponentInformation from '@app/views/maintenance/WorkOrder/component/WorkOrderComponentInformation';
import WorkOrderComponent, {
  workOrderComponentShape,
} from '@app/entities/maintenance/workorder/WorkOrderComponent';

interface RouteProps {
  id: string;
}

export interface NewWorkOrderComponentRouteProps {}

const NewWorkOrderComponentRoute: React.FC<NewWorkOrderComponentRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const formikRef = React.useRef<FormikProps<WorkOrderComponent>>(null);
  const id = route.params.id;

  const modalSuccess = () => {
    Confirm({
      text: 'Work order component successfully saved',
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

  const handleSubmit = async (workOrderComponent: WorkOrderComponent) => {
    dispatch(submitWorkOrderComponent(workOrderComponent))
      .then(response => {
        const _workOrderComponentId =
          workOrderComponent.componentId === 0
            ? Number(response.data)
            : workOrderComponent.componentId;
        if (_workOrderComponentId > 0) {
          dispatch(submitWorkOrderComponentDetails(_workOrderComponentId));
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
    // dispatch(loadWorkOrderComponentRepairSelection());
  }, [dispatch, radialMenu, history]);

  const [workOrderComponent, setWorkOrderComponent] = React.useState<WorkOrderComponent>();

  React.useEffect(() => {
    getComponentFullInfo(id).then(response => {
      let _wordOrderComponent: WorkOrderComponent = {
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
        componentId: parseInt(id),

        //Technical Narative
        customerConcerns: '',
        findingsAndInstructions: '',
        safetyNotes: '',
        assetCategoryId: Number(AssetCategoryEnum.Component),

        component: response.data,
      };

      setWorkOrderComponent(_wordOrderComponent);
    });
  }, [dispatch, id]);

  /*
   * Added this when a page is being un-mount, all models will be initialize.
   * This is the fix when a user edit a certain record and suddenly click the main menu and load the initial grid view,
   * upon creating new transaction, previous data still mount in the reducer.
   */
  React.useEffect(() => {
    dispatch(setWorkOrderComponentAdditionalCharges(initWorkOrderComponentAdditionalCharge));
    dispatch(setWorkOrderComponentDocumentAttachments(initWorkOrderComponentDocumentAttachment));
    dispatch(setWorkOrderComponentImageAttachments(initWorkOrderComponentImageAttachment));
    dispatch(setWorkOrderComponentMaterials(initWorkOrderComponentMaterial));
    dispatch(setWorkOrderComponentRepairSelections(initWorkOrderComponentRepairSelections));
  }, [dispatch]);

  if (!workOrderComponent) return <Loader />;

  return (
    <Formik
      validationSchema={yup.object().shape(workOrderComponentShape)}
      validateOnChange={false}
      initialValues={workOrderComponent}
      onSubmit={handleSubmit}
      innerRef={formikRef}>
      <Form>
        <React.Suspense fallback={<Loader />}>
          <WorkOrderComponentInformation isEdit={false} />
        </React.Suspense>
      </Form>
    </Formik>
  );
};

export default NewWorkOrderComponentRoute;
