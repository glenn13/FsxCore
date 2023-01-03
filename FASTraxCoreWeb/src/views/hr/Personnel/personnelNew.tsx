import React, {Suspense} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Confirm} from '@app/components/common/Alert';

import {FormikHelpers} from 'formik';
import {Loader} from '@progress/kendo-react-indicators';

import http from '@app/services/http.service';
import uri from '@app/helpers/endpoints';
import {usePersonnels, usePersonnel} from '@app/services/hr/personnel.services';

import Personnel from '@app/entities/hr/Personnel';
 
import {FsxFormikDropDownList, FsxFormikRadialNewItemMenu, FsxFormikInput} from '@app/components/common/FsxFormik';
import {Form, Formik, FormikConfig} from 'formik';

import LeaveAllowanceChart from './leaveAllowanceChart';



const PersonnelNew = () => {
    
    let history = useHistory();

    const [personnelDetail, setPersonnelDetail] = React.useState<Personnel>();

    const formSubmit = async (value: Personnel) => {
        await http.post(uri.hr.personnels.base, value);
        modalSuccess();
    };
    const modalSuccess = () => {
        Confirm({
            text: 'Inspection successfully updated',
            confirmButtonText: 'Done',
            icon: 'success',
            onConfirm: () => history.push('/app/humanresource/personnel'),
        });
    };

    const initialFormValues: Personnel = {
        id: 0,
        personnelNo: '',
        firstName: '',
        middleName: '',
        lastName: '',
        assignedIdNo: '',
        contactNo: '', 
        assignedEmail: '', 
        chatId: '', 
        gender: '', 
        citizenship: '', 
        altContactNo: '',
        fatherName: '',
        motherName: '',
        spouseName: '',
        birthdate: new Date(), 
        birthPlace: '',
        personalEmailAddress: '',
        nativeLanguage: '',
        maritalStatusId: 1,
        height: '',
        weight: '',
        religion: '',
        projectId: 0,
        projectSiteId: 0,
        fileName: '',
        fileSize: 0,
        file: '',
        fileType: '',
    
    
        humanResourceDepartmentId: 0,
        humanResourcePositionId: 0,
        humanResourceStatusId: 0,
        humanResourceGroupId: 0,
        humanResourceCategoryId: 0,  
        skillLevelId: 0,
        jobCodeId: 0, 
        nationalityId: 0,

        personnelWorkPermit: []
    };

    return (
        <>
            <Formik
                initialValues={initialFormValues}
                onSubmit={value => {
                    formSubmit(value);
                }}
            >
                {() => (
                    <>
                    <Form className="h-full"> 
                        <FsxFormikRadialNewItemMenu />
                        <div className="flex flex-col h-full">
                            <LeaveAllowanceChart />
                            
                        </div>
                    </Form>
                    </>
                )}
            </Formik>
        </>
    );
}
export default PersonnelNew;
