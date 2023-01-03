import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, StoreDispatch} from '@app/store/rootReducer';
import {Form, Formik, FormikProps} from 'formik';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {Loader} from '../../components/common';
import {RadialItem} from '@app/store/app/types';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import DispositionVehicleInformation from '@app/views/asset/Disposition/vehicle/DispositionVehicleInformation';
import {
  DispositionVehicle,
  dispositionVehicleShape,
  newDispositionVehicleJustification,
} from '@app/entities/asset/disposition/vehicle/DispositionVehicle';
import {
  submitDispositionVehicle,
  submitDispositionVehicleDetails,
} from '@app/store/asset/disposition/vehicle/dispositionVehicle.actions';
import {getVehicleFullInfo} from '@app/services/asset/register/vehicle.service';
import {AssetCategoryEnum} from '@app/helpers/asset/enum';
import * as yup from 'yup';
import {generateUUID} from '@app/helpers/randoms';
import {Confirm} from '@app/components/common/Alert';
import {loadUser} from '@app/store/catalog/users/user.actions';
import {User} from '@app/entities/catalog';
import {setDispositionVehicleImages} from '@app/store/asset/disposition/vehicle/dispositionVehicleImage.reducers';
import {setDispositionVehicleDamagedAreas} from '@app/store/asset/disposition/vehicle/dispositionVehicleDamagedArea.reducers';
import {setDispositionVehicleRequiredRepairs} from '@app/store/asset/disposition/vehicle/dispositionVehicleRequiredRepair.reducers';
import {setDispositionVehicleDocuments} from '@app/store/asset/disposition/vehicle/dispositionVehicleDocument.reducers';
import {setDispositionVehicleApprovals} from '@app/store/asset/disposition/vehicle/dispositionVehicleApproval.reducers';
import useDisclosure from '@app/hooks/useDisclosure';
interface RouteProps {
  id: string;
}

export interface NewDispositionVehicleRouteProps {}

const NewDispositionVehicleRoute: React.FC<NewDispositionVehicleRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const formikRef = React.useRef<FormikProps<DispositionVehicle>>(null);
  const id = route.params.id;

  const currentUser = useSelector((state: RootState) => state.users.current);
  const requestedById = currentUser?.id || 0;

  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    dispatch(loadUser(id)).then(user => setUser(user));
  }, [dispatch, id]);

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
      confirmButtonText: 'Done',
      icon: 'error',
    });
  };

  const handleSubmit = async (dispositionVehicle: DispositionVehicle) => {
    dispatch(submitDispositionVehicle(dispositionVehicle))
      .then(response => {
        let _dispositionVehicleId: number;
        _dispositionVehicleId = Number(response.data);
        if (_dispositionVehicleId > 0) {
          dispatch(submitDispositionVehicleDetails(_dispositionVehicleId));
          modalSuccess();
        }
      })
      .catch(e => {
        console.log(e);
        modalDanger();
      });
  };

  const initRadialItems: RadialItem[] = [
    {title: 'Save', icon: 'check', onClick: () => formikRef.current?.submitForm()},
    {title: 'Save & Print', icon: 'save-print'},
    {title: 'Cancel', icon: 'cross', onClick: () => history.goBack()},
    {title: 'Print', icon: 'print'},
    {title: 'Export', icon: 'excel'},
  ];

  const radialMenu = useRadialMenu({rerenderDelayMS: 50});

  const [radialMenuItems, setRadialMenuItems] = React.useState<RadialItem[]>(initRadialItems);

  const [dispositionVehicle, setDispositionVehicle] = React.useState<DispositionVehicle>();

  React.useEffect(() => {
    getVehicleFullInfo(id).then(response => {
      let _dispositionVehicle: DispositionVehicle = {
        id: 0,
        dispositionNo: generateUUID(true).toUpperCase(),
        requestDateTime: new Date(),

        dispositionStatusId: 0,
        dispositionTypeId: 0,
        requestedById: requestedById,
        requestingDepartmentId: user?.departmentId || 0,

        vehicleId: parseInt(id),
        vehicle: response.data,

        dispositionVehicleJustification: newDispositionVehicleJustification(),
        assetCategoryId: Number(AssetCategoryEnum.Vehicle),
      };

      setDispositionVehicle(_dispositionVehicle);
    });
  }, [dispatch, id]);

  React.useEffect(() => {
    radialMenu.generate(radialMenuItems);
  }, [radialMenu, radialMenuItems]);

  /*
   * Added this when a page is being un-mount, all models will be initialize.
   * This is the fix when a user edit a certain record and suddenly click the main menu and load the initial grid view,
   * upon creating new transaction, previous data still mount in the reducer.
   */
  React.useEffect(() => {
    dispatch(setDispositionVehicleDamagedAreas([]));
    dispatch(setDispositionVehicleRequiredRepairs([]));
    dispatch(setDispositionVehicleImages([]));
    dispatch(setDispositionVehicleDocuments([]));
    dispatch(setDispositionVehicleApprovals([]));
  }, [dispatch]);

  if (!dispositionVehicle) return <Loader />;

  return (
    <Formik
      validationSchema={yup.object().shape(dispositionVehicleShape)}
      validateOnChange={false}
      initialValues={dispositionVehicle}
      onSubmit={handleSubmit}
      innerRef={formikRef}>
      <Form>
        <React.Suspense fallback={<Loader />}>
          <DispositionVehicleInformation isEdit={false} isReadOnly={false}/>
        </React.Suspense>
      </Form>
    </Formik>
  );
};

export default NewDispositionVehicleRoute;
