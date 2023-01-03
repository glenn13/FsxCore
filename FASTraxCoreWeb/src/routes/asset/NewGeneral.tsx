import React from 'react';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Form, Formik, FormikProps} from 'formik';
import {Loader} from '../../components/common';
import {RadialItem} from '@app/store/app/types';
import {StoreDispatch} from '@app/store/rootReducer';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import GeneralAssetForm from '@app/views/asset/Inventory/GeneralAssetForm';
import {
  GeneralAsset,
  generalAssetShape,
  newGeneralAsset,
} from '@app/entities/asset/inventory/GeneralAsset';
import {
  addOrUpdateGeneralAsset,
  loadGeneralCustomFields,
} from '@app/store/asset/inventory/assets.actions';
import { AssetCategoryEnum } from '@app/helpers/asset/enum'

const AssetInformation = React.lazy(() => import('../../views/asset/Inventory/AssetInformation'));

export interface NewGeneralRouteProps {}

const NewGeneralRoute: React.FC<NewGeneralRouteProps> = () => {
  const history = useHistory();
  const dispatch: StoreDispatch = useDispatch();
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const [generalAsset] = React.useState(() => newGeneralAsset());
  const formikRef = React.useRef<FormikProps<GeneralAsset>>(null);

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
    const willProceed = window.confirm('All information will be cleared. Press OK to proceed');

    if (!willProceed) return;

    formikRef.current?.resetForm();
  }, []);

  React.useEffect(() => {
    const radialItems: RadialItem[] = [
      {onClick: formikRef.current?.submitForm, icon: 'check', title: 'Save'},
      {onClick: handleCancel, icon: 'cross', title: 'Cancel'},
    ];

    radialMenu.generate(radialItems);
  }, [handleCancel, radialMenu]);

  React.useEffect(() => {
    dispatch(loadGeneralCustomFields());
  }, [dispatch]);

  return (
    <Formik
      validationSchema={yup.object().shape(generalAssetShape)}
      validateOnChange={false}
      initialValues={generalAsset}
      onSubmit={handleSubmit}
      innerRef={formikRef}>
      <Form>
              <React.Suspense fallback={<Loader />}>
                  <AssetInformation categoryId={AssetCategoryEnum.GeneralAsset}>
            <GeneralAssetForm isNew />
          </AssetInformation>
        </React.Suspense>
      </Form>
    </Formik>
  );
};

export default NewGeneralRoute;
