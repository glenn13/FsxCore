import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, StoreDispatch} from '@app/store/rootReducer';
import {Form, Formik, FormikProps} from 'formik';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {Loader} from '../../components/common';
import {RadialItem} from '@app/store/app/types';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import DispositionComponentInformation from '@app/views/asset/Disposition/component/DispositionComponentInformation';
import {
  DispositionComponent,
  dispositionComponentShape,
  newDispositionComponentJustification,
} from '@app/entities/asset/disposition/component/DispositionComponent';
import {
  submitDispositionComponent,
  submitDispositionComponentDetails,
} from '@app/store/asset/disposition/component/dispositionComponent.actions';
import {getComponentFullInfo} from '@app/services/asset/register/component.service';
import {AssetCategoryEnum} from '@app/helpers/asset/enum';
import * as yup from 'yup';
import {generateUUID} from '@app/helpers/randoms';
import {Confirm} from '@app/components/common/Alert';
import {loadUser} from '@app/store/catalog/users/user.actions';
import {User} from '@app/entities/catalog';
import {
  setDispositionComponentImages,
  initDispositionComponentImages,
} from '@app/store/asset/disposition/component/dispositionComponentImage.reducers';
import {
  setDispositionComponentDamagedAreas,
  initDispositionComponentDamagedAreas,
} from '@app/store/asset/disposition/component/dispositionComponentDamagedArea.reducers';
import {
  setDispositionComponentRequiredRepairs,
  initDispositionComponentRequiredRepairs,
} from '@app/store/asset/disposition/component/dispositionComponentRequiredRepair.reducers';
import {
  setDispositionComponentDocuments,
  initDispositionComponentDocuments,
} from '@app/store/asset/disposition/component/dispositionComponentDocument.reducers';
import {
  setDispositionComponentApprovals,
  initDispositionComponentApprovals,
} from '@app/store/asset/disposition/component/dispositionComponentApproval.reducers';

interface RouteProps {
  id: string;
}

export interface NewDispositionComponentRouteProps {}

const NewDispositionComponentRoute: React.FC<NewDispositionComponentRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const formikRef = React.useRef<FormikProps<DispositionComponent>>(null);
  const id = route.params.id;

  const currentUser = useSelector((state: RootState) => state.users.current);
  const requestedById = currentUser?.id || 0;

  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    dispatch(loadUser(id)).then(user => setUser(user));
  }, [dispatch, id]);

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
      confirmButtonText: 'Done',
      icon: 'error',
    });
  };

  const handleSubmit = async (dispositionComponent: DispositionComponent) => {
    dispatch(submitDispositionComponent(dispositionComponent))
      .then(response => {
        let _dispositionComponentId: number;
        _dispositionComponentId = Number(response.data);
        if (_dispositionComponentId > 0) {
          dispatch(submitDispositionComponentDetails(_dispositionComponentId));
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

  const [dispositionComponent, setDispositionComponent] = React.useState<DispositionComponent>();

  React.useEffect(() => {
    getComponentFullInfo(id).then(response => {
      let _dispositionComponent: DispositionComponent = {
        id: 0,
        dispositionNo: generateUUID(true).toUpperCase(),
        requestDateTime: new Date(),

        dispositionStatusId: 0,
        dispositionTypeId: 0,
        requestedById: requestedById,
        requestingDepartmentId: user?.departmentId || 0,

        componentId: parseInt(id),
        component: response.data,
        assetCategoryId: Number(AssetCategoryEnum.Component),

        dispositionComponentJustification: newDispositionComponentJustification(),
      };

      setDispositionComponent(_dispositionComponent);
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
    dispatch(setDispositionComponentDamagedAreas(initDispositionComponentDamagedAreas));
    dispatch(setDispositionComponentRequiredRepairs(initDispositionComponentRequiredRepairs));
    dispatch(setDispositionComponentImages(initDispositionComponentImages));
    dispatch(setDispositionComponentDocuments(initDispositionComponentDocuments));
    dispatch(setDispositionComponentApprovals(initDispositionComponentApprovals));
  }, [dispatch]);

  if (!dispositionComponent) return <Loader />;

  return (
    <Formik
      validationSchema={yup.object().shape(dispositionComponentShape)}
      validateOnChange={false}
      initialValues={dispositionComponent}
      onSubmit={handleSubmit}
      innerRef={formikRef}>
      <Form>
        <React.Suspense fallback={<Loader />}>
          <DispositionComponentInformation isEdit={false} isReadOnly={false}/>
        </React.Suspense>
      </Form>
    </Formik>
  );
};

export default NewDispositionComponentRoute;
