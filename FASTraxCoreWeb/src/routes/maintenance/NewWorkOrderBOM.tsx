import React from 'react';
import * as yup from 'yup';
import { RootState } from '@app/store/rootReducer';
import { FormikProps, Form, Formik } from 'formik';
import { RadialItem } from '@app/store/app/types';
import { StoreDispatch } from '@app/store/rootReducer';
import { Loader } from '@app/components/common';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useRadialMenu } from '@app/hooks/useRadialMenu';

import { initWorkOrderBOM } from '@app/store/maintenance/workorder/bom.reducers';
import { setWorkOrderBOMAdditionalCharges, initWorkOrderBOMAdditionalCharge } from '@app/store/maintenance/workorder/bomAdditionalCharge.reducers';
import { setWorkOrderBOMDocumentAttachments, initWorkOrderBOMDocumentAttachment } from '@app/store/maintenance/workorder/bomDocumentAttachment.reducers';
import { setWorkOrderBOMImageAttachments, initWorkOrderBOMImageAttachment } from '@app/store/maintenance/workorder/bomImageAttachment.reducers';
import { setWorkOrderBOMMaterials, initWorkOrderBOMMaterial } from '@app/store/maintenance/workorder/bomMaterial.reducers';
import { submitWorkOrderBOM, submitWorkOrderBOMGridDetails } from '@app/store/maintenance/workorder/bom.actions';

import WorkOrderBOMInformation from '@app/views/maintenance/WorkOrder/bom/WorkOrderBOMInformation';
import WorkOrderBOM, { workOrderBOMShape } from '@app/entities/maintenance/workorder/WorkOrderBOM';

export interface NewWorkOrderBOMRouteProps { }

const NewWorkOrderBOMRoute: React.FC<NewWorkOrderBOMRouteProps> = () => {
    const history = useHistory();
    const dispatch: StoreDispatch = useDispatch();
    const radialMenu = useRadialMenu({ rerenderDelayMS: 100 });
    const formikRef = React.useRef<FormikProps<WorkOrderBOM>>(null);

    const workOrderBOMReducer = useSelector((state: RootState) => state.workOrderBOMReducer);

    const handleSubmit = async (workOrderBOM: WorkOrderBOM) => {
        dispatch(submitWorkOrderBOM(workOrderBOM))
            .then(response => {

                const _workOrderBOMId = workOrderBOMReducer.workOrderBOM.id === 0 ? Number(response.data) : workOrderBOMReducer.workOrderBOM.id;
                dispatch(submitWorkOrderBOMGridDetails(_workOrderBOMId));

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
        dispatch(setWorkOrderBOMAdditionalCharges(initWorkOrderBOMAdditionalCharge));
        dispatch(setWorkOrderBOMDocumentAttachments(initWorkOrderBOMDocumentAttachment));
        dispatch(setWorkOrderBOMImageAttachments(initWorkOrderBOMImageAttachment));
        dispatch(setWorkOrderBOMMaterials(initWorkOrderBOMMaterial));
    }, [dispatch]);

    return (
        <Formik
            validationSchema={yup.object().shape(workOrderBOMShape)}
            validateOnChange={false}
            initialValues={initWorkOrderBOM()}
            onSubmit={handleSubmit}
            innerRef={formikRef}>
            <Form>
                <React.Suspense fallback={<Loader />}>
                    <WorkOrderBOMInformation />
                </React.Suspense>
            </Form>
        </Formik>
    );
};

export default NewWorkOrderBOMRoute;
