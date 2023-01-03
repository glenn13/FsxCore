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

import { initEstimateGeneralAsset } from '@app/store/maintenance/estimate/generalAsset.reducers';
import { setEstimateGeneralAssetAdditionalCharges, initEstimateGeneralAssetAdditionalCharge } from '@app/store/maintenance/estimate/generalAssetAdditionalCharge.reducers';
import { setEstimateGeneralAssetDocumentAttachments, initEstimateGeneralAssetDocumentAttachment } from '@app/store/maintenance/estimate/generalAssetDocumentAttachment.reducers';
import { setEstimateGeneralAssetImageAttachments, initEstimateGeneralAssetImageAttachment } from '@app/store/maintenance/estimate/generalAssetImageAttachment.reducers';
import { setEstimateGeneralAssetMaterials, initEstimateGeneralAssetMaterial } from '@app/store/maintenance/estimate/generalAssetMaterial.reducers';
import { submitEstimateGeneralAsset, submitEstimateGeneralAssetGridDetails } from '@app/store/maintenance/estimate/generalAsset.actions';

import EstimateGeneralAssetInformation from '@app/views/maintenance/Estimate/generalasset/EstimateGeneralAssetInformation';
import EstimateGeneralAsset, { estimateGeneralAssetShape } from '@app/entities/maintenance/estimate/EstimateGeneralAsset';

interface RouteProps { id: string; }

export interface NewEstimateGeneralAssetRouteProps { }

const NewEstimateGeneralAssetRoute: React.FC<NewEstimateGeneralAssetRouteProps> = () => {
    const history = useHistory();
    const route = useRouteMatch<RouteProps>();
    const dispatch: StoreDispatch = useDispatch();
    const radialMenu = useRadialMenu({ rerenderDelayMS: 100 });
    const formikRef = React.useRef<FormikProps<EstimateGeneralAsset>>(null);
    const generalAssetId = route.params.id;

    const estimateGeneralAssetReducer = useSelector((state: RootState) => state.estimateGeneralAssetReducer);

    const handleSubmit = async (estimateGeneralAsset: EstimateGeneralAsset) => {
        dispatch(submitEstimateGeneralAsset(estimateGeneralAsset))
            .then(response => {

                const _estimateGeneralAssetId = estimateGeneralAssetReducer.estimateGeneralAsset.id === 0 ? Number(response.data) : estimateGeneralAssetReducer.estimateGeneralAsset.id;
                dispatch(submitEstimateGeneralAssetGridDetails(_estimateGeneralAssetId));

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
        dispatch(setEstimateGeneralAssetAdditionalCharges(initEstimateGeneralAssetAdditionalCharge));
        dispatch(setEstimateGeneralAssetDocumentAttachments(initEstimateGeneralAssetDocumentAttachment));
        dispatch(setEstimateGeneralAssetImageAttachments(initEstimateGeneralAssetImageAttachment));
        dispatch(setEstimateGeneralAssetMaterials(initEstimateGeneralAssetMaterial));
    }, [dispatch]);

    return (
        <Formik
            validationSchema={yup.object().shape(estimateGeneralAssetShape)}
            validateOnChange={false}
            initialValues={initEstimateGeneralAsset(Number(generalAssetId))}
            onSubmit={handleSubmit}
            innerRef={formikRef}>
            <Form>
                <React.Suspense fallback={<Loader />}>
                    <EstimateGeneralAssetInformation isEdit={false}/>
                </React.Suspense>
            </Form>
        </Formik>
    );
};

export default NewEstimateGeneralAssetRoute;
