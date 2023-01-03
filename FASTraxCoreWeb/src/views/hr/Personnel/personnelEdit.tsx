import React, {Suspense} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Confirm} from '@app/components/common/Alert';

import {Loader} from '@progress/kendo-react-indicators';

import http from '@app/services/http.service';
import uri from '@app/helpers/endpoints';
import Personnel from '@app/entities/hr/Personnel';
import {FsxFormikDropDownList, FsxFormikRadialNewItemMenu, FsxFormikInput} from '@app/components/common/FsxFormik';
import {Form, Formik, FormikConfig} from 'formik';

import LeaveAllowanceChart from './leaveAllowanceChart';


const PersonnelEdit = () => {

    let history = useHistory();
    let {id} = useParams<any>();

const [personnelDetail, setPersonnelDetail] = React.useState<Personnel>();


React.useEffect(() => {
    (async () => {
        const res = await http.get(`${uri.hr.personnels.find(id)}`);
        setPersonnelDetail(res.data);
    })();
}, [id]);

  const formSubmit = async (value: Personnel) => {
    await http.patch(`${uri.hr.personnels.base}/${id}`, value);
    modalSuccess();
  };

  const modalSuccess = () => {
    Confirm({
      text: 'Personnel information updated',
      confirmButtonText: 'Done',
      icon: 'success',
      onConfirm: () => history.push('/app/humanresource/personnel'),
    });
  };


    if (!personnelDetail) return <Loader />;

    const initialFormValues: Personnel = {
        id: personnelDetail.id,
        personnelNo: personnelDetail.personnelNo,
        firstName: personnelDetail.firstName,
        middleName: personnelDetail.middleName,
        lastName: personnelDetail.lastName,
        assignedIdNo: personnelDetail.assignedIdNo,
        contactNo: personnelDetail.contactNo,
        assignedEmail: personnelDetail.assignedEmail, 
        chatId: personnelDetail.chatId,  
        gender: personnelDetail.gender,  
        citizenship: personnelDetail.citizenship,  
        
        fileName: personnelDetail.fileName,
        fileSize:personnelDetail.fileSize,
        file: personnelDetail.file,
        fileType: personnelDetail.fileType,
    
        altContactNo: personnelDetail.altContactNo,  
        fatherName: personnelDetail.fatherName,  
        motherName: personnelDetail.motherName,  
        spouseName: personnelDetail.spouseName,  
        birthdate: personnelDetail.birthdate,  
        birthPlace: personnelDetail.birthPlace,  
        personalEmailAddress: personnelDetail.personalEmailAddress,  
        nativeLanguage: personnelDetail.nativeLanguage,  
        maritalStatusId: personnelDetail.maritalStatusId,  
        height: personnelDetail.height,  
        weight: personnelDetail.weight,  
        religion: personnelDetail.religion, 
        projectId: personnelDetail.projectId,
        projectSiteId: personnelDetail.projectSiteId, 
    
        humanResourceDepartmentId: personnelDetail.humanResourceDepartmentId,
        humanResourcePositionId: personnelDetail.humanResourcePositionId,
        humanResourceStatusId: personnelDetail.humanResourceStatusId,
        humanResourceGroupId: personnelDetail.humanResourceGroupId,
        humanResourceCategoryId: personnelDetail.humanResourceCategoryId,
        skillLevelId: personnelDetail.skillLevelId,
        jobCodeId: personnelDetail.jobCodeId,
        nationalityId: personnelDetail.nationalityId,

        humanResourceCategory: personnelDetail.humanResourceCategory,
        humanResourceDepartment: personnelDetail.humanResourceDepartment,
        humanResourcePosition: personnelDetail.humanResourcePosition,
        humanResourceStatus: personnelDetail.humanResourceStatus,
        humanResourceGroup: personnelDetail.humanResourceGroup,
        nationality: personnelDetail.nationality,
        skillLevel: personnelDetail.skillLevel,
        jobCode: personnelDetail.jobCode,
        personnelWorkPermit: personnelDetail.personnelWorkPermit?.map(wp => ({
            ...wp,
            dateEntry: new Date(wp.dateEntry),
            dateExpiry: new Date(wp.dateExpiry),
            dateRenewal: new Date(wp.dateRenewal),
        })),
    };

    return (
        <Suspense fallback={<Loader />}>
            <Formik
                initialValues={initialFormValues}
                //   validationSchema={InspectionVehicleSchema}
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
        </Suspense>
    );

};

export default PersonnelEdit;


