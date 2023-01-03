import * as yup from 'yup';

import {Form, Formik, FormikProps} from 'formik';
import {
    personnelShape,
    newPersonnel,
} from '@app/entities/hr/personnel.schema';
import {
    submitPersonnel,
    submitPersonnelGridDetails,
} from '@app/store/hr/personnel.actions';

import PersonnelInformation from '@app/views/hr/Personnel/PersonnelInformation';
import { getStatus, getDefaultHrStatus } from '@app/services/hr/standardentries/status.service';
import {setPersonnelWorkPermit} from '@app/store/hr/personnelWorkPermit.reducers';
import {setPersonnelWorkVisa} from '@app/store/hr/personnelWorkVisa.reducers';
import {setPersonnelBankAccount} from '@app/store/hr/personnelBankAccount.reducers';
import {setPersonnelAddress} from '@app/store/hr/personnelAddress.reducers';
import {setPersonnelWorkOtherClearance} from '@app/store/hr/personnelWorkOtherClearance.reducers';
import {setPersonnelImageAttachment} from '@app/store/hr/personnelCustomFieldAttachment.Image.reducers';
import {setPersonnelDocumentAttachment} from '@app/store/hr/personnelCustomFieldAttachment.Document.reducers';
import {Loader} from '@app/components/common';
import {RadialItem} from '@app/store/app/types';
import React from 'react';
import {RootState, StoreDispatch} from '@app/store/rootReducer';
import _ from 'lodash';
import {generateNegativeNumber} from '@app/helpers/randoms';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import Personnel from '@app/entities/hr/Personnel';

export interface NewPersonnelRouteProps {}

const NewPersonnelRoute: React.FC<NewPersonnelRouteProps> = () => {
    const history = useHistory();
    const dispatch: StoreDispatch = useDispatch();
    const formikRef = React.useRef<FormikProps<Personnel>>(null);

    const initRadialItems: RadialItem[] = [
        {title: 'Save', icon: 'check', onClick: () => formikRef.current?.submitForm()},
        {title: 'Cancel', icon: 'cross', onClick: () => history.goBack()},
    ];

    const radialMenu = useRadialMenu({rerenderDelayMS: 50});

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [radialMenuItems, setRadialMenuItems] = React.useState<RadialItem[]>(initRadialItems);

    const [tempIds, setTempIds] = React.useState<number[]>([]);

    let _personnel: Personnel;
    _personnel = newPersonnel();

    getDefaultHrStatus().then(async response => {
        formikRef.current?.setFieldValue('humanResourceStatusId', response.data.id);
    });

    const handleSubmit = async (personnel: Personnel) => {
        if (personnel.maritalStatusId == null) personnel.maritalStatusId = 1;
        if (personnel.humanResourceStatusId === 0) personnel.humanResourceStatusId = 1;
        dispatch(submitPersonnel(personnel)) 
        .then(response => {
            let _personnelId: number;
            _personnelId = Number(response.data);
            if (_personnelId > 0) {
                dispatch(submitPersonnelGridDetails(_personnelId));
                alert('Transaction successfully saved.');
                history.push('/app/humanresource/personnel');
            }
        })
        .catch(e => {
            console.log(e);
            alert('Error occur while saving primary information.');
        });
    };
  
    React.useEffect(() => {
        radialMenu.generate(radialMenuItems);
    }, [radialMenu, radialMenuItems]);

    React.useEffect(() => {
        dispatch(setPersonnelWorkPermit([]));
        dispatch(setPersonnelWorkVisa([]));
        dispatch(setPersonnelBankAccount([]));
        dispatch(setPersonnelAddress([]));
        dispatch(setPersonnelWorkOtherClearance([]));
        dispatch(setPersonnelImageAttachment([]));
        dispatch(setPersonnelDocumentAttachment([]));
    }, [dispatch]);

    return (
        <Formik
            validationSchema={yup.object().shape(personnelShape)}
            validateOnChange={false}
            initialValues={_personnel}
            onSubmit={handleSubmit}
            innerRef={formikRef}
        >
            <Form>
                <React.Suspense fallback={<Loader />}>
                    <PersonnelInformation isEdit={false} />
                </React.Suspense>
            </Form>
        </Formik>
    );
};
export default NewPersonnelRoute;

