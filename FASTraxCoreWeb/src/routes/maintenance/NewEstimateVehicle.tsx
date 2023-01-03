import React from 'react';
import * as Yup from 'yup';
import { RootState } from '@app/store/rootReducer';
import { FormikProps, Form, Formik } from 'formik';
import { RadialItem } from '@app/store/app/types';
import { StoreDispatch } from '@app/store/rootReducer';
import { Loader } from '@app/components/common';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useRadialMenu } from '@app/hooks/useRadialMenu';

import { initEstimateVehicle } from '@app/store/maintenance/estimate/vehicle.reducers';
import { setEstimateVehicleAdditionalCharges, initEstimateVehicleAdditionalCharge } from '@app/store/maintenance/estimate/vehicleAdditionalCharge.reducers';
import { setEstimateVehicleDocumentAttachments, initEstimateVehicleDocumentAttachment } from '@app/store/maintenance/estimate/vehicleDocumentAttachment.reducers';
import { setEstimateVehicleImageAttachments, initEstimateVehicleImageAttachment } from '@app/store/maintenance/estimate/vehicleImageAttachment.reducers';
import { setEstimateVehicleMaterials, initEstimateVehicleMaterial } from '@app/store/maintenance/estimate/vehicleMaterial.reducers';
import { submitEstimateVehicle, submitEstimateVehicleGridDetails } from '@app/store/maintenance/estimate/vehicle.actions';

import EstimateVehicleInformation from '@app/views/maintenance/Estimate/vehicle/EstimateVehicleInformation';
import EstimateVehicle, { estimateVehicleShape } from '@app/entities/maintenance/estimate/EstimateVehicle';

interface RouteProps { id: string; }

export interface NewEstimateVehicleRouteProps { }

const NewEstimateVehicleRoute: React.FC<NewEstimateVehicleRouteProps> = () => {
    const history = useHistory();
    const route = useRouteMatch<RouteProps>();
    const dispatch: StoreDispatch = useDispatch();
    const radialMenu = useRadialMenu({ rerenderDelayMS: 100 });
    const formikRef = React.useRef<FormikProps<EstimateVehicle>>(null);
    const vehicleId = route.params.id;

    const estimateVehicleReducer = useSelector((state: RootState) => state.estimateVehicleReducer);

    const handleSubmit = async (estimateVehicle: EstimateVehicle) => {
        dispatch(submitEstimateVehicle(estimateVehicle))
            .then(response => {

                const _estimateVehicleId = estimateVehicleReducer.estimateVehicle.id === 0 ? Number(response.data) : estimateVehicleReducer.estimateVehicle.id;
                dispatch(submitEstimateVehicleGridDetails(_estimateVehicleId));

                alert('Transaction successfully saved.');
                history.goBack();
            })
            .catch(() => { alert('Error occur while saving primary information.') });
    };

    React.useEffect(() => {
        const radialItems: RadialItem[] = [
            { onClick: () => formikRef.current?.submitForm(), icon: 'check', title: 'Save' }
            , { icon: 'cross', title: 'Cancel', onClick: () => history.goBack() }
            , { icon: 'save-print', title: 'Save & Print' }];
        radialMenu.generate(radialItems);
    }, [radialMenu, history]);

    /*
    * Added this when a page is being un-mount, all models will be initialize.
    * This is the fix when a user edit a certain record and suddenly click the main menu and load the initial grid view,
    * upon creating new transaction, previous data still mount in the reducer.
    */
    React.useEffect(() => {
        dispatch(setEstimateVehicleAdditionalCharges(initEstimateVehicleAdditionalCharge));
        dispatch(setEstimateVehicleDocumentAttachments(initEstimateVehicleDocumentAttachment));
        dispatch(setEstimateVehicleImageAttachments(initEstimateVehicleImageAttachment));
        dispatch(setEstimateVehicleMaterials(initEstimateVehicleMaterial));
    }, [dispatch]);

    return (
        <Formik
            validationSchema={Yup.object().shape(estimateVehicleShape)}
            initialValues={initEstimateVehicle(Number(vehicleId))}
            onSubmit={handleSubmit}
            innerRef={formikRef}>
            <Form className='min-h-full'>
                <React.Suspense fallback={<Loader />}>
                    <EstimateVehicleInformation isEdit={false} />
                </React.Suspense>
            </Form>
        </Formik>
    );
};

export default NewEstimateVehicleRoute;
