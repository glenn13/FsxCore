import * as yup from 'yup';

import { Form, Formik, FormikProps } from 'formik';
import WorkOrderBOM, { workOrderBOMShape } from '@app/entities/maintenance/workorder/WorkOrderBOM';
import { loadWorkOrderBOMAdditionalCharge,
    loadWorkOrderBOMDocumentAttachments,
    loadWorkOrderBOMImageAttachments,
    loadWorkOrderBOMMaterials,
} from '@app/store/maintenance/workorder/bom.actions';
import {
    submitWorkOrderBOM,
    submitWorkOrderBOMGridDetails,
} from '@app/store/maintenance/workorder/bom.actions';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { Loader } from '@app/components/common';
import { RadialItem } from '@app/store/app/types';
import React from 'react';
import { StoreDispatch } from '@app/store/rootReducer';
import WorkOrderBOMInformation from '@app/views/maintenance/WorkOrder/bom/WorkOrderBOMInformation';
import { getWorkOrderBOMFullInfo } from '@app/services/maintenance/workorderbom.service';
import { useDispatch } from 'react-redux';
import { useRadialMenu } from '@app/hooks/useRadialMenu';

interface RouteProps {
    id: string;
}

export interface EditWorkOrderBOMRouteProps { }

const EditWorkOrderBOMRoute: React.FC<EditWorkOrderBOMRouteProps> = () => {
    const history = useHistory();
    const route = useRouteMatch<RouteProps>();
    const dispatch: StoreDispatch = useDispatch();
    const id = route.params.id;
    const radialMenu = useRadialMenu({ rerenderDelayMS: 100 });
    const formikRef = React.useRef<FormikProps<WorkOrderBOM>>(null);
    const [varWorkOrderBOM, setWorkOrderBOM] = React.useState<WorkOrderBOM>();

    React.useEffect(() => {
        getWorkOrderBOMFullInfo(id).then(response => setWorkOrderBOM(response.data));
        dispatch(loadWorkOrderBOMAdditionalCharge(id));
        dispatch(loadWorkOrderBOMDocumentAttachments(id));
        dispatch(loadWorkOrderBOMImageAttachments(id));
        dispatch(loadWorkOrderBOMMaterials(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleSubmit = async (workOrderBOM: WorkOrderBOM) => {
        dispatch(submitWorkOrderBOM(workOrderBOM))
            .then(response => {
                dispatch(submitWorkOrderBOMGridDetails(Number(id)));

                alert('Transaction successfully saved.');
                history.goBack();
            })
            .catch(() => {
                alert('Error occur while saving primary information.');
            });
    };

    React.useEffect(() => {
        if (!varWorkOrderBOM) return;

        const radialItems: RadialItem[] = [
            { onClick: () => formikRef.current?.submitForm(), icon: 'check', title: 'Save' }
            , { icon: 'cross', title: 'Cancel', onClick: () => history.goBack() }
            , { icon: 'save-print', title: 'Save & Print' }];
        radialMenu.generate(radialItems);
    }, [dispatch, radialMenu, varWorkOrderBOM, history]);

    if (!varWorkOrderBOM) return <Loader />;

    return (
        <Formik
            validationSchema={yup.object().shape(workOrderBOMShape)}
            validateOnChange={false}
            initialValues={varWorkOrderBOM}
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

export default EditWorkOrderBOMRoute;
