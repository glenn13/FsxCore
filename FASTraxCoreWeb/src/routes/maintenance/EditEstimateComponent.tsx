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
  loadEstimateComponentAdditionalCharge,
  loadEstimateComponentDocumentAttachments,
  loadEstimateComponentImageAttachments,
  loadEstimateComponentMaterials,
} from '@app/store/maintenance/estimate/component.actions';
import {getEstimateComponentFullInfo} from '@app/services/maintenance/estimatecomponent.service';
import {
  submitEstimateComponent,
  submitEstimateComponentGridDetails,
} from '@app/store/maintenance/estimate/component.actions';

import EstimateComponentInformation from '@app/views/maintenance/Estimate/component/EstimateComponentInformation';
import EstimateComponent, {
  estimateComponentShape,
} from '@app/entities/maintenance/estimate/EstimateComponent';

interface RouteProps {
  id: string;
}

export interface EditEstimateComponentRouteProps {}

const EditEstimateComponentRoute: React.FC<EditEstimateComponentRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const id = route.params.id;
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const formikRef = React.useRef<FormikProps<EstimateComponent>>(null);
  const [varEstimateComponent, setEstimateComponent] = React.useState<EstimateComponent>();

  React.useEffect(() => {
    getEstimateComponentFullInfo(id).then(response => setEstimateComponent(response.data));
    dispatch(loadEstimateComponentAdditionalCharge(id));
    dispatch(loadEstimateComponentDocumentAttachments(id));
    dispatch(loadEstimateComponentImageAttachments(id));
    dispatch(loadEstimateComponentMaterials(id));
  }, [dispatch, id]);

  const handleSubmit = async (estimateComponent: EstimateComponent) => {
    dispatch(submitEstimateComponent(estimateComponent))
      .then(response => {
        dispatch(submitEstimateComponentGridDetails(Number(id)));

        alert('Transaction successfully saved.');
        history.goBack();
      })
      .catch(() => {
        alert('Error occur while saving primary information.');
      });
  };

  React.useEffect(() => {
    if (!varEstimateComponent) return;

    const radialItems: RadialItem[] = [
      {onClick: () => formikRef.current?.submitForm(), icon: 'check', title: 'Save'},
    ];
    radialMenu.generate(radialItems);
  }, [dispatch, radialMenu, varEstimateComponent]);

  const radialItems: RadialItem[] = [{ onClick: () => formikRef.current?.submitForm(), icon: 'check', title: 'Save' }
      , { icon: 'cross', title: 'Cancel', onClick: () => history.goBack() }
      , { icon: 'save-print', title: 'Save & Print' }];
  radialMenu.generate(radialItems);

    if (!varEstimateComponent) return <Loader />;

    return (
        <Formik
            validationSchema={yup.object().shape(estimateComponentShape)}
            validateOnChange={false}
            initialValues={varEstimateComponent}
            onSubmit={handleSubmit}
            innerRef={formikRef}>
            <Form>
                <Suspense fallback={<Loader />}>
                    <EstimateComponentInformation isEdit={true} />
                </Suspense>
            </Form>
        </Formik>
    );
}

export default EditEstimateComponentRoute;
