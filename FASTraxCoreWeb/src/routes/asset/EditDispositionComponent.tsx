import React from 'react';
import {Form, Formik, FormikProps} from 'formik';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {Loader} from '../../components/common';
import {RadialItem} from '@app/store/app/types';
import {
  loadDispositionComponentDamagedAreas,
  loadDispositionComponentRequiredRepairs,
  loadDispositionComponentImages,
  loadDispositionComponentDocuments,
  loadDispositionComponentApprovals,
  submitDispositionComponent,
  submitDispositionComponentDetails,
} from '@app/store/asset/disposition/component/dispositionComponent.actions';
import {getDispositionComponent} from '@app/services/asset/disposition/dispositionComponent.service';
import DispositionComponentInformation from '@app/views/asset/Disposition/component/DispositionComponentInformation';
import DispositionComponent from '@app/entities/asset/disposition/component/DispositionComponent';
import {StoreDispatch} from '@app/store/rootReducer';
import {useDispatch} from 'react-redux';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import {Confirm} from '@app/components/common/Alert';
import {setDispositionComponentImages} from '@app/store/asset/disposition/component/dispositionComponentImage.reducers';
import {setDispositionComponentDamagedAreas} from '@app/store/asset/disposition/component/dispositionComponentDamagedArea.reducers';
import {setDispositionComponentRequiredRepairs} from '@app/store/asset/disposition/component/dispositionComponentRequiredRepair.reducers';
import {setDispositionComponentDocuments} from '@app/store/asset/disposition/component/dispositionComponentDocument.reducers';
import {setDispositionComponentApprovals} from '@app/store/asset/disposition/component/dispositionComponentApproval.reducers';
import { DispositionStatusEnum } from '@app/helpers/asset/enum';

interface RouteProps {
  id: string;
}

const statuses = [
  { status: DispositionStatusEnum.Approved },
  { status: DispositionStatusEnum.Rejected }
]

export interface EditDispositionComponentRouteProps {}

const EditDispositionComponentRoute: React.FC<EditDispositionComponentRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const id = route.params.id;
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const formikRef = React.useRef<FormikProps<DispositionComponent>>(null);
  const [varDispositionComponent, setDispositionComponent] = React.useState<DispositionComponent>();

  const [isReadOnly, setReadOnly] = React.useState(false);

  React.useEffect(() => {
    getDispositionComponent(id).then(response => setDispositionComponent(response.data));
    dispatch(loadDispositionComponentDamagedAreas(id));
    dispatch(loadDispositionComponentRequiredRepairs(id));
    dispatch(loadDispositionComponentDocuments(id));
    dispatch(loadDispositionComponentImages(id));
  }, [id]);

  React.useEffect(() => {
    setReadOnly(statuses.find( (s) => s.status == varDispositionComponent?.dispositionStatusId)?.status !== undefined ? true : false);
  }, [varDispositionComponent])

  const handleRoute = React.useCallback(() => history.push('/app/asset/disposition?tabIndex=2'), [
    history,
  ]);

  const modalSuccess = () => {
    Confirm({
      text: 'Disposition component successfully saved',
      confirmButtonText: 'Done',
      icon: 'success',
      onConfirm: () => handleRoute(),
    });
  };

  const modalDanger = () => {
    Confirm({
      text: 'Error occur while saving primary information',
      confirmButtonText: 'Close',
      icon: 'error',
    });
  };

  const handleSubmit = async (dispositionComponent: DispositionComponent) => {
    dispatch(submitDispositionComponent(dispositionComponent))
      .then(response => {
        dispatch(submitDispositionComponentDetails(Number(id)));
        modalSuccess();
      })
      .catch(() => {
        modalDanger();
      });
  };

  React.useEffect(() => {
    if (!varDispositionComponent) return;

    const radialItems: RadialItem[] = [
      {title: 'Save', icon: 'check', onClick: () => formikRef.current?.submitForm()},
      {title: 'Save & Print', icon: 'save-print'},
      {title: 'Cancel', icon: 'cross', onClick: () => history.goBack()},
      {title: 'Print', icon: 'print'},
      {title: 'Export', icon: 'excel'},
    ];

    radialMenu.generate(radialItems);
  }, [dispatch, radialMenu, varDispositionComponent, history]);

  React.useEffect(() => {
    dispatch(setDispositionComponentDamagedAreas([]));
    dispatch(setDispositionComponentRequiredRepairs([]));
    dispatch(setDispositionComponentImages([]));
    dispatch(setDispositionComponentDocuments([]));
    dispatch(setDispositionComponentApprovals([]));
  }, [dispatch]);

  if (!varDispositionComponent) return <Loader />;

  return (
    <Formik
      validateOnChange={false}
      initialValues={varDispositionComponent}
      onSubmit={handleSubmit}
      innerRef={formikRef}>
      <Form>
        <React.Suspense fallback={<Loader />}>
          <DispositionComponentInformation isEdit={true} isReadOnly={isReadOnly} />
        </React.Suspense>
      </Form>
    </Formik>
  );
};

export default EditDispositionComponentRoute;
