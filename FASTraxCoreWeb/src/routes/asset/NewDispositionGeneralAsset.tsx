import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, StoreDispatch} from '@app/store/rootReducer';
import {Form, Formik, FormikProps} from 'formik';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {Loader} from '../../components/common';
import {RadialItem} from '@app/store/app/types';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import DispositionGeneralAssetInformation from '@app/views/asset/Disposition/generalasset/DispositionGeneralAssetInformation';
import {
  DispositionGeneralAsset,
  dispositionGeneralAssetShape,
  newDispositionGeneralAssetJustification,
} from '@app/entities/asset/disposition/generalasset/DispositionGeneralAsset';
import {
  submitDispositionGeneralAsset,
  submitDispositionGeneralAssetDetails,
} from '@app/store/asset/disposition/generalasset/dispositionGeneralAsset.actions';
import {getGeneralAssetFullInfo} from '@app/services/asset/register/generalasset.service';
import {AssetCategoryEnum} from '@app/helpers/asset/enum';
import * as yup from 'yup';
import {generateUUID} from '@app/helpers/randoms';
import {Confirm} from '@app/components/common/Alert';
import {loadUser} from '@app/store/catalog/users/user.actions';
import {User} from '@app/entities/catalog';
import {
  setDispositionGeneralAssetDamagedAreas,
  initDispositionGeneralAssetDamagedAreas,
} from '@app/store/asset/disposition/generalasset/dispositionGeneralAssetDamagedArea.reducers';
import {
  setDispositionGeneralAssetRequiredRepairs,
  initDispositionGeneralAssetRequiredRepairs,
} from '@app/store/asset/disposition/generalasset/dispositionGeneralAssetRequiredRepair.reducers';
import {
  setDispositionGeneralAssetImages,
  initDispositionGeneralAssetImages,
} from '@app/store/asset/disposition/generalasset/dispositionGeneralAssetImage.reducers';
import {
  setDispositionGeneralAssetDocuments,
  initDispositionGeneralAssetDocuments,
} from '@app/store/asset/disposition/generalasset/dispositionGeneralAssetDocument.reducers';
import {
  setDispositionGeneralAssetApprovals,
  initDispositionGeneralAssetApprovals,
} from '@app/store/asset/disposition/generalasset/dispositionGeneralAssetApproval.reducers';

interface RouteProps {
  id: string;
}

export interface NewDispositionGeneralAssetRouteProps {}

const NewDispositionGeneralAssetRoute: React.FC<NewDispositionGeneralAssetRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const formikRef = React.useRef<FormikProps<DispositionGeneralAsset>>(null);
  const id = route.params.id;

  const currentUser = useSelector((state: RootState) => state.users.current);
  const requestedById = currentUser?.id || 0;

  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    dispatch(loadUser(id)).then(user => setUser(user));
  }, [dispatch, id]);

  const handleRoute = React.useCallback(() => history.push('/app/asset/disposition?tabIndex=0'), [
    history,
  ]);

  const modalSuccess = () => {
    Confirm({
      text: 'Disposition general asset successfully saved',
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

  const handleSubmit = async (dispositionGeneralAsset: DispositionGeneralAsset) => {
    dispatch(submitDispositionGeneralAsset(dispositionGeneralAsset))
      .then(response => {
        let _dispositionGeneralAssetId: number;
        _dispositionGeneralAssetId = Number(response.data);
        if (_dispositionGeneralAssetId > 0) {
          dispatch(submitDispositionGeneralAssetDetails(_dispositionGeneralAssetId));
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

  const [
    dispositionGeneralAsset,
    setDispositionGeneralAsset,
  ] = React.useState<DispositionGeneralAsset>();

  React.useEffect(() => {
    getGeneralAssetFullInfo(id).then(response => {
      let _dispositionGeneralAsset: DispositionGeneralAsset = {
        id: 0,
        dispositionNo: generateUUID(true).toUpperCase(),
        requestDateTime: new Date(),

        dispositionStatusId: 0,
        dispositionTypeId: 0,
        requestedById: requestedById,
        requestingDepartmentId: user?.departmentId || 0,

        generalAssetId: parseInt(id),
        generalAsset: response.data,

        dispositionGeneralAssetJustification: newDispositionGeneralAssetJustification(),
        assetCategoryId: Number(AssetCategoryEnum.GeneralAsset),
      };

      setDispositionGeneralAsset(_dispositionGeneralAsset);
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
    dispatch(setDispositionGeneralAssetDamagedAreas(initDispositionGeneralAssetDamagedAreas));
    dispatch(setDispositionGeneralAssetRequiredRepairs(initDispositionGeneralAssetRequiredRepairs));
    dispatch(setDispositionGeneralAssetImages(initDispositionGeneralAssetImages));
    dispatch(setDispositionGeneralAssetDocuments(initDispositionGeneralAssetDocuments));
    dispatch(setDispositionGeneralAssetApprovals(initDispositionGeneralAssetApprovals));
  }, [dispatch]);

  if (!dispositionGeneralAsset) return <Loader />;

  return (
    <Formik
      validationSchema={yup.object().shape(dispositionGeneralAssetShape)}
      validateOnChange={false}
      initialValues={dispositionGeneralAsset}
      onSubmit={handleSubmit}
      innerRef={formikRef}>
      <Form>
        <React.Suspense fallback={<Loader />}>
          <DispositionGeneralAssetInformation isEdit={false} isReadOnly={false}/>
        </React.Suspense>
      </Form>
    </Formik>
  );
};

export default NewDispositionGeneralAssetRoute;
