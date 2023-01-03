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
  loadEstimateVehicleAdditionalCharge,
  loadEstimateVehicleDocumentAttachments,
  loadEstimateVehicleImageAttachments,
  loadEstimateVehicleMaterials,
} from '@app/store/maintenance/estimate/vehicle.actions';
import {getEstimateVehicleFullInfo} from '@app/services/maintenance/estimatevehicle.service';
import {
  submitEstimateVehicle,
  submitEstimateVehicleGridDetails,
} from '@app/store/maintenance/estimate/vehicle.actions';

import EstimateVehicleInformation from '@app/views/maintenance/Estimate/vehicle/EstimateVehicleInformation';
import EstimateVehicle, {
  estimateVehicleShape,
} from '@app/entities/maintenance/estimate/EstimateVehicle';

interface RouteProps {
  id: string;
}

export interface EditEstimateVehicleRouteProps {}

const EditEstimateVehicleRoute: React.FC<EditEstimateVehicleRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const id = route.params.id;
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const formikRef = React.useRef<FormikProps<EstimateVehicle>>(null);
  const [varEstimateVehicle, setEstimateVehicle] = React.useState<EstimateVehicle>();

  React.useEffect(() => {
    getEstimateVehicleFullInfo(id).then(response => setEstimateVehicle(response.data));
    dispatch(loadEstimateVehicleAdditionalCharge(id));
    dispatch(loadEstimateVehicleDocumentAttachments(id));
    dispatch(loadEstimateVehicleImageAttachments(id));
    dispatch(loadEstimateVehicleMaterials(id));
  }, [dispatch, id]);

  const handleSubmit = async (estimateVehicle: EstimateVehicle) => {
    dispatch(submitEstimateVehicle(estimateVehicle))
      .then(response => {
        dispatch(submitEstimateVehicleGridDetails(Number(id)));

        alert('Transaction successfully saved.');
        history.goBack();
      })
      .catch(() => {
        alert('Error occur while saving primary information.');
      });
  };

  React.useEffect(() => {
    if (!varEstimateVehicle) return;

    const radialItems: RadialItem[] = [
      {onClick: () => formikRef.current?.submitForm(), icon: 'check', title: 'Save'},
    ];
    radialMenu.generate(radialItems);
  }, [dispatch, radialMenu, varEstimateVehicle]);

    const radialItems: RadialItem[] = [{ onClick: () => formikRef.current?.submitForm(), icon: 'check', title: 'Save' }
        , { icon: 'cross', title: 'Cancel', onClick: () => history.goBack() }
        , { icon: 'save-print', title: 'Save & Print' }];
    radialMenu.generate(radialItems);

    if (!varEstimateVehicle) return <Loader />;

    return (
        <Formik
            validationSchema={yup.object().shape(estimateVehicleShape)}
            validateOnChange={false}
            initialValues={varEstimateVehicle}
            onSubmit={handleSubmit}
            innerRef={formikRef}>
            <Form>
                <Suspense fallback={<Loader />}>
                    <EstimateVehicleInformation isEdit={true} />
                </Suspense>
            </Form>
        </Formik>
    );
}

export default EditEstimateVehicleRoute;
