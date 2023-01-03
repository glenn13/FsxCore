import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GridColumn} from '../../../../../helpers/types';
import {RootState} from '../../../../../store/rootReducer';
import FsxTable from '../../../../../components/common/FsxTable';
import {Attachment} from '../../../../../entities/global/Attachment';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import {generateNegativeNumber} from '../../../../../helpers/randoms';
import {attachmentToFile, downloadAttachment} from '../../../../../helpers/file';
import {Checkbox, FsxAttachmentForm, FsxDrawer} from '../../../../../components/common';
import {EntityAttachmentImage} from '../../../../../entities/global/EntityAttachmentImage';
import {
  addImages,
  removeImages,
  updateImages,
} from '@app/store/asset/inventory/attachmentImages.reducer';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';

export interface ImageAttachmentsGridProps {
  data?: EntityAttachmentImage[];
  onDelete?: (id: number) => void;
  onSubmit?: (entityAttachment: EntityAttachmentImage) => void;
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

const ImageAttachmentsGrid: React.FC<ImageAttachmentsGridProps> = ({data, onDelete, onSubmit}) => {
  const dispatch = useDispatch();
  const [isDefault, setIsDefault] = React.useState(false);
  const [id, setId] = React.useState(() => generateNegativeNumber());
  const [selected, setSelected] = React.useState<EntityAttachmentImage | null>();
  const images = useSelector((state: RootState) => state.attachmentImages);
  const [{isOpen, file, remarks}, setAttachmentForm] = React.useState<AttachmentFormState>({
    isOpen: false,
  });

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

    setIsDefault(false);
    setAttachmentForm({isOpen: false});

    const imageAttachment: EntityAttachmentImage = {
      id,
      attachment,
      referenceId: 0,
      attachmentId: 0,
      printable: true,
      default: isDefault,
    };

    if (onSubmit) return onSubmit(imageAttachment);

    const action = images.some(image => image.id === id) ? updateImages : addImages;

    dispatch(action(imageAttachment));
  };

  const handleAdd = React.useCallback(() => {
    setAttachmentForm({isOpen: true});
    setId(generateNegativeNumber({obj: {pool: data || images, key: 'id'}}));
  }, [images, data]);

  const handleEdit = async () => {
    if (!selected) return;

    const {attachment} = selected;

    if (!attachment) return setAttachmentForm({isOpen: true, file, remarks: ''});

    const attachmentFile = await attachmentToFile(attachment);

    setId(selected.id);
    setIsDefault(selected.default);
    setAttachmentForm({isOpen: true, file: attachmentFile, remarks: attachment.remarks});
  };

  const handleDelete = () => {
    if (!selected) return;

    setSelected(null);

    if (onDelete) return onDelete(selected.id);

    dispatch(removeImages(selected.id));
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
        title="Image Attachments"
        onClose={() => setAttachmentForm({isOpen: false})}>
        <FsxAttachmentForm
          onSubmit={handleSubmit}
          fileAttachment={file}
          remarks={remarks}
          type="images">
          <Checkbox
            checked={isDefault}
            text="Set as Default"
            onChange={() => setIsDefault(!isDefault)}
          />
        </FsxAttachmentForm>
      </FsxDrawer>

      <FsxExcelExport
        fileName={`Inventory_ImageAttachment_${moment().format('YYYYMMDDHHmm')}`}
        data={data}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable columns={columns} data={data || images} onRowClick={e => setSelected(e.dataItem)}>
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

export default React.memo(ImageAttachmentsGrid);
