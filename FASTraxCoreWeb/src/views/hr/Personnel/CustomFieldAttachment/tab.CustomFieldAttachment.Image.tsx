import React, {useRef} from 'react';
import {Attachment} from '@app/entities/global/Attachment';
import {GridColumn} from '@app/helpers/types';
import {RootState} from '@app/store/rootReducer';
import {attachmentToFile, downloadAttachment} from '@app/helpers/file';
import {Checkbox, FsxAttachmentForm, FsxDrawer, FsxTable} from '@app/components/common';
import {useDispatch, useSelector} from 'react-redux';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';
import Heading from '@app/views/common/Heading';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';

// import {
//     addGeneralAssetImageAttachment,
//     removeGeneralAssetImageAttachment,
//     updateGeneralAssetImageAttachment,
// } from '@app/store/asset/register/generalassetimageattachment.reducers';
// import {newGeneralAssetImageAttachment} from '@app/entities/asset/register/generalasset/generalasset.schema';
import {
    addPersonnelImageAttachment, 
    removePersonnelImageAttachment, 
    updatePersonnelImageAttachment
} from '@app/store/hr/personnelCustomFieldAttachment.Image.reducers';

import {newPersonnelImageAttachment} from '@app/entities/hr/personnel.schema';
import PersonnelImageAttachment from '@app/entities/hr/PersonnelImageAttachment';

export interface ImagesProps {}

const columns: GridColumn[] = [
    // {field: 'image', title: 'Image.'},
    {field: 'fileName', title: 'Filename'},
    {field: 'fileSize', title: 'File Size', type: 'byteToKb'},
    {field: 'remarks', title: 'Remarks'},
    {field: 'orientation', title: 'Orientation'},
    {field: 'dateUploaded', title: 'Date Uploaded'},
    {field: 'isPrintable', title: 'Printable'},
    {field: 'isDefault', title: 'Default'}
];
// const columns: GridColumn[] = [
//   {field: 'imageType', title: 'File Type'},
//   {field: 'fileName', title: 'File Name'},
//   {field: 'fileSize', title: 'File Size', type: 'byteToKb'},
//   {field: 'remarks', title: 'Remarks'},
// ];

interface AttachmentFormState {
    varIRemarks?: string;
    varIIsOpen: boolean;
    varIFile?: File;
}

const ImageAttachment: React.FC<ImagesProps> = () => {
    const dispatch = useDispatch();
    const [selectedTempId, setSelectedTempId] = React.useState(0);
    const [selectedId, setSelectedId] = React.useState(0);
    const [varIsDefault, setIsDefault] = React.useState(false);
    const [varIsPrintable, setIsPrintable] = React.useState(false);
    const [selected, setSelected] = React.useState<PersonnelImageAttachment>();
    const [varOrientation, setOrientation] = React.useState('');

    const [
        varPersonnelImageAttachment,
        varSetPersonnelImageAttachment,
    ] = React.useState<PersonnelImageAttachment>(newPersonnelImageAttachment());

    const personnelImageAttachmentReducer = useSelector(
        (state: RootState) => state.personnelImageAttachmentReducer,
    );
    const [
        {varIIsOpen, varIFile, varIRemarks},
        setAttachmentForm,
    ] = React.useState<AttachmentFormState>({
        varIIsOpen: false,
    });

    const tempIds = React.useMemo(
        () => personnelImageAttachmentReducer.current?.map(x => x.tempId),
        [personnelImageAttachmentReducer],
    );

    const {personnelId, dateUploaded} = varPersonnelImageAttachment;

    const excelExportRef = useRef<any>(null);
    const exportToExcel = () => excelExportRef.current?.exportAsExcel();

    const handleAdd = () => {
        varSetPersonnelImageAttachment(newPersonnelImageAttachment(tempIds));
        setSelectedTempId(varPersonnelImageAttachment.tempId);
        setAttachmentForm({varIIsOpen: true});
        // varSetGeneralAssetImageAttachment(newGeneralAssetImageAttachment(tempIds));
        // setSelectedTempId(varGeneralAssetImageAttachment.tempId);
    };

    const handleClose = () => {
        varSetPersonnelImageAttachment(newPersonnelImageAttachment(tempIds));
        // varSetGeneralAssetImageAttachment(newGeneralAssetImageAttachment(tempIds));
        setIsDefault(false);
        setIsPrintable(false);
        setOrientation('');
        setAttachmentForm({varIIsOpen: false});
    };

    const handleEdit = async () => {
        if (!selected) return;

        setSelectedTempId(selected.tempId);
        setSelectedId(selected.id);
        setIsDefault(selected.isDefault);
        setIsPrintable(selected.isPrintable);
        setOrientation(selected.orientation);
        

        const _attachment = getSelectedAttachmentDetails(selected);

        const asyncAttachmentFile = await attachmentToFile(_attachment);

        setAttachmentForm({
            varIIsOpen: true,
            varIFile: asyncAttachmentFile,
            varIRemarks: _attachment.remarks,
        });
    };

    const handleDelete = () => {
        if (!selected) return;
        dispatch(removePersonnelImageAttachment(selected));
        setSelected(undefined);
    };

    const handleExport = () => {
        if (!selected) return;

        const _attachment = getSelectedAttachmentDetails(selected);

        downloadAttachment(_attachment);
    };

    const handleSubmit = (varFile: File, varAttachmentFile: string, varRemarks?: string) => {
        const _currentIsDefault = varIsDefault; //Use this approach due to error occur when varIsDefault is assign directly to isDefault of class image attachment

        const personnelImageAttachment: PersonnelImageAttachment = {
            tempId: selectedTempId,
            id: selectedId,
            personnelId: personnelId,
            image: varAttachmentFile,
            fileName: varFile.name,
            fileSize: varFile.size,
            imageType: varFile.type,
            remarks: varRemarks || '',
            dateUploaded: dateUploaded,
            isPrintable: varIsPrintable,
            orientation: varOrientation,
            isDefault: _currentIsDefault,
        };

        const action =tempIds?.indexOf(selectedTempId) === -1
                ? addPersonnelImageAttachment
                : updatePersonnelImageAttachment;
        dispatch(action(personnelImageAttachment));
        setAttachmentForm({varIIsOpen: false});
        setIsDefault(false);
        setIsPrintable(false);
        setOrientation('');
    };

    const getSelectedAttachmentDetails = (selected: PersonnelImageAttachment): Attachment => {
        const _attachment: Attachment = {
            id: selected.id,
            file: selected.image,
            filename: selected.fileName,
            fileSize: selected.fileSize,
            fileType: selected.imageType,
            remarks: selected.remarks || '',
            createdDate: selected.dateUploaded,
            createdById: 0,
        };
        return _attachment;
    };

    React.useEffect(() => {
        varSetPersonnelImageAttachment(newPersonnelImageAttachment(tempIds));
        // varSetGeneralAssetImageAttachment(newGeneralAssetImageAttachment(tempIds));
    }, [personnelImageAttachmentReducer, tempIds]);

    return (
            <>
                <Heading title="Image Attachment" />
                <div className="flex flex-1 flex-col p-2 mb-5">
                    <FsxDrawer
                        isOpen={varIIsOpen}
                        unMountChildren={true}
                        title="Image Attachment"
                        onClose={handleClose}
                    >
                        <FsxAttachmentForm
                            onSubmit={handleSubmit}
                            fileAttachment={varIFile}
                            remarks={varIRemarks}
                            type="images"
                        >
                            <Checkbox
                                checked={varIsDefault}
                                text="Set as Default"
                                onChange={() => setIsDefault(!varIsDefault)}
                            />
                            <FsxFormikInput 
                                label="Orientation:" 
                                name="orientation" 
                                type="text" 
                                onBlur={(e) => setOrientation(e.currentTarget.value)}
                            />
                            <Checkbox
                                checked={varIsPrintable}
                                text="Set as Printable"
                                onChange={() => setIsPrintable(!varIsPrintable)}
                            />
                        </FsxAttachmentForm>
                    </FsxDrawer>

                    <FsxExcelExport
                        fileName={`Personnel_ImageAttachment_${moment().format('YYYYMMDDHHmm')}`}
                        data={personnelImageAttachmentReducer.current}
                        ref={excelExportRef}
                        columns={columns}
                    >
                        <FsxTable
                        data={personnelImageAttachmentReducer.current}
                        columns={columns}
                        onRowClick={e => setSelected(e.dataItem)}
                        onRowDoubleClick={handleEdit
                        }>
                            <FsxTableActions
                                onAdd={handleAdd}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onExport={exportToExcel}
                            />
                        </FsxTable>
                    </FsxExcelExport>
                </div>
            </>
    );
};

export default React.memo(ImageAttachment);

