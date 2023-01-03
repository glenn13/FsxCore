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
import { readFile } from '@app/helpers/file';
import {StringKeyValuePair} from '@app/helpers/types';
import {ReactComponent as ImageUploadSvg} from '@app/assets/images/image-upload.svg';
import {attachmentToFile, downloadAttachment} from '@app/helpers/file';
// import CountryDropdown from '@app/views/hr/common/Dropdowns/Country';
import CountriesDropdown from '@app/views/catalog/common/Dropdowns/Countries';

import {Attachment} from '@app/entities/global/Attachment';
import {
    addPersonnelWorkVisa, 
    removePersonnelWorkVisa, 
    updatePersonnelWorkVisa 
} from '@app/store/hr/personnelWorkVisa.reducers';
import { newWorkVisa } from '@app/entities/hr/personnel.schema';

import { FSXDateFormat } from '@app/helpers/global/enum';
import PersonnelWorkVisa from '@app/entities/hr/PersonnelWorkVisa';

import  Country  from '@app/entities/catalog/Country';
import styled from 'styled-components';
import Heading from '@app/views/common/Heading';

export interface PersonnelWorkVisaProps {}
 
const columns: GridColumn[] = [
    {field: 'documentNo', title: 'Document Nos.'},
    {field: 'dateIssued', title: 'Date Issued'},
    {field: 'dateEntry', title: 'Date Entry'},
    {field: 'country.title', title: 'Country of Issuance'},
    {field: 'dateExpiry', title: 'Date of Expiry'},
    {field: 'dateRenewal', title: 'Date Renewal'},
    {field: 'imageType', title: 'File Type'},
    {field: 'fileName', title: 'File Name'},
    {field: 'fileSize', title: 'File Size', type: 'byteToKb'},
    {field: 'remarks', title: 'Remarks'},
    {field: 'isActive', title: 'Active'},
];

interface AttachmentFormState {
    varIFile?: File;
    varIFileAttachment?: File;
}

const inputFileRef = React.createRef<HTMLInputElement>();
const getFile = () => inputFileRef.current?.files?.item(0);

const WorkVisa: React.FC<PersonnelWorkVisaProps> = () => {
    
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<PersonnelWorkVisa>();
    const [country, setCountry] = React.useState<Country>();
    const [varIsActive, setIsActive] = React.useState(false);
    
    const [
        personnelWorkVisaDetail,
        setPersonnelWorkVisaDetail,
    ] = React.useState<PersonnelWorkVisa>(newWorkVisa());

    const personnelWorkVisaReducer = useSelector(
        (state: RootState) => state.personnelWorkVisaReducer
    );

    
    const tempIds = React.useMemo(
        () => personnelWorkVisaReducer.current?.map(x => x.tempId), 
        [personnelWorkVisaReducer]
    );
    
    const [
        {varIFile, varIFileAttachment}, setAttachmentForm,
    ] = React.useState<AttachmentFormState>({});
   
    const [uri, setUri] = React.useState<string | null>();


    const formikRef = React.useRef<FormikProps<PersonnelWorkVisa>>(null);

    const handleAdd = () => {
        setPersonnelWorkVisaDetail(newWorkVisa(tempIds));
        setCountry(undefined);
        setIsOpen(true);
    };

    const handleEdit = async () => {
        if (!selected) return;
        setCountry(selected.country);
        setPersonnelWorkVisaDetail(selected);
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
        setPersonnelWorkVisaDetail(newWorkVisa(tempIds));
        setIsOpen(false);
      };

    const handleDelete = () => {
        if (!selected) return;
        dispatch(removePersonnelWorkVisa(selected));
        setSelected(undefined);
    };

    const handleDrawerSubmit = () => {
        formikRef.current?.handleSubmit();
    };

    const getSelectedAttachmentDetails = (selected: PersonnelWorkVisa): Attachment => {
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

    const handleFormikSubmitWorkVisa = (value: PersonnelWorkVisa) => {

        const action =
          tempIds?.indexOf(value.tempId) === -1
            ? addPersonnelWorkVisa
            : updatePersonnelWorkVisa;
            // console.log(varIFileAttachment);
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
        setPersonnelWorkVisaDetail(newWorkVisa(tempIds));
      }, [personnelWorkVisaReducer, tempIds]);

      
    return(
        <>
            <Heading title="Personnel Work Visa" />
            <div className="p-2">
                <FsxDrawer
                    title="Personnel Work Visa"
                    isOpen={isOpen}
                    onClose={handleClose}
                    unMountChildren={true}
                    onSubmit={handleDrawerSubmit}
                >
                    <div className="flex flex-1 flex-col w-full py-4 px-8">
                        <Formik
                            enableReinitialize={true}
                            initialValues={personnelWorkVisaDetail}
                            validateOnChange={false}
                            onSubmit={handleFormikSubmitWorkVisa}
                            innerRef={formikRef}
                        >
                            <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-2">

                                <FsxFormikInput label="Document No.:" name="documentNo" type="text" />
                            
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
                                <FsxFormikTextArea 
                                    name="remarks" 
                                    label="Remarks :" 
                                    className="flex-grow" 
                                    rows={4} 
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
                    data={personnelWorkVisaReducer.current}
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

export default React.memo(WorkVisa);