import * as yup from 'yup';

import { Loader } from '@app/components/common';
import {Form, Formik, FormikProps} from 'formik';
import {RootState, StoreDispatch} from '@app/store/rootReducer';
import {
  loadGeneralAssetCustomFieldsOnEdit,
  loadGeneralAssetDepreciationDetails,
  loadGeneralAssetDocumentAttachments,
  loadGeneralAssetImageAttachments,
  loadGeneralAssetLinkedAssets,
  loadGeneralAssetRegistrationDetails,
  loadGeneralAssetWarrantyDetails,
  loadGeneralAssetTransactionHistory,
} from '@app/store/asset/register/generalasset.actions';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import React from 'react';
import _ from 'lodash';

import {AssetCategoryEnum} from '@app/helpers/asset/enum';
import GeneralAssetInformation from '@app/views/asset/register/generalasset/generalassetinformation';
import {RadialItem} from '@app/store/app/types';
import {generalAssetShape} from '@app/entities/asset/register/generalasset/generalasset.schema';
import {getGeneralAssetFullInfo} from '@app/services/asset/register/generalasset.service';
import useDisclosure from '@app/hooks/useDisclosure';
import {useRadialMenu} from '@app/hooks/useRadialMenu';

interface RouteProps {
  id: string;
}

export interface ViewGeneralAssetRouteProps {}

const ViewGeneralAssetRoute: React.FC<ViewGeneralAssetRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const id = route.params.id;
  const formikRef = React.useRef<FormikProps<GeneralAsset>>(null);
  const [generalAsset, setGeneralAsset] = React.useState<GeneralAsset>();
  const [generalAssetDepreciationId, setGeneralAssetDepreciationId] = React.useState<number>(0);
  const usersReducer = useSelector((state: RootState) => state.users);
  const {isOpen, onToggle} = useDisclosure({});

  React.useEffect(() => {
    getGeneralAssetFullInfo(id).then(response => {
      let _generalAsset = response.data;
      _generalAsset.assetCategoryId = Number(AssetCategoryEnum.GeneralAsset);
      _generalAsset.modifiedByUserId = usersReducer.current?.id || 0;
      setGeneralAsset(_generalAsset);
      setGeneralAssetDepreciationId(_generalAsset.generalAssetDepreciation?.id || 0);
    });

    dispatch(loadGeneralAssetCustomFieldsOnEdit(id));
    dispatch(loadGeneralAssetDocumentAttachments(id));
    dispatch(loadGeneralAssetImageAttachments(id));
    dispatch(loadGeneralAssetLinkedAssets(id));
    dispatch(loadGeneralAssetRegistrationDetails(id));
    dispatch(loadGeneralAssetWarrantyDetails(id));
    dispatch(loadGeneralAssetTransactionHistory(id));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  React.useEffect(() => {
    dispatch(loadGeneralAssetDepreciationDetails(generalAssetDepreciationId));
  }, [dispatch, generalAssetDepreciationId]);

  const initRadialItems: RadialItem[] = [
    {title: 'Cancel', icon: 'cross', onClick: () => history.goBack()},
    {title: 'Print', icon: 'print'},
    {title: 'Export', icon: 'excel'},
  ];

  const radialMenu = useRadialMenu({rerenderDelayMS: 50});
  const [radialMenuItems, setRadialMenuItems] = React.useState<RadialItem[]>(initRadialItems);

  const handleSubmit = async (generalAsset: GeneralAsset) => { };

  React.useEffect(() => {
    radialMenu.generate(radialMenuItems);
  }, [radialMenu, radialMenuItems]);

  if (!generalAsset) return <Loader />;

  return (
    <>
      <Formik
        validationSchema={yup.object().shape(generalAssetShape)}
        validateOnChange={false}
        initialValues={generalAsset}
        onSubmit={handleSubmit}
        innerRef={formikRef}>
        <Form>
          <React.Suspense fallback={<Loader />}>
            <GeneralAssetInformation isEdit={false} isReadOnly={true}/>
          </React.Suspense>
        </Form>
      </Formik>
    </>
  );
};

export default ViewGeneralAssetRoute;
