import React from 'react';
import {Form, Formik, FormikProps} from 'formik';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {Loader} from '../../components/common';
import {RadialItem} from '@app/store/app/types';
import {
  loadDispositionGeneralAssetDamagedAreas,
  loadDispositionGeneralAssetRequiredRepairs,
  loadDispositionGeneralAssetImages,
  loadDispositionGeneralAssetDocuments,
  loadDispositionGeneralAssetApprovals,
  submitDispositionGeneralAsset,
  submitDispositionGeneralAssetDetails,
} from '@app/store/asset/disposition/generalasset/dispositionGeneralAsset.actions';
import {getDispositionGeneralAsset} from '@app/services/asset/disposition/dispositionGeneralAsset.service';
import DispositionGeneralAssetInformation from '@app/views/asset/Disposition/generalasset/DispositionGeneralAssetInformation';
import DispositionGeneralAsset from '@app/entities/asset/disposition/generalasset/DispositionGeneralAsset';
import {StoreDispatch} from '@app/store/rootReducer';
import {useDispatch} from 'react-redux';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import {Confirm} from '@app/components/common/Alert';
import {setDispositionGeneralAssetImages} from '@app/store/asset/disposition/generalasset/dispositionGeneralAssetImage.reducers';
import {setDispositionGeneralAssetDamagedAreas} from '@app/store/asset/disposition/generalasset/dispositionGeneralAssetDamagedArea.reducers';
import {setDispositionGeneralAssetRequiredRepairs} from '@app/store/asset/disposition/generalasset/dispositionGeneralAssetRequiredRepair.reducers';
import {setDispositionGeneralAssetDocuments} from '@app/store/asset/disposition/generalasset/dispositionGeneralAssetDocument.reducers';
import {setDispositionGeneralAssetApprovals} from '@app/store/asset/disposition/generalasset/dispositionGeneralAssetApproval.reducers';
import { DispositionStatusEnum } from '@app/helpers/asset/enum';

interface RouteProps {
  id: string;
}

const statuses = [
  { status :  DispositionStatusEnum.Approved},
  { status : DispositionStatusEnum.Rejected }
]

export interface EditDispositionGeneralAssetRouteProps {}

const EditDispositionGeneralAssetRoute: React.FC<EditDispositionGeneralAssetRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const id = route.params.id;
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const formikRef = React.useRef<FormikProps<DispositionGeneralAsset>>(null);
  const [varDispositionGeneralAsset, setDispositionGeneralAsset] = React.useState<DispositionGeneralAsset>();

  const [isReadOnly, setReadOnly] = React.useState(false);

  React.useEffect(() => {
    getDispositionGeneralAsset(id).then(response => setDispositionGeneralAsset(response.data));
    dispatch(loadDispositionGeneralAssetDamagedAreas(id));
    dispatch(loadDispositionGeneralAssetRequiredRepairs(id));
    dispatch(loadDispositionGeneralAssetImages(id));
    dispatch(loadDispositionGeneralAssetDocuments(id));
    dispatch(loadDispositionGeneralAssetApprovals(id));
  }, [id]);

  React.useEffect(() => {
    setReadOnly(statuses.find( (s) => s.status == varDispositionGeneralAsset?.dispositionStatusId)?.status !== undefined ? true : false);
  }, [varDispositionGeneralAsset])

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
      confirmButtonText: 'Close',
      icon: 'error',
    });
  };

  const handleSubmit = async (dispositionGeneralAsset: DispositionGeneralAsset) => {
    dispatch(submitDispositionGeneralAsset(dispositionGeneralAsset))
      .then(response => {
        dispatch(submitDispositionGeneralAssetDetails(Number(id)));
        modalSuccess();
      })
      .catch(() => {
        modalDanger();
      });
  };

  React.useEffect(() => {
    if (!varDispositionGeneralAsset) return;

    const radialItems: RadialItem[] = [
      {title: 'Save', icon: 'check', onClick: () => formikRef.current?.submitForm()},
      {title: 'Save & Print', icon: 'save-print'},
      {title: 'Cancel', icon: 'cross', onClick: () => history.goBack()},
      {title: 'Print', icon: 'print'},
      {title: 'Export', icon: 'excel'},
    ];

    radialMenu.generate(radialItems);
  }, [dispatch, radialMenu, varDispositionGeneralAsset, history]);

  React.useEffect(() => {
    dispatch(setDispositionGeneralAssetDamagedAreas([]));
    dispatch(setDispositionGeneralAssetRequiredRepairs([]));
    dispatch(setDispositionGeneralAssetImages([]));
    dispatch(setDispositionGeneralAssetDocuments([]));
    dispatch(setDispositionGeneralAssetApprovals([]));
  }, [dispatch]);

  if (!varDispositionGeneralAsset) return <Loader />;

  return (
    <Formik
      validateOnChange={false}
      initialValues={varDispositionGeneralAsset}
      onSubmit={handleSubmit}
      innerRef={formikRef}>
      <Form>
        <React.Suspense fallback={<Loader />}>
          <DispositionGeneralAssetInformation isEdit={true} isReadOnly={isReadOnly}/>
        </React.Suspense>
      </Form>
    </Formik>
  );
};

export default EditDispositionGeneralAssetRoute;
