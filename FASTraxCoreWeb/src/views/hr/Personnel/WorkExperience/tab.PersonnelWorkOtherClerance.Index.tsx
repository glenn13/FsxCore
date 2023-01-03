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

import CountriesDropdown from '@app/views/catalog/common/Dropdowns/Countries';
// import CountryDropdown from '@app/views/hr/common/Dropdowns/Country';

import {Attachment} from '@app/entities/global/Attachment';
import {
    addPersonnelWorkOtherClearance, 
    removePersonnelWorkOtherClearance, 
    setPersonnelWorkOtherClearance, 
    updatePersonnelWorkOtherClearance
} from '@app/store/hr/personnelWorkOtherClearance.reducers'
import { newPersonnelWorkOtherClearance } from '@app/entities/hr/personnel.schema';

import { FSXDateFormat } from '@app/helpers/global/enum';
import PersonnelWorkOtherClearance from '@app/entities/hr/PersonnelWorkOtherClearance';

import  Country  from '@app/entities/catalog/Country';
import styled from 'styled-components';
import Heading from '@app/views/common/Heading';

export interface WorkOtherClearanceProps {}
 
const columns: GridColumn[] = [
    {field: 'documentName', title: 'Document Name:'},
    {field: 'documentNo', title: 'Document No:'},
    {field: 'dateIssued', title: 'Date Issued'},
    {field: 'country.title', title: 'Country of Issuance'},
    {field: 'dateExpiry', title: 'Date of Expiry'},
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

const OtherClearance: React.FC<WorkOtherClearanceProps> = () => {
    
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<PersonnelWorkOtherClearance>();
    const [country, setCountry] = React.useState<Country>();
    const [varIsActive, setIsActive] = React.useState(false);
    
    const [
        personnelWorkOtherClearanceDetail,
        setPersonnelWorkOtherClearanceDetail,
    ] = React.useState<PersonnelWorkOtherClearance>(newPersonnelWorkOtherClearance());

    const personnelWorkOtherClearanceReducer = useSelector(
        (state: RootState) => state.personnelWorkOtherClearanceReducer,
    );

    const [
        {varIFile, varIFileAttachment}, setAttachmentForm,
    ] = React.useState<AttachmentFormState>({});

    const tempIds = React.useMemo(
        () => personnelWorkOtherClearanceReducer.current?.map(x => x.tempId), 
        [personnelWorkOtherClearanceReducer]
    );
   
    const [uri, setUri] = React.useState<string | null>();


    const formikRef = React.useRef<FormikProps<PersonnelWorkOtherClearance>>(null);

    const handleAdd = () => {
        setPersonnelWorkOtherClearanceDetail(newPersonnelWorkOtherClearance(tempIds));
        setCountry(undefined);
        setIsOpen(true);
    };

    const handleEdit = async () => {
        if (!selected) return;
        setCountry(selected.country);
        setPersonnelWorkOtherClearanceDetail(selected);
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
        setPersonnelWorkOtherClearanceDetail(newPersonnelWorkOtherClearance(tempIds));
        setIsOpen(false);
      };

    const handleDelete = () => {
        if (!selected) return;
        dispatch(removePersonnelWorkOtherClearance(selected));
        setSelected(undefined);
    };

    const handleDrawerSubmit = () => {
        formikRef.current?.handleSubmit();
    };






    const getSelectedAttachmentDetails = (selected: PersonnelWorkOtherClearance): Attachment => {
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

    const handleFormikSubmit = (value: PersonnelWorkOtherClearance) => {
        const action =
          tempIds?.indexOf(value.tempId) === -1
            ? addPersonnelWorkOtherClearance
            : updatePersonnelWorkOtherClearance;
            
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
         setPersonnelWorkOtherClearanceDetail(newPersonnelWorkOtherClearance(tempIds));
      }, [personnelWorkOtherClearanceReducer, tempIds]);


    return(
        <>
            <Heading title="Work Other Clearance" />
            <div className="p-2">
                <FsxDrawer
                    title="Work Other Clearance"
                    isOpen={isOpen}
                    onClose={handleClose}
                    unMountChildren={true}
                    onSubmit={handleDrawerSubmit}
                >
                    <div className="flex flex-1 flex-col w-full py-4 px-8">
                        <Formik
                            enableReinitialize={true}
                            initialValues={personnelWorkOtherClearanceDetail}
                            validateOnChange={false}
                            onSubmit={handleFormikSubmit}
                            innerRef={formikRef}
                        >
                            <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-2">
                                <FsxFormikInput label="Document Name:" name="documentName" type="text" />
                                <FsxFormikInput label="Document No.:" name="documentNo" type="text" />
                                <FsxFormikDatePicker
                                    label="Date Issued:" 
                                    name={`dateIssued`}
                                    format={FSXDateFormat.Default}
                                />
                                {/* <CountryDropdown isFormik onChange={(e) => handleCountryOnChange(e.value)}  /> */}
                                <CountriesDropdown label="Country: " name="countryId" onChange={(e) => handleCountryOnChange(e.value)} required filterable />
                                <FsxFormikDatePicker
                                    label="Date of Expiry:" 
                                    name={`dateExpiry`}
                                    format={FSXDateFormat.Default}
                                />
                            
                                <FsxFormikTextArea 
                                    name="remarks" 
                                    label="Remarks:" 
                                    className="flex-grow" 
                                    rows={4} 
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
                    data={personnelWorkOtherClearanceReducer.current}
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

export default React.memo(OtherClearance);