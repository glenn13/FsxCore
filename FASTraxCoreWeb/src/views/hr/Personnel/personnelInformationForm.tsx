import {FsxFormikDropDownList, FsxFormikInput} from '@app/components/common/FsxFormik';
import React from 'react';
 
import Heading from '@app/views/common/Heading';
import {useNationalities} from '@app/services/hr/standardentries/nationality.service';
import {useCategories} from '@app/services/hr/standardentries/category.service';
import {usePersonnelGroups} from '@app/services/hr/standardentries/personnelgroups.service';
import {usePersonnelPositions} from '@app/services/hr/standardentries/personnelpositions.service';
import {useHumanResourceDepartments} from '@app/services/hr/standardentries/humanResourceDepartment.service';
import {useJobCodes} from '@app/services/hr/standardentries/jobcodes.service';
import {useSkillLevels} from '@app/services/hr/standardentries/skilllevels.service';
import {useStatus} from '@app/services/hr/standardentries/status.service';
import {useProjects, useProjectSites} from '@app/services/catalog/project.service';

import {Formik, FormikProps, useFormikContext} from 'formik';
import Personnel from '@app/entities/hr/Personnel';

const PersonnelIformationForm = () => {
  
    /* ------------------------------------------------------------------------- */
    /*                                 Components                                */
    /* ------------------------------------------------------------------------- */
    //* Nationalities
    const {data: nationalityRes, isLoading: fetchingNationalities} = useNationalities();

    //* Projects
    const {data: projectRes, isLoading: fetchingProjects} = useProjects();

    //* Project Site
    const {data: projectSiteRes, isLoading: fetchingProjectSites} = useProjectSites();

    //* Categories
    const {data: categoriesRes, isLoading: fetchingCategories} = useCategories();

    //* Personnel Groups
    const {data: personnelGroupsRes, isLoading: fetchingPersonnelGroups} = usePersonnelGroups();

    //* Personnel Positions
    const {data: personnelPositionsRes, isLoading: fetchingPersonnelPositions} = usePersonnelPositions();
    
    //* Department
    const {data: departmentRes, isLoading: fetchingDepartments} = useHumanResourceDepartments();

    //* Job Codes
    const {data: jobCodeRes, isLoading: fetchingJobCode} = useJobCodes();
    
    const [varPersonnelNo, setPersonnelNo] = React.useState('');

    const formikPersonnel = useFormikContext<Personnel>();
    
  React.useEffect(() => {
    setPersonnelNo('Personnel ID No: '+formikPersonnel.values.personnelNo);
  }, [formikPersonnel.values.personnelNo]);

    const gender = [
        { id: 1, name: 'Male' },
        { id: 2, name: 'Female' },
    ];
    
  return (
      <>
        <Heading title={varPersonnelNo} />
        <div className="m-2">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                <FsxFormikInput 
                    label="Assigned ID No.:" 
                    name="assignedIdNo" 
                    type="text" 
                    required
                />
                <FsxFormikInput 
                    label="First Name:" 
                    name="firstName" 
                    type="text" 
                    required
                />
                <FsxFormikInput 
                    label="Middle Name:" 
                    name="middleName" 
                    type="text" 
                />
                <FsxFormikInput 
                    label="Last Name:" 
                    name="lastName" 
                    type="text" 
                    required
                />
                <FsxFormikDropDownList
                    label="Sub-Category:"
                    name="humanResourceCategoryId"
                    className="w-full"
                    dataItemKey="id"
                    textField="title"
                    data={categoriesRes?.data}
                    loading={fetchingCategories}
                    filterable
                    required
                />
                <FsxFormikDropDownList
                    label="Group:"
                    name="humanResourceGroupId"
                    className="w-full"
                    dataItemKey="id"
                    textField="title"
                    data={personnelGroupsRes?.data}
                    loading={fetchingPersonnelGroups}
                    filterable
                    required
                />
                <FsxFormikDropDownList
                    label="Project Name: "
                    name="projectId"
                    className="w-full"
                    dataItemKey="id"
                    textField="title"
                    data={projectRes?.data}
                    loading={fetchingProjects}
                    filterable
                    required
                />
                <FsxFormikDropDownList
                    label="Position:"
                    name="humanResourcePositionId"
                    className="w-full"
                    dataItemKey="id"
                    textField="title"
                    data={personnelPositionsRes?.data}
                    loading={fetchingPersonnelPositions}
                    filterable
                    required
                />
                <FsxFormikDropDownList
                    label="Gender:"
                    name="gender"
                    className="w-full"
                    dataItemKey="name"
                    textField="name"
                    data={gender}
                    filterable
                    required
                />
                <FsxFormikDropDownList
                    label="Nationality:"
                    name="nationalityId"
                    className="w-full"
                    dataItemKey="id"
                    textField="title"
                    data={nationalityRes?.data}
                    loading={fetchingNationalities}
                    filterable
                    required 
                />
                <FsxFormikDropDownList
                    label="Site Location:"
                    name="projectSiteId"
                    className="w-full"
                    dataItemKey="id"
                    textField="title"
                    data={projectSiteRes}
                    loading={fetchingProjectSites}
                    filterable
                    required 
                />
                <FsxFormikInput 
                    label="Assigned Email:" 
                    name="assignedEmail" 
                    type="text"  
                    required
                />
                <FsxFormikInput
                    label="Contact No.:"
                    name="contactNo"
                    type="text" 
                    required
                />
                <FsxFormikDropDownList
                    label="Job Code:"
                    name="jobCodeId"
                    className="w-full"
                    dataItemKey="id"
                    textField="title"
                    data={jobCodeRes?.data}
                    loading={fetchingJobCode}
                    filterable
                    required
                />
                <FsxFormikDropDownList
                    label="Department:"
                    name="humanResourceDepartmentId"
                    className="w-full"
                    dataItemKey="id"
                    textField="title"
                    data={departmentRes?.data}
                    loading={fetchingDepartments}
                    filterable
                    required
                />
                <FsxFormikInput
                    label="Assigned Chat ID:"
                    name="chatId"
                    type="text" 
                    required
                />
                <FsxFormikInput 
                    label="Citizenship:" 
                    name="citizenship" 
                    type="text" 
                    required
                />
            </div>
        </div>
      </>
  );

};

export default PersonnelIformationForm;