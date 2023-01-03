import {
    FsxDropDownList
  } from '@app/components/common';
  import {FsxFormikDropDownList, FsxFormikInput} from '@app/components/common/FsxFormik';
  import React from 'react';
  import FsxFormikDatePicker from '@app/components/common/FsxFormik/FsxFormikDatePicker';   
  import Heading from '@app/views/common/Heading';
  import {useMaritalStatus} from '@app/services/hr/standardentries/maritalstatus.service';
  
  import { FSXDateFormat } from '@app/helpers/global/enum';
  
  
  const PersonnelInformation = () => {
     
    /* ------------------------------------------------------------------------- */
    /*                                 Components                                */
    /* ------------------------------------------------------------------------- */
  
    //* Marital Status
    const {data: maritalStatusRes, isLoading: fetchingMaritalStatus} = useMaritalStatus();

    return (
        <>
            <Heading title="Other Personnel Information" />
            <div className="m-2">
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                    <FsxFormikInput 
                        label="Alternate Contact No.:" 
                        name="altContactNo" 
                        type="text" 
                    />
                    <FsxFormikInput 
                        label="Father's Name:" 
                        name="fatherName" 
                        type="text" 
                    />
                    <FsxFormikDatePicker
                        label="Date of Birth:" 
                        name={`birthdate`}
                        format={FSXDateFormat.Default}
                    />
                    <FsxFormikInput 
                        label="Personal Email Address:" 
                        name="personalEmailAddress" 
                        type="text" 
                    />
                    <FsxFormikInput 
                        label="Mother's Name:" 
                        name="motherName" 
                        type="text" 
                    />
                    <FsxFormikInput 
                        label="Place of Birth:" 
                        name="birthPlace" 
                        type="text" 
                    />
                    <FsxFormikInput 
                        label="Native Language:" 
                        name="nativeLanguage" 
                        type="text" 
                    />
                    <FsxFormikDropDownList
                        label="Marital Status:"
                        name="maritalStatusId"
                        className="w-full"
                        dataItemKey="id"
                        textField="title"
                        data={maritalStatusRes?.data}
                        loading={fetchingMaritalStatus}
                    />
                    <FsxFormikInput 
                        label="Height:" 
                        name="height" 
                        type="text" 
                    />
                    <FsxFormikInput 
                        label="Weight:" 
                        name="weight" 
                        type="text" 
                    />
                    <FsxFormikInput 
                        label="Spouse Name:" 
                        name="spouseName" 
                        type="text" 
                    />
                    <FsxFormikInput 
                        label="Religion:" 
                        name="religion" 
                        type="text" 
                    />
                </div>
            </div>
        </>
    );
  
  };
  
  export default PersonnelInformation;