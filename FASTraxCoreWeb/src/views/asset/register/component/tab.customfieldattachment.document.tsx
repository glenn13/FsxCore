import React from 'react';
import { RootState } from '@app/store/rootReducer';
import { GridColumn } from '@app/helpers/types';
import { attachmentToFile, downloadAttachment } from '@app/helpers/file';
import { FsxAttachmentForm, FsxDrawer, FsxTable } from '@app/components/common';
import { useDispatch, useSelector } from 'react-redux';
import FsxTableActions from '@app/components/common/FsxTable/Actions';

import { Attachment } from '@app/entities/global/Attachment';
import {
    addComponentDocumentAttachment
    , removeComponentDocumentAttachment
    , updateComponentDocumentAttachment
} from '@app/store/asset/register/componentDocumentAttachment.reducers';
import { newComponentDocumentAttachment } from '@app/entities/asset/register/component/component.schema';

export interface DocumentsProps {
    isReadOnly: boolean;
}

const columns: GridColumn[] = [
    { field: 'fileName', title: 'File Name' },
    { field: 'fileSize', title: 'File Size' },
    { field: 'fileType', title: 'File Type' },
    { field: 'remarks', title: 'Remarks' },
    { field: 'action', title: 'Action' },
    { field: 'dateUploaded', title: 'Date Uploaded', type: 'date' }
];

interface AttachmentFormState {
    varIRemarks?: string;
    varIIsOpen: boolean;
    varIFile?: File;
}

const Documents: React.FC<DocumentsProps> = ({isReadOnly}) => {
    const dispatch = useDispatch();
    const [selectedTempId, setSelectedTempId] = React.useState(0);
    const [selectedId, setSelectedId] = React.useState(0);
    const [selected, setSelected] = React.useState<ComponentDocumentAttachment>();

    const [varComponentDocumentAttachment, varSetComponentDocumentAttachment] = React.useState<ComponentDocumentAttachment>(newComponentDocumentAttachment());
    const componentDocumentAttachmentReducer = useSelector((state: RootState) => state.componentDocumentAttachmentReducer);
    const [{ varIIsOpen, varIFile, varIRemarks }, setAttachmentForm] = React.useState<AttachmentFormState>({
        varIIsOpen: false,
    });

    const tempIds = React.useMemo(() => componentDocumentAttachmentReducer.current?.map(x => x.tempId), [componentDocumentAttachmentReducer]);

    const { componentId, dateUploaded } = varComponentDocumentAttachment;

    const handleAdd = () => {
        varSetComponentDocumentAttachment(newComponentDocumentAttachment(tempIds));
        setSelectedTempId(varComponentDocumentAttachment.tempId);
        setAttachmentForm({ varIIsOpen: true });
    };

    const handleClose = () => {
        varSetComponentDocumentAttachment(newComponentDocumentAttachment(tempIds));
        setAttachmentForm({ varIIsOpen: false });
    };

    const handleEdit = async () => {
        if (!selected) return;

        setSelectedTempId(selected.tempId);
        setSelectedId(selected.id);

        const _attachment = getSelectedAttachmentDetails(selected);

        const asyncAttachmentFile = await attachmentToFile(_attachment);

        setAttachmentForm({ varIIsOpen: true, varIFile: asyncAttachmentFile, varIRemarks: _attachment.remarks });
    };

    const handleDelete = () => {
        if (!selected) return;
        dispatch(removeComponentDocumentAttachment(selected));
        setSelected(undefined);
    };

    const handleExport = () => {
        if (!selected) return;

        const _attachment = getSelectedAttachmentDetails(selected);

        downloadAttachment(_attachment);
    };

    const handleSubmit = (varFile: File, varAttachmentFile: string, varRemarks?: string) => {

        const componentDocumentAttachment: ComponentDocumentAttachment = {
            tempId: selectedTempId,
            id: selectedId,
            componentId: componentId,
            file: varAttachmentFile,
            fileName: varFile.name,
            fileSize: varFile.size,
            fileType: varFile.type,
            remarks: varRemarks || '',
            action: '',
            dateUploaded: dateUploaded
        };

        const action = tempIds?.indexOf(selectedTempId) === -1 ? addComponentDocumentAttachment : updateComponentDocumentAttachment;

        dispatch(action(componentDocumentAttachment));
        setAttachmentForm({ varIIsOpen: false });
    };

    const getSelectedAttachmentDetails = (selected: ComponentDocumentAttachment): Attachment => {
        const _attachment: Attachment = {
            id: selected.id,
            file: selected.file,
            filename: selected.fileName,
            fileSize: selected.fileSize,
            fileType: selected.fileType,
            remarks: selected.remarks || '',
            createdDate: selected.dateUploaded,
            createdById: 0
        };
        return _attachment;
    }

    React.useEffect(() => {
        varSetComponentDocumentAttachment(newComponentDocumentAttachment(tempIds));
    }, [componentDocumentAttachmentReducer, tempIds]);

    return (
        <div className="flex flex-1 flex-col p-2 mb-5">
            <FsxDrawer
                isOpen={varIIsOpen}
                unMountChildren={true}
                title="Document Attachment"
                onClose={handleClose}>
                <FsxAttachmentForm
                    onSubmit={handleSubmit}
                    fileAttachment={varIFile}
                    remarks={varIRemarks}
                    type="documents"
                    isReadOnly={isReadOnly}>
                </FsxAttachmentForm>
            </FsxDrawer>

            <FsxTable data={componentDocumentAttachmentReducer.current}
                columns={columns}
                onRowClick={e => setSelected(e.dataItem)}
                onRowDoubleClick={handleEdit}>
                <FsxTableActions
                    onAdd={handleAdd}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onExport={handleExport}
                    isReadOnly={isReadOnly} />
            </FsxTable>
        </div>
    );
};

export default React.memo(Documents);