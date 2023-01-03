import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GridColumn} from '../../../../../helpers/types';
import {RootState} from '../../../../../store/rootReducer';
import {FsxDrawer} from '../../../../../components/common';
import FsxTable from '../../../../../components/common/FsxTable';
import {FsxAttachmentForm} from '../../../../../components/common';
import {Attachment} from '../../../../../entities/global/Attachment';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import {generateNegativeNumber} from '../../../../../helpers/randoms';
import {attachmentToFile, downloadAttachment} from '../../../../../helpers/file';
import {EntityAttachmentDocument} from '../../../../../entities/global/EntityAttachmentDocument';
import {
  addDocuments,
  removeDocuments,
  updateDocuments,
} from '@app/store/asset/inventory/attachmentDocuments.reducer';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';

export interface DocumentAttachmentsGridProps {
  data?: EntityAttachmentDocument[];
  onDelete?: (id: number) => void;
  onSubmit?: (entityAttachment: EntityAttachmentDocument) => void;
}

const columns: GridColumn[] = [
  {field: 'attachment.fileType', title: 'File Type'},
  {field: 'attachment.filename', title: 'Filename'},
  {field: 'attachment.fileSize', title: 'File Size'},
  {field: 'attachment.remarks', title: 'remarks'},
];

interface AttachmentFormState {
  remarks?: string;
  isOpen: boolean;
  file?: File;
}

const DocumentAttachmentsGrid: React.FC<DocumentAttachmentsGridProps> = ({
  data,
  onDelete,
  onSubmit,
}) => {
  const dispatch = useDispatch();
  const [id, setId] = React.useState(() => generateNegativeNumber());
  const [selected, setSelected] = React.useState<EntityAttachmentDocument | null>();
  const [{isOpen, file, remarks}, setAttachmentForm] = React.useState<AttachmentFormState>({
    isOpen: false,
  });
  const documents = useSelector((state: RootState) => state.attachmentDocuments);

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleSubmit = (file: File, attachmentFile: string, remarks?: string) => {
    const attachment: Attachment = {
      id: selected?.attachment?.id || 0,
      remarks,
      createdById: 0,
      file: attachmentFile,
      filename: file.name,
      fileSize: file.size,
      fileType: file.type,
      createdDate: new Date(),
    };

    const documentAttachment: EntityAttachmentDocument = {
      id,
      attachment,
      referenceId: 0,
      attachmentId: 0,
    };

    setAttachmentForm({isOpen: false});

    if (onSubmit) return onSubmit(documentAttachment);

    const action = documents.some(document => document.id === id) ? updateDocuments : addDocuments;

    dispatch(action(documentAttachment));
  };

  const handleAdd = React.useCallback(() => {
    setAttachmentForm({isOpen: true});
    setId(generateNegativeNumber({obj: {pool: data || documents, key: 'id'}}));
  }, [documents, data]);

  const handleEdit = async () => {
    if (!selected) return;

    const {attachment} = selected;

    if (!attachment) return setAttachmentForm({isOpen: true, file, remarks: ''});

    const attachmentFile = await attachmentToFile(attachment);

    setId(selected.id);
    setAttachmentForm({isOpen: true, file: attachmentFile, remarks: attachment.remarks});
  };

  const handleDelete = () => {
    if (!selected) return;

    setSelected(null);

    if (onDelete) return onDelete(selected.id);

    dispatch(removeDocuments(selected.id));
  };

  const handleExport = () => {
    if (!selected) return;

    if (!selected.attachment) return;

    downloadAttachment(selected.attachment);
  };

  return (
    <div className="flex flex-1 flex-col py-5 px-8">
      <FsxDrawer
        isOpen={isOpen}
        unMountChildren={true}
        title="Document Attachment"
        onClose={() => setAttachmentForm({isOpen: false})}>
        <FsxAttachmentForm
          onSubmit={handleSubmit}
          fileAttachment={file}
          remarks={remarks}
          type="documents"
        />
      </FsxDrawer>
      <FsxExcelExport
        fileName={`Inventory_DocumentAttachment_${moment().format('YYYYMMDDHHmm')}`}
        data={data}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          columns={columns}
          data={data || documents}
          onRowClick={e => setSelected(e.dataItem)}>
          <FsxTableActions
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onExport={exportToExcel}
          />
        </FsxTable>
      </FsxExcelExport>
    </div>
  );
};

export default React.memo(DocumentAttachmentsGrid);
