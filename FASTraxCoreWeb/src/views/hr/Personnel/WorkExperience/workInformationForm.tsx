import {GridColumn as Column, Grid, GridCellProps} from '@progress/kendo-react-grid';
import {Form, Formik, FormikConfig} from 'formik';
import {
    FsxButton,
    FsxCheckbox,
    FsxDrawer,
    FsxDropDownList,
    FsxNumericTextBox,
    FsxTextArea,
    FsxTimePicker, 
    FsxTable,
    Loader, 
    Checkbox
} from '@app/components/common';

import {FsxFormikTextArea, FsxFormikCheckbox} from '@app/components/common/FsxFormik';
import {FsxFormikDropDownList, FsxFormikRadialNewItemMenu, FsxFormikInput} from '@app/components/common/FsxFormik';
import FsxFormikDatePicker from '@app/components/common/FsxFormik/FsxFormikDatePicker';
import {FSXDateFormat} from '@app/helpers/global/enum';
import {
    GridRowClickEvent,
    GridRowDoubleClickEvent,
} from '@progress/kendo-react-grid/dist/npm/interfaces/events';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import {GridColumn} from '@app/helpers/types';
import React, {useState, Suspense} from 'react';
import {filter, find} from 'lodash';

import {ActionWrapperStyled} from '@app/components/common/FsxTable/Actions';
import FsxDatePicker from '@app/components/common/FsxDatePicker';
import FsxInput from '@app/components/common/FsxInput';
import FsxTableAction from '@app/components/common/FsxTable/Action';
import {UUID} from '@app/utils/uuid.util';
import moment from 'moment';
import produce from 'immer';
import {usePersonnels} from '@app/services/hr/personnel.services';
import {useStatus} from '@app/services/hr/standardentries/status.service';
import {useHumanResourceContractType} from '@app/services/hr/standardentries/humanResourceContractType.service';
import {useFormikContext} from 'formik';
import Personnel from '@app/entities/hr/Personnel';
import Heading from '@app/views/common/Heading';
import {Carousel} from '@app/components/common';
import {FileAttachment} from '@app/helpers/files';

const WorkInformationForm = () => {

    const [carouselImages, setCarouselImages] = React.useState<FileAttachment[]>();

    //* Status
    const {data: statusRes, isLoading: fetchingStatus} = useStatus();

    //* Personnel
    const {data: personnelRes, isLoading: fetchingPersonnel} = usePersonnels();
    
    //* Contract Type
    const {data: contractTypeRes, isLoading: fetchingContractType } = useHumanResourceContractType();

    const [varIsBlacklisted, setIsBlacklisted] = React.useState(false);

    const formikPersonnel = useFormikContext<Personnel>();
    
    React.useEffect(() => {
        formikPersonnel.values.personnelWorkInformation?.map(x => 
            ({
               ...x, 
               isBlacklisted: varIsBlacklisted 
            }))
    }, [varIsBlacklisted]);


    return (
        <>
            <Heading title="Work Experience" />
            <div className="m-2">
                <div className="grid flex-2 grid-cols-5 gap-4">

                    <div className="col-span-full lg:col-span-4">
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                            <FsxFormikDropDownList
                                label="Status:"
                                name={`personnelWorkInformation[0].humanResourceStatusId`}
                                className="w-full"
                                dataItemKey="id"
                                textField="title"
                                data={statusRes?.data}
                                loading={fetchingStatus}
                                filterable
                                required
                            />
                            <FsxFormikDropDownList
                                label="Contract Type:"
                                name={`personnelWorkInformation[0].humanResourceContractTypeId`}
                                className="w-full"
                                dataItemKey="id"
                                textField="title"
                                data={contractTypeRes?.data}
                                loading={fetchingContractType}
                                filterable
                                required
                            />
                            <FsxFormikDatePicker
                                label="Contract Start Date:"
                                name={`personnelWorkInformation[0].contractStartDate`}
                                format={FSXDateFormat.Default}
                            />
                            <FsxFormikDropDownList
                                label="Reporting To:"
                                name={`personnelWorkInformation[0].reportingToPersonnelId`}
                                className="w-full"
                                dataItemKey="id"
                                textField="fullName"
                                data={personnelRes?.data}
                                loading={fetchingPersonnel}
                                filterable
                                required
                            />
                            <FsxFormikDatePicker
                                label="Last Working Date:"
                                name={`personnelWorkInformation[0].lastWorkingDate`}
                                format={FSXDateFormat.Default}
                            />
                            <FsxFormikDatePicker
                                label="Employment Start Date:"
                                name={`personnelWorkInformation[0].employmentStartDate`}
                                format={FSXDateFormat.Default}
                            />
                        </div>
                        <div className="m-2">
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                                <div className="col-span-2">
                                    <FsxFormikTextArea
                                        name={`personnelWorkInformation[0].jobStatusNotes`}
                                        label="Job Status Notes :"
                                        className="flex-grow" 
                                        rows={4}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
                                        <FsxFormikDatePicker
                                            label="Contract End Date:"
                                            name={`personnelWorkInformation[0].contractEndDate`}
                                            format={FSXDateFormat.Default}
                                        />
                                        <FsxFormikInput 
                                            label="Current Basic Pay:" 
                                            name={`personnelWorkInformation[0].basicPay`} 
                                            type="text" 
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="m-2">
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                                <div className="col-span-2">
                                                            
                                    <FsxFormikCheckbox
                                        name={`personnelWorkInformation[0].isBlacklisted`}
                                        label="Is Required?"
                                        onChange={() => setIsBlacklisted(!varIsBlacklisted)}
                                    />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-span-full lg:col-span-1">
                        <div className="m-2">
                            <div className="col-auto">
                                <Carousel images={carouselImages || []} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WorkInformationForm;
