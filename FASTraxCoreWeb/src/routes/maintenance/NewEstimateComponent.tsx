import React from 'react';
import * as yup from 'yup';
import { RootState } from '@app/store/rootReducer';
import { FormikProps, Form, Formik } from 'formik';
import { RadialItem } from '@app/store/app/types';
import { StoreDispatch } from '@app/store/rootReducer';
import { Loader } from '@app/components/common';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useRadialMenu } from '@app/hooks/useRadialMenu';

import { initEstimateComponent } from '@app/store/maintenance/estimate/component.reducers';
import { setEstimateComponentAdditionalCharges, initEstimateComponentAdditionalCharge } from '@app/store/maintenance/estimate/componentAdditionalCharge.reducers';
import { setEstimateComponentDocumentAttachments, initEstimateComponentDocumentAttachment } from '@app/store/maintenance/estimate/componentDocumentAttachment.reducers';
import { setEstimateComponentImageAttachments, initEstimateComponentImageAttachment } from '@app/store/maintenance/estimate/componentImageAttachment.reducers';
import { setEstimateComponentMaterials, initEstimateComponentMaterial } from '@app/store/maintenance/estimate/componentMaterial.reducers';
import { submitEstimateComponent, submitEstimateComponentGridDetails } from '@app/store/maintenance/estimate/component.actions';

import EstimateComponentInformation from '@app/views/maintenance/Estimate/component/EstimateComponentInformation';
import EstimateComponent, { estimateComponentShape } from '@app/entities/maintenance/estimate/EstimateComponent';

interface RouteProps { id: string; }

export interface NewEstimateComponentRouteProps { }

const NewEstimateComponentRoute: React.FC<NewEstimateComponentRouteProps> = () => {
    const history = useHistory();
    const route = useRouteMatch<RouteProps>();
    const dispatch: StoreDispatch = useDispatch();
    const radialMenu = useRadialMenu({ rerenderDelayMS: 100 });
    const formikRef = React.useRef<FormikProps<EstimateComponent>>(null);
    const componentId = route.params.id;

    const estimateComponentReducer = useSelector((state: RootState) => state.estimateComponentReducer);

    const handleSubmit = async (estimateComponent: EstimateComponent) => {
        dispatch(submitEstimateComponent(estimateComponent))
            .then(response => {

                const _estimateComponentId = estimateComponentReducer.estimateComponent.id === 0 ? Number(response.data) : estimateComponentReducer.estimateComponent.id;
                dispatch(submitEstimateComponentGridDetails(_estimateComponentId));

                alert('Transaction successfully saved.');
                history.goBack();
            })
            .catch(() => { alert('Error occur while saving primary information.') });
    };

    React.useEffect(() => {
        const radialItems: RadialItem[] = [{ onClick: () => formikRef.current?.submitForm(), icon: 'check', title: 'Save' }
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
        dispatch(setEstimateComponentAdditionalCharges(initEstimateComponentAdditionalCharge));
        dispatch(setEstimateComponentDocumentAttachments(initEstimateComponentDocumentAttachment));
        dispatch(setEstimateComponentImageAttachments(initEstimateComponentImageAttachment));
        dispatch(setEstimateComponentMaterials(initEstimateComponentMaterial));
    }, [dispatch]);

    return (
        <Formik
            validationSchema={yup.object().shape(estimateComponentShape)}
            validateOnChange={false}
            initialValues={initEstimateComponent(Number(componentId))}
            onSubmit={handleSubmit}
            innerRef={formikRef}>
            <Form>
                <React.Suspense fallback={<Loader />}>
                    <EstimateComponentInformation isEdit={false} />
                </React.Suspense>
            </Form>
        </Formik>
    );
};

export default NewEstimateComponentRoute;
