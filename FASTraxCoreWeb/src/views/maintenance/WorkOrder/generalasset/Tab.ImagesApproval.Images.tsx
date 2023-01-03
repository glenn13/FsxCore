import {Checkbox, FsxAttachmentForm, FsxDrawer, FsxTable} from '@app/components/common';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import {Attachment} from '@app/entities/global/Attachment';
import WorkOrderGeneralAssetImageAttachment from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetImageAttachment';
import {attachmentToFile, downloadAttachment} from '@app/helpers/file';
import {GridColumn} from '@app/helpers/types';
import {
  addWorkOrderGeneralAssetImageAttachment,
  emptyWorkOrderGeneralAssetImageAttachment,
  removeWorkOrderGeneralAssetImageAttachment,
  updateWorkOrderGeneralAssetImageAttachment,
} from '@app/store/maintenance/workorder/generalAssetImageAttachment.reducers';
import {RootState} from '@app/store/rootReducer';
import moment from 'moment';
import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export interface ImagesProps {}

const columns: GridColumn[] = [
  {field: 'imageType', title: 'File Type'},
  {field: 'fileName', title: 'File Name'},
  {field: 'fileSize', title: 'File Size', type: 'byteToKb'},
  {field: 'remarks', title: 'Remarks'},
];

interface AttachmentFormState {
  varIRemarks?: string;
  varIIsOpen: boolean;
  varIFile?: File;
}

const Images: React.FC<ImagesProps> = () => {
  const dispatch = useDispatch();
  const [selectedTempId, setSelectedTempId] = React.useState(0);
  const [selectedId, setSelectedId] = React.useState(0);
  const [varIsDefault, setIsDefault] = React.useState(false);
  const [selected, setSelected] = React.useState<WorkOrderGeneralAssetImageAttachment>();

  const [
    varWorkOrderGeneralAssetImageAttachment,
    varSetWorkOrderGeneralAssetImageAttachment,
  ] = React.useState<WorkOrderGeneralAssetImageAttachment>(
    emptyWorkOrderGeneralAssetImageAttachment(),
  );
  const workOrderGeneralAssetImageAttachmentReducer = useSelector(
    (state: RootState) => state.workOrderGeneralAssetImageAttachmentReducer,
  );
  const [
    {varIIsOpen, varIFile, varIRemarks},
    setAttachmentForm,
  ] = React.useState<AttachmentFormState>({
    varIIsOpen: false,
  });

  const ids = React.useMemo(
    () => workOrderGeneralAssetImageAttachmentReducer.map(woviar => woviar.tempId),
    [workOrderGeneralAssetImageAttachmentReducer],
  );

  const {
    workOrderGeneralAssetId,
    dateUploaded,
    createdById,
  } = varWorkOrderGeneralAssetImageAttachment;

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    varSetWorkOrderGeneralAssetImageAttachment(emptyWorkOrderGeneralAssetImageAttachment(ids));
    setSelectedTempId(varWorkOrderGeneralAssetImageAttachment.tempId);
    setAttachmentForm({varIIsOpen: true});
  };

  const handleClose = () => {
    varSetWorkOrderGeneralAssetImageAttachment(emptyWorkOrderGeneralAssetImageAttachment(ids));
    setIsDefault(false);
    setAttachmentForm({varIIsOpen: false});
  };

  const handleEdit = async () => {
    if (!selected) return;

    setSelectedTempId(selected.tempId);
    setSelectedId(selected.id);
    setIsDefault(selected.isDefault);

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
    dispatch(removeWorkOrderGeneralAssetImageAttachment(selected));
    setSelected(undefined);
  };

  const handleExport = () => {
    if (!selected) return;

    const _attachment = getSelectedAttachmentDetails(selected);

    downloadAttachment(_attachment);
  };

  const handleSubmit = (varFile: File, varAttachmentFile: string, varRemarks?: string) => {
    const _currentIsDefault = varIsDefault; //Use this approach due to error occur when varIsDefault is assign directly to isDefault of class image attachment

    const workOrderGeneralAssetImageAttachment: WorkOrderGeneralAssetImageAttachment = {
      tempId: selectedTempId,
      id: selectedId,
      workOrderGeneralAssetId: workOrderGeneralAssetId,
      image: varAttachmentFile,
      fileName: varFile.name,
      fileSize: varFile.size,
      imageType: varFile.type,
      remarks: varRemarks || '',
      dateUploaded: dateUploaded,
      createdById: createdById,
      isPrintable: false,
      isDefault: _currentIsDefault,
    };

    const action =
      ids.indexOf(selectedTempId) === -1
        ? addWorkOrderGeneralAssetImageAttachment
        : updateWorkOrderGeneralAssetImageAttachment;

    dispatch(action(workOrderGeneralAssetImageAttachment));
    setAttachmentForm({varIIsOpen: false});
    setIsDefault(false);
  };

  const getSelectedAttachmentDetails = (
    selected: WorkOrderGeneralAssetImageAttachment,
  ): Attachment => {
    const _attachment: Attachment = {
      id: selected.id,
      file: selected.image,
      filename: selected.fileName,
      fileSize: selected.fileSize,
      fileType: selected.imageType,
      remarks: selected.remarks || '',
      createdDate: selected.dateUploaded,
      createdById: selected.createdById,
    };
    return _attachment;
  };

  React.useEffect(() => {
    varSetWorkOrderGeneralAssetImageAttachment(emptyWorkOrderGeneralAssetImageAttachment(ids));
  }, [workOrderGeneralAssetImageAttachmentReducer, ids]);

  return (
    <div className="flex flex-1 flex-col">
      <FsxDrawer
        isOpen={varIIsOpen}
        unMountChildren={true}
        title="Image Attachments"
        onClose={handleClose}>
        <FsxAttachmentForm
          onSubmit={handleSubmit}
          fileAttachment={varIFile}
          remarks={varIRemarks}
          type="images">
          <Checkbox
            checked={varIsDefault}
            text="Set as Default"
            onChange={() => setIsDefault(!varIsDefault)}
          />
        </FsxAttachmentForm>
      </FsxDrawer>

      <FsxExcelExport
        fileName={`WorkEstimate_GeneralAsset_Image&Approval_${moment().format('YYYYMMDDHHmm')}`}
        data={workOrderGeneralAssetImageAttachmentReducer}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={workOrderGeneralAssetImageAttachmentReducer}
          columns={columns}
          onRowClick={e => setSelected(e.dataItem)}
          onRowDoubleClick={handleEdit}>
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

export default React.memo(Images);
