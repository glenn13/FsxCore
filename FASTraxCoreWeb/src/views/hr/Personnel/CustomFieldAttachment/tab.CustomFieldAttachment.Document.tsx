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

import {
    addPersonnelDocumentAttachment, 
    removePersonnelDocumentAttachment, 
    updatePersonnelDocumentAttachment
} from '@app/store/hr/personnelCustomFieldAttachment.Document.reducers';

import {newPersonnelDocumentAttachment} from '@app/entities/hr/personnel.schema';
import PersonnelDocumentAttachment from '@app/entities/hr/PersonnelDocumentAttachment';

export interface DocumentsProps {}

const columns: GridColumn[] = [
    {field: 'fileName', title: 'Filename'},
    {field: 'fileSize', title: 'File Size', type: 'byteToKb'},
    {field: 'remarks', title: 'Remarks'},
    {field: 'action', title: 'Orientation'},
    {field: 'dateUploaded', title: 'Date Uploaded'},
];

interface AttachmentFormState {
    varIRemarks?: string;
    varIIsOpen: boolean;
    varIFile?: File;
}

const DocumentAttachment: React.FC<DocumentsProps> = () => {
    const dispatch = useDispatch();
    const [selectedTempId, setSelectedTempId] = React.useState(0);
    const [selectedId, setSelectedId] = React.useState(0);
    const [selected, setSelected] = React.useState<PersonnelDocumentAttachment>();
    const [varAction, setAction] = React.useState('');

    const [
        varPersonnelDocumentAttachment,
        varSetPersonnelDocumentAttachment,
    ] = React.useState<PersonnelDocumentAttachment>(newPersonnelDocumentAttachment());

    const personnelDocumentAttachmentReducer = useSelector(
        (state: RootState) => state.personnelDocumentAttachmentReducer,
    );
    const [
        {varIIsOpen, varIFile, varIRemarks},
        setAttachmentForm,
    ] = React.useState<AttachmentFormState>({
        varIIsOpen: false,
    });

    const tempIds = React.useMemo(
        () => personnelDocumentAttachmentReducer.current?.map(x => x.tempId),
        [personnelDocumentAttachmentReducer],
    );

    const {personnelId, dateUploaded} = varPersonnelDocumentAttachment;

    const excelExportRef = useRef<any>(null);
    const exportToExcel = () => excelExportRef.current?.exportAsExcel();

    const handleAdd = () => {
        varSetPersonnelDocumentAttachment(newPersonnelDocumentAttachment(tempIds));
        setSelectedTempId(varPersonnelDocumentAttachment.tempId);
        setAttachmentForm({varIIsOpen: true});
        setAction('');
    };

    const handleClose = () => {
        varSetPersonnelDocumentAttachment(newPersonnelDocumentAttachment(tempIds));
        setAttachmentForm({varIIsOpen: false});
    };

    const handleEdit = async () => {
        if (!selected) return;

        setSelectedTempId(selected.tempId);
        setSelectedId(selected.id);
        setAction(selected.action);

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
        dispatch(removePersonnelDocumentAttachment(selected));
        setSelected(undefined);
    };

    const handleExport = () => {
        if (!selected) return;

        const _attachment = getSelectedAttachmentDetails(selected);

        downloadAttachment(_attachment);
    };

    const handleSubmit = (varFile: File, varAttachmentFile: string, varRemarks?: string) => {

        const personnelDocumentAttachment: PersonnelDocumentAttachment = {
            tempId: selectedTempId,
            id: selectedId,
            personnelId: personnelId,
            image: varAttachmentFile,
            fileName: varFile.name,
            fileSize: varFile.size,
            imageType: varFile.type,
            remarks: varRemarks || '',
            dateUploaded: dateUploaded,
            action: varAction,
        };

        const action =tempIds?.indexOf(selectedTempId) === -1
                ? addPersonnelDocumentAttachment
                : updatePersonnelDocumentAttachment;
        dispatch(action(personnelDocumentAttachment));
        setAttachmentForm({varIIsOpen: false});
        setAction('');
    };

    const getSelectedAttachmentDetails = (selected: PersonnelDocumentAttachment): Attachment => {
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
        varSetPersonnelDocumentAttachment(newPersonnelDocumentAttachment(tempIds));
    }, [personnelDocumentAttachmentReducer, tempIds]);

    return (
            <>
                <Heading title="Document Attachment" />
                <div className="flex flex-1 flex-col p-2 mb-5">
                    <FsxDrawer
                        isOpen={varIIsOpen}
                        unMountChildren={true}
                        title="Document Attachment"
                        onClose={handleClose}
                    >
                        <FsxAttachmentForm
                            onSubmit={handleSubmit}
                            fileAttachment={varIFile}
                            remarks={varIRemarks}
                            type="documents"
                        >
                            <FsxFormikInput 
                                label="Action:" 
                                name="action" 
                                type="text" 
                                onBlur={(e) => setAction(e.currentTarget.value)}
                            />
                        </FsxAttachmentForm>
                    </FsxDrawer>

                    <FsxExcelExport
                        fileName={`Personnel_DocumentAttachment_${moment().format('YYYYMMDDHHmm')}`}
                        data={personnelDocumentAttachmentReducer.current}
                        ref={excelExportRef}
                        columns={columns}
                    >
                        <FsxTable
                        data={personnelDocumentAttachmentReducer.current}
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

export default React.memo(DocumentAttachment);
