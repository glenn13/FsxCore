import React, {Suspense} from 'react';
import * as yup from 'yup';
import {RadialItem} from '@app/store/app/types';
import {StoreDispatch} from '@app/store/rootReducer';
import {FormikProps, Formik, Form} from 'formik';
import {Loader} from '@app/components/common';
import {useDispatch} from 'react-redux';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import {useRouteMatch, useHistory} from 'react-router-dom';

import {
  loadEstimateGeneralAssetAdditionalCharge,
  loadEstimateGeneralAssetDocumentAttachments,
  loadEstimateGeneralAssetImageAttachments,
  loadEstimateGeneralAssetMaterials,
} from '@app/store/maintenance/estimate/generalAsset.actions';
import {getEstimateGeneralAssetFullInfo} from '@app/services/maintenance/estimategeneralasset.service';
import {
  submitEstimateGeneralAsset,
  submitEstimateGeneralAssetGridDetails,
} from '@app/store/maintenance/estimate/generalAsset.actions';

import EstimateGeneralAssetInformation from '@app/views/maintenance/Estimate/generalasset/EstimateGeneralAssetInformation';
import EstimateGeneralAsset, {
  estimateGeneralAssetShape,
} from '@app/entities/maintenance/estimate/EstimateGeneralAsset';

interface RouteProps {
  id: string;
}

export interface EditEstimateGeneralAssetRouteProps {}

const EditEstimateGeneralAssetRoute: React.FC<EditEstimateGeneralAssetRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const id = route.params.id;
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const formikRef = React.useRef<FormikProps<EstimateGeneralAsset>>(null);
  const [varEstimateGeneralAsset, setEstimateGeneralAsset] = React.useState<EstimateGeneralAsset>();

  React.useEffect(() => {
    getEstimateGeneralAssetFullInfo(id).then(response => setEstimateGeneralAsset(response.data));
    dispatch(loadEstimateGeneralAssetAdditionalCharge(id));
    dispatch(loadEstimateGeneralAssetDocumentAttachments(id));
    dispatch(loadEstimateGeneralAssetImageAttachments(id));
    dispatch(loadEstimateGeneralAssetMaterials(id));
  }, [dispatch, id]);

  const handleSubmit = async (estimateGeneralAsset: EstimateGeneralAsset) => {
    dispatch(submitEstimateGeneralAsset(estimateGeneralAsset))
      .then(response => {
        dispatch(submitEstimateGeneralAssetGridDetails(Number(id)));

        alert('Transaction successfully saved.');
        history.goBack();
      })
      .catch(() => {
        alert('Error occur while saving primary information.');
      });
  };

  React.useEffect(() => {
    if (!varEstimateGeneralAsset) return;

    const radialItems: RadialItem[] = [
      {onClick: () => formikRef.current?.submitForm(), icon: 'check', title: 'Save'},
    ];
    radialMenu.generate(radialItems);
  }, [dispatch, radialMenu, varEstimateGeneralAsset]);

  const radialItems: RadialItem[] = [{ onClick: () => formikRef.current?.submitForm(), icon: 'check', title: 'Save' }
      , { icon: 'cross', title: 'Cancel', onClick: () => history.goBack() }
      , { icon: 'save-print', title: 'Save & Print' }];
  radialMenu.generate(radialItems);

    if (!varEstimateGeneralAsset) return <Loader />;

    return (
        <Formik
            validationSchema={yup.object().shape(estimateGeneralAssetShape)}
            validateOnChange={false}
            initialValues={varEstimateGeneralAsset}
            onSubmit={handleSubmit}
            innerRef={formikRef}>
            <Form>
                <Suspense fallback={<Loader />}>
                    <EstimateGeneralAssetInformation isEdit={true}/>
                </Suspense>
            </Form>
        </Formik>
    );
}

export default EditEstimateGeneralAssetRoute;
