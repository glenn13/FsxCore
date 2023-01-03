import React from 'react';
import * as yup from 'yup';
import {Form, Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {Loader} from '../../components/common';
import {RadialItem} from '@app/store/app/types';
import {StoreDispatch} from '@app/store/rootReducer';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import {GeneralAsset, generalAssetShape} from '@app/entities/asset/inventory/GeneralAsset';
import GeneralAssetForm from '@app/views/asset/Inventory/GeneralAssetForm';
import { AssetCategoryEnum } from '@app/helpers/asset/enum'
import {
  addOrUpdateGeneralAsset,
  loadGeneralAsset,
} from '../../store/asset/inventory/assets.actions';
import {useFormikRef} from '@app/hooks/useFormikRef';

const AssetInformation = React.lazy(() => import('../../views/asset/Inventory/AssetInformation'));

interface RouteProps {
  id: string;
}

export interface EditGeneralRouteProps {}

const EditGeneralRoute: React.FC<EditGeneralRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const formikRef = useFormikRef<GeneralAsset>();
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const [generalAsset, setGeneralAsset] = React.useState<GeneralAsset>();
  const id = route.params.id;

  const handleSubmit = async (asset: GeneralAsset) => {
    dispatch(addOrUpdateGeneralAsset(asset))
      .then(() => {
        formikRef.current?.setStatus(true);
        history.push('/app/asset/inventory');
      })
      .catch(response => {
        formikRef.current?.setErrors(response.data);
      });
  };

  const handleCancel = React.useCallback(() => {
    const willProceed = window.confirm('All information will be reverted. Press OK to proceed');

    if (!willProceed) return;

    formikRef.current?.resetForm();
  }, [formikRef]);

  React.useEffect(() => {
    const radialItems: RadialItem[] = [
      {onClick: formikRef.current?.submitForm, icon: 'check', title: 'Save'},
      {onClick: handleCancel, icon: 'cross', title: 'Reset'},
    ];

    radialMenu.generate(radialItems);
  }, [radialMenu, formikRef, handleCancel]);

  React.useEffect(() => {
    dispatch(loadGeneralAsset(id)).then(generalAsset => setGeneralAsset(generalAsset));
  }, [dispatch, id]);

  if (!generalAsset) return <Loader />;

  return (
    <Formik<GeneralAsset>
      validationSchema={yup.object().shape(generalAssetShape)}
      validateOnChange={false}
      initialValues={generalAsset}
      onSubmit={handleSubmit}
      innerRef={formikRef.onRefChange}>
      <Form>
              <React.Suspense fallback={<Loader />}>
                  <AssetInformation categoryId={AssetCategoryEnum.GeneralAsset} id={parseInt(id)}>
            <GeneralAssetForm />
          </AssetInformation>
        </React.Suspense>
      </Form>
    </Formik>
  );
};

export default EditGeneralRoute;
