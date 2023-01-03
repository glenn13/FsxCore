import React from 'react';
import { Attachment } from '@app/entities/global/Attachment';
import { GridColumn } from '@app/helpers/types';
import { RootState } from '@app/store/rootReducer';
import { attachmentToFile, downloadAttachment } from '@app/helpers/file';
import { Checkbox, FsxAttachmentForm, FsxDrawer, FsxTable } from '@app/components/common';
import { useDispatch, useSelector } from 'react-redux';
import FsxTableActions from '@app/components/common/FsxTable/Actions';

import { addComponentImageAttachment
    , removeComponentImageAttachment
    , updateComponentImageAttachment
} from '@app/store/asset/register/componentImageAttachment.reducers';
import { newComponentImageAttachment } from '@app/entities/asset/register/component/component.schema';

export interface ImagesProps {
    isReadOnly: boolean;
 }

const columns: GridColumn[] = [
    { field: 'imageType', title: 'File Type' },
    { field: 'fileName', title: 'File Name' },
    { field: 'fileSize', title: 'File Size' },
    { field: 'remarks', title: 'Remarks' },
];

interface AttachmentFormState {
    varIRemarks?: string;
    varIIsOpen: boolean;
    varIFile?: File;
}

const ImageAttachment: React.FC<ImagesProps> = ({isReadOnly}) => {
    const dispatch = useDispatch();
    const [selectedTempId, setSelectedTempId] = React.useState(0);
    const [selectedId, setSelectedId] = React.useState(0);
    const [varIsDefault, setIsDefault] = React.useState(false);
    const [selected, setSelected] = React.useState<ComponentImageAttachment>();

    const [varComponentImageAttachment, varSetComponentImageAttachment] = React.useState<ComponentImageAttachment>(newComponentImageAttachment());
    const componentImageAttachmentReducer = useSelector((state: RootState) => state.componentImageAttachmentReducer);
    const [{ varIIsOpen, varIFile, varIRemarks }, setAttachmentForm] = React.useState<AttachmentFormState>({
        varIIsOpen: false,
    });

    const tempIds = React.useMemo(() => componentImageAttachmentReducer.current?.map(x => x.tempId), [componentImageAttachmentReducer]);

    const { componentId, dateUploaded } = varComponentImageAttachment;

    const handleAdd = () => {
        varSetComponentImageAttachment(newComponentImageAttachment(tempIds));
        setSelectedTempId(varComponentImageAttachment.tempId);
        setAttachmentForm({ varIIsOpen: true });
    };

    const handleClose = () => {
        varSetComponentImageAttachment(newComponentImageAttachment(tempIds));
        setIsDefault(false);
        setAttachmentForm({ varIIsOpen: false });
    };

    const handleEdit = async () => {
        if (!selected) return;
      
        setSelectedTempId(selected.tempId);
        setSelectedId(selected.id);
        setIsDefault(selected.isDefault);

        const _attachment = getSelectedAttachmentDetails(selected);

        const asyncAttachmentFile = await attachmentToFile(_attachment);

        setAttachmentForm({ varIIsOpen: true, varIFile: asyncAttachmentFile, varIRemarks: _attachment.remarks });
    };

    const handleDelete = () => {
        if (!selected) return;
        dispatch(removeComponentImageAttachment(selected));
        setSelected(undefined);
    };

    

    const handleExport = () => {
        if (!selected) return;

        const _attachment = getSelectedAttachmentDetails(selected);

        downloadAttachment(_attachment);
    };

    const handleSubmit = (varFile: File, varAttachmentFile: string, varRemarks?: string) => {
        const _currentIsDefault = varIsDefault; //Use this approach due to error occur when varIsDefault is assign directly to isDefault of class image attachment
    
        const componentImageAttachment: ComponentImageAttachment = {
            tempId: selectedTempId,
            id: selectedId,
            componentId: componentId,
            image: varAttachmentFile,
            fileName: varFile.name,
            fileSize: varFile.size,
            imageType: varFile.type,
            remarks: varRemarks || '',
            dateUploaded: dateUploaded,
            isPrintable: false,
            orientation: '',
            isDefault: _currentIsDefault
        };

        const action = tempIds?.indexOf(selectedTempId) === -1 ? addComponentImageAttachment : updateComponentImageAttachment;
        dispatch(action(componentImageAttachment));
        setAttachmentForm({ varIIsOpen: false });
        setIsDefault(false);
    };

    const getSelectedAttachmentDetails = (selected: ComponentImageAttachment): Attachment => {
        const _attachment: Attachment = {
            id: selected.id,
            file: selected.image,
            filename: selected.fileName,
            fileSize: selected.fileSize,
            fileType: selected.imageType,
            remarks: selected.remarks || '',
            createdDate: selected.dateUploaded,
            createdById: 0
        };
        return _attachment;
    }

    React.useEffect(() => {
        varSetComponentImageAttachment(newComponentImageAttachment(tempIds));
    }, [componentImageAttachmentReducer, tempIds]);

    return (
        <div className="flex flex-1 flex-col p-2 mb-5">
            <FsxDrawer
                isOpen={varIIsOpen}
                unMountChildren={true}
                title="Image Attachment"
                onClose={handleClose}>
                <FsxAttachmentForm
                    onSubmit={handleSubmit}
                    fileAttachment={varIFile}
                    remarks={varIRemarks}
                    type="images"
                    isReadOnly={isReadOnly}>
                    <Checkbox
                        checked={varIsDefault}
                        text="Set as Default"
                        onChange={() => setIsDefault(!varIsDefault) }
                        disabled={isReadOnly}
                    />
                </FsxAttachmentForm>
            </FsxDrawer>

            <FsxTable data={componentImageAttachmentReducer.current}
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
}

export default React.memo(ImageAttachment);