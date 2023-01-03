import React from 'react';
import {Form, Formik, FormikProps} from 'formik';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {Loader} from '../../components/common';
import {RadialItem} from '@app/store/app/types';
import {
  loadDispositionVehicleDamagedAreas,
  loadDispositionVehicleRequiredRepairs,
  loadDispositionVehicleDocuments,
  loadDispositionVehicleImages,
  loadDispositionVehicleApprovals,
  submitDispositionVehicle,
  submitDispositionVehicleDetails,
} from '@app/store/asset/disposition/vehicle/dispositionVehicle.actions';
import {getDispositionVehicle, getDispositionVehicleApprovals} from '@app/services/asset/disposition/dispositionVehicle.service';
import DispositionVehicleInformation from '@app/views/asset/Disposition/vehicle/DispositionVehicleInformation';
import DispositionVehicle from '@app/entities/asset/disposition/vehicle/DispositionVehicle';
import {RootState, StoreDispatch} from '@app/store/rootReducer';
import {useDispatch, useSelector} from 'react-redux';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import {Confirm} from '@app/components/common/Alert';
import {setDispositionVehicleImages} from '@app/store/asset/disposition/vehicle/dispositionVehicleImage.reducers';
import {setDispositionVehicleDamagedAreas} from '@app/store/asset/disposition/vehicle/dispositionVehicleDamagedArea.reducers';
import {setDispositionVehicleRequiredRepairs} from '@app/store/asset/disposition/vehicle/dispositionVehicleRequiredRepair.reducers';
import {setDispositionVehicleDocuments} from '@app/store/asset/disposition/vehicle/dispositionVehicleDocument.reducers';
import {setDispositionVehicleApprovals} from '@app/store/asset/disposition/vehicle/dispositionVehicleApproval.reducers';
import { DispositionStatusEnum } from '@app/helpers/asset/enum';

interface RouteProps {
  id: string;
}

const statuses = [
  { status: DispositionStatusEnum.Approved}, 
  { status: DispositionStatusEnum.Rejected}
];

export interface EditDispositionVehicleRouteProps {}

const EditDispositionVehicleRoute: React.FC<EditDispositionVehicleRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const id = route.params.id;
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const formikRef = React.useRef<FormikProps<DispositionVehicle>>(null);
  const [varDispositionVehicle, setDispositionVehicle] = React.useState<DispositionVehicle>();

  const [isReadOnly, setReadOnly] = React.useState(false);

  React.useEffect(() => {
    getDispositionVehicle(id).then(response => setDispositionVehicle(response.data));
    dispatch(loadDispositionVehicleDamagedAreas(id));
    dispatch(loadDispositionVehicleRequiredRepairs(id));
    dispatch(loadDispositionVehicleImages(id));
    dispatch(loadDispositionVehicleDocuments(id));
    dispatch(loadDispositionVehicleApprovals(id));
  }, [id]);

  React.useEffect(() => {
    setReadOnly(statuses.find( (s) => s.status == varDispositionVehicle?.dispositionStatusId)?.status !== undefined ? true : false);
  }, [varDispositionVehicle]);

  const handleRoute = React.useCallback(() => history.push('/app/asset/disposition?tabIndex=1'), [
    history,
  ]);

  const modalSuccess = () => {
    Confirm({
      text: 'Disposition vehicle successfully saved',
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

  const handleSubmit = async (dispositionVehicle: DispositionVehicle) => {
    dispatch(submitDispositionVehicle(dispositionVehicle))
      .then(response => {
        dispatch(submitDispositionVehicleDetails(Number(id)));
        modalSuccess();
      })
      .catch(() => {
        modalDanger();
      });
  };

  React.useEffect(() => {
    if (!varDispositionVehicle) return;

    const radialItems: RadialItem[] = [
      {title: 'Save', icon: 'check', onClick: () => formikRef.current?.submitForm()},
      {title: 'Save & Print', icon: 'save-print'},
      {title: 'Cancel', icon: 'cross', onClick: () => history.goBack()},
      {title: 'Print', icon: 'print'},
      {title: 'Export', icon: 'excel'},
    ];

    radialMenu.generate(radialItems);
  }, [dispatch, radialMenu, varDispositionVehicle, history]);

  React.useEffect(() => {
    dispatch(setDispositionVehicleDamagedAreas([]));
    dispatch(setDispositionVehicleRequiredRepairs([]));
    dispatch(setDispositionVehicleImages([]));
    dispatch(setDispositionVehicleDocuments([]));
    dispatch(setDispositionVehicleApprovals([]));
  }, [dispatch]);

  if (!varDispositionVehicle) return <Loader />;

  return (
    <Formik
      validateOnChange={false}
      initialValues={varDispositionVehicle}
      onSubmit={handleSubmit}
      innerRef={formikRef}>
      <Form>
        <React.Suspense fallback={<Loader />}>
          <DispositionVehicleInformation isEdit={true} isReadOnly={isReadOnly}/>
        </React.Suspense>
      </Form>
    </Formik>
  );
};

export default EditDispositionVehicleRoute;
