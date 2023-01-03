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
    Loader
} from '@app/components/common';

import {FsxFormikTextArea} from '@app/components/common/FsxFormik';
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
import {useFormikContext} from 'formik';
import Personnel from '@app/entities/hr/Personnel';
import Heading from '@app/views/common/Heading';
import ImageAttachment from './tab.CustomFieldAttachment.Image';
import DocumentAttachment from './tab.CustomFieldAttachment.Document';
// import WorkInformationForm from './workInformationForm';
// import OtherClearance from './tab.PersonnelWorkOtherClerance.Index';
// import WorkHistory from './workHistory';
// import WorkVisaList from './workVisaList';
// import PersonnelWorkPermit from './tab.WorkPermit.Index';
// import PersonnelWorkVisa from './tab.PersonnelWorkVisa.Index';

const CustomFieldAttachment = () => {

    //* Selected Personnel
    // const [personnel, setPersonnel] = useState<Personnel>(props.initialValues);
    const [personnel, setPersonnel] = useState<Personnel>();

    const handleSubmit = () => {}

    return (  
        <>  
            <div className="p-4 bg-white rounded shadow-lg col-span-full lg:col-span-2">
                <ImageAttachment />
                
                <div className="w-full mb-8" />
                <DocumentAttachment />
                <div className="w-full mb-8" /> 

            </div>
        </>
    );




};

export default CustomFieldAttachment;
