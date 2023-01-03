import React, {useRef} from 'react';
import {Formik, FormikProps} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import { Checkbox, FsxDrawer, FsxTable, FsxAttachmentField } from '@app/components/common';
import { GridColumn } from '@app/helpers/types';
import { RootState } from '@app/store/rootReducer';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import FsxFormikDatePicker from '@app/components/common/FsxFormik/FsxFormikDatePicker';
import {FsxFormikTextArea} from '@app/components/common/FsxFormik';
// import {readFile} from '../../../helpers/file';
import { readFile } from '@app/helpers/file';
import {StringKeyValuePair} from '@app/helpers/types';
import {ReactComponent as ImageUploadSvg} from '@app/assets/images/image-upload.svg';
import {attachmentToFile, downloadAttachment} from '@app/helpers/file';
// import CountryDropdown from '@app/views/hr/common/Dropdowns/Country';
import CountriesDropdown from '@app/views/catalog/common/Dropdowns/Countries';

import {Attachment} from '@app/entities/global/Attachment';
import {addPersonnelWorkPermit
    , removePersonnelWorkPermit
    , updatePersonnelWorkPermit } 
from '@app/store/hr/personnelWorkPermit.reducers';
import { newWorkPermit } from '@app/entities/hr/personnel.schema';

import { FSXDateFormat } from '@app/helpers/global/enum';
import PersonnelWorkPermit from '@app/entities/hr/PersonnelWorkPermit';

import  Country  from '@app/entities/catalog/Country';
import styled from 'styled-components';
import Heading from '@app/views/common/Heading';

export interface PersonnelWorkPermitProps {}
 
const columns: GridColumn[] = [
    {field: 'documentNo', title: 'Document Nos.'},
    {field: 'description', title: 'Description'},
    {field: 'dateEntry', title: 'Date Entry'},
    {field: 'country.title', title: 'Country of Issuance'},
    {field: 'dateExpiry', title: 'Date of Expiry'},
    {field: 'dateRenewal', title: 'Date Renewal'},
    {field: 'imageType', title: 'File Type'},
    {field: 'fileName', title: 'File Name'},
    {field: 'fileSize', title: 'File Size', type: 'byteToKb'},
    {field: 'isActive', title: 'Active'},
];

interface AttachmentFormState {
    varIFile?: File;
    varIFileAttachment?: File;
}

const inputFileRef = React.createRef<HTMLInputElement>();
const getFile = () => inputFileRef.current?.files?.item(0);

const WorkPermit: React.FC<PersonnelWorkPermitProps> = () => {
    
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<PersonnelWorkPermit>();
    const [country, setCountry] = React.useState<Country>();
    const [varIsActive, setIsActive] = React.useState(false);
    
    const [
        personnelWorkPermitDetail,
        setPersonnelWorkPermitDetail,
    ] = React.useState<PersonnelWorkPermit>(newWorkPermit());

    const personnelWorkPermitReducer = useSelector(
        (state: RootState) => state.personnelWorkPermitReducer,
    );

    const [
        {varIFile, varIFileAttachment}, setAttachmentForm,
    ] = React.useState<AttachmentFormState>({});

    const tempIds = React.useMemo(
        () => personnelWorkPermitReducer.current?.map(x => x.tempId), 
        [personnelWorkPermitReducer]
    );
   
    const [uri, setUri] = React.useState<string | null>();


    const formikRef = React.useRef<FormikProps<PersonnelWorkPermit>>(null);

    const handleAdd = () => {
        setPersonnelWorkPermitDetail(newWorkPermit(tempIds));
        setCountry(undefined);
        setIsOpen(true);
    };

    const handleEdit = async () => {
        if (!selected) return;
        setCountry(selected.country);
        setPersonnelWorkPermitDetail(selected);
        setIsActive(selected.isActive);
        setIsOpen(true);

        const _attachment = getSelectedAttachmentDetails(selected);

        const asyncAttachmentFile = await attachmentToFile(_attachment);
        setAttachmentForm({
            varIFile: asyncAttachmentFile, 
            varIFileAttachment:asyncAttachmentFile
        });
    };

    const handleClose = () => {
        setPersonnelWorkPermitDetail(newWorkPermit(tempIds));
        setIsOpen(false);
      };

    const handleDelete = () => {
        if (!selected) return;
        dispatch(removePersonnelWorkPermit(selected));
        setSelected(undefined);
    };

    const handleDrawerSubmit = () => {
        formikRef.current?.handleSubmit();
    };

    const getSelectedAttachmentDetails = (selected: PersonnelWorkPermit): Attachment => {
        const _attachment: Attachment = {
            id: selected.id,
            file: selected.image,
            filename: selected.fileName,
            fileSize: selected.fileSize,
            fileType: selected.imageType,
            remarks: '',
            createdDate: new Date(),
            createdById: 0,
        };
        return _attachment;
    };
 
    const varIFileAttachmentx = (varFile: File, varAttachmentFile: string, varRemarks?: string) => {
        if (!varFile) return setUri('');

        setAttachmentForm({
            varIFile: varFile,
        });

        readFile(varFile).then(base64 => {
            setUri(base64);
        });
    } 

    const handleFormikSubmit = (value: PersonnelWorkPermit) => {
        const action =
          tempIds?.indexOf(value.tempId) === -1
            ? addPersonnelWorkPermit
            : updatePersonnelWorkPermit;
            
        value.country = country;

        value.fileName =  (varIFile?.name) ? varIFile?.name : '';
        value.fileSize = (varIFile?.size) ? varIFile?.size : 0;
        value.imageType = (varIFile?.type) ? varIFile?.type : '';
        value.image = (uri) ? uri : '';
        value.isActive = varIsActive;
        dispatch(action(value));
        setIsOpen(false);
    };
    

    const handleCountryOnChange = (value: Country) => {
        setCountry(value);
    } 

    React.useEffect(() => {
        setPersonnelWorkPermitDetail(newWorkPermit(tempIds));
      }, [personnelWorkPermitReducer, tempIds]);


    return(
        <>
            <Heading title="Personnel Work Permit" />
            <div className="p-2">
                <FsxDrawer
                    title="Personnel Work Permit"
                    isOpen={isOpen}
                    onClose={handleClose}
                    unMountChildren={true}
                    onSubmit={handleDrawerSubmit}
                >
                    <div className="flex flex-1 flex-col w-full py-4 px-8">
                        <Formik
                            enableReinitialize={true}
                            initialValues={personnelWorkPermitDetail}
                            validateOnChange={false}
                            onSubmit={handleFormikSubmit}
                            innerRef={formikRef}
                        >
                            <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-2">

                                <FsxFormikInput label="Document No.:" name="documentNo" type="text" />
                            
                                <FsxFormikTextArea 
                                    name="description" 
                                    label="Description :" 
                                    className="flex-grow" 
                                    rows={4} 
                                />
                                <FsxFormikDatePicker
                                    label="Date Entry:" 
                                    name={`dateEntry`}
                                    format={FSXDateFormat.Default}
                                />
                                {/* <CountryDropdown isFormik onChange={(e) => handleCountryOnChange(e.value)}  /> */}
                                <CountriesDropdown label="Country: " name="countryId" onChange={(e) => handleCountryOnChange(e.value)} required filterable />
                                <FsxFormikDatePicker
                                    label="Date of Expiry:" 
                                    name={`dateExpiry`}
                                    format={FSXDateFormat.Default}
                                />
                                <FsxFormikDatePicker
                                    label="Date of Renewal:" 
                                    name={`dateRenewal`}
                                    format={FSXDateFormat.Default}
                                />
                                
                                <FsxAttachmentField
                                    fileAttachment={varIFile}
                                    type="images" 
                                    readFileAttachment={varIFileAttachmentx}
                                />
                                <Checkbox
                                    checked={varIsActive}
                                    text="Set as Active"
                                    onChange={() => setIsActive(!varIsActive)}
                                />
                            </div>
                        </Formik>
                    </div>
                </FsxDrawer>

                <FsxTable
                    data={personnelWorkPermitReducer.current}
                    columns={columns}
                    onRowClick={e => setSelected(e.dataItem)}
                    onRowDoubleClick={handleEdit}
                >
                    <FsxTableActions
                        onAdd={handleAdd}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </FsxTable>
            </div>  
        </>   
    );
};

export default React.memo(WorkPermit);