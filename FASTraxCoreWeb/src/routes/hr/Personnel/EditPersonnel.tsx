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
    loadPersonnelWorkPermit, 
    loadPersonnelWorkVisa, 
    loadPersonnelBankAccount, 
    loadPersonnelAddress,
    loadPersonnelWorkOtherClearance, 
    loadPersonnelImageAttachment, 
    loadPersonnelDocumentAttachment,
    loadPersonnelWorkHistory
} from '@app/store/hr/personnel.actions';
import { getPersonnelFullInfo } from '@app/services/hr/personnel.services';
import {
    submitPersonnel,
    submitPersonnelGridDetails,
} from '@app/store/hr/personnel.actions';
import PersonnelInformation from '@app/views/hr/Personnel/PersonnelInformation';
import Personnel, {
    personnelShape,
} from '@app/entities/hr/Personnel';

interface RouteProps {
    id: string;
}

export interface EditPersonnelRouteProps {}

const EditPersonnelRoute: React.FC<EditPersonnelRouteProps> = () => {
    const history = useHistory();
    const route = useRouteMatch<RouteProps>();
    const dispatch: StoreDispatch = useDispatch();
    const id = route.params.id;
    const radialMenu = useRadialMenu({rerenderDelayMS: 100});
    const formikRef = React.useRef<FormikProps<Personnel>>(null);
    const [varPersonnel, setPersonnel] = React.useState<Personnel>();

    React.useEffect(() => {
        getPersonnelFullInfo(id).then(response => setPersonnel(response.data));
        dispatch(loadPersonnelWorkPermit(id));
        dispatch(loadPersonnelWorkVisa(id));
        dispatch(loadPersonnelBankAccount(id));
        dispatch(loadPersonnelAddress(id));
        dispatch(loadPersonnelWorkOtherClearance(id));
        dispatch(loadPersonnelImageAttachment(id));
        dispatch(loadPersonnelDocumentAttachment(id));
        dispatch(loadPersonnelWorkHistory(id));

        
    }, [dispatch, id]);
 




    const handleSubmit = async (personnel: Personnel) => {
        if (personnel.maritalStatusId == null) personnel.maritalStatusId = 1;
        if (personnel.humanResourceStatusId === 0) personnel.humanResourceStatusId = 1;
            

        
        dispatch(submitPersonnel(personnel))
        .then(response => {
            dispatch(submitPersonnelGridDetails(Number(id)));

            alert('Transaction successfully saved.');
            history.goBack();
        })
        .catch(() => {
            alert('Error occur while saving primary information.');
        });
    };

    React.useEffect(() => {
        if (!varPersonnel) return;

        const radialItems: RadialItem[] = [
        {onClick: () => formikRef.current?.submitForm(), icon: 'check', title: 'Save'},
        ];
        radialMenu.generate(radialItems);
    }, [dispatch, radialMenu, varPersonnel]);

    const radialItems: RadialItem[] = [
        { onClick: () => formikRef.current?.submitForm(), icon: 'check', title: 'Save' }, 
        { icon: 'cross', title: 'Cancel', onClick: () => history.goBack() }
    ];
    radialMenu.generate(radialItems);

    if (!varPersonnel) return <Loader />;

    return (
        <Formik
            validationSchema={yup.object().shape(personnelShape)}
            validateOnChange={false}
            initialValues={varPersonnel}
            onSubmit={handleSubmit}
            innerRef={formikRef}
        >
            <Form>
                <Suspense fallback={<Loader />}>
                    <PersonnelInformation isEdit={true} />
                </Suspense>
            </Form>
        </Formik>
    );
}

export default EditPersonnelRoute;
