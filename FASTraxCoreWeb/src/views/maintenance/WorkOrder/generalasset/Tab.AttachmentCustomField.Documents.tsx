import {FsxAttachmentForm, FsxDrawer, FsxTable} from '@app/components/common';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import {Attachment} from '@app/entities/global/Attachment';
import WorkOrderGeneralAssetDocumentAttachment from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetDocumentAttachment';
import {attachmentToFile, downloadAttachment} from '@app/helpers/file';
import {GridColumn} from '@app/helpers/types';
import {
  addWorkOrderGeneralAssetDocumentAttachment,
  emptyWorkOrderGeneralAssetDocumentAttachment,
  removeWorkOrderGeneralAssetDocumentAttachment,
  updateWorkOrderGeneralAssetDocumentAttachment,
} from '@app/store/maintenance/workorder/generalAssetDocumentAttachment.reducers';
import {RootState} from '@app/store/rootReducer';
import moment from 'moment';
import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export interface DocumentsProps {}

const columns: GridColumn[] = [
  {field: 'fileName', title: 'File Name'},
  {field: 'fileSize', title: 'File Size', type: 'byteToKb'},
  {field: 'fileType', title: 'File Type'},
  {field: 'remarks', title: 'Remarks'},
  {field: 'action', title: 'Action'},
  {field: 'dateUploaded', title: 'Date Uploaded', format: '{0:dd-MMM-yyyy}'},
];

interface AttachmentFormState {
  varIRemarks?: string;
  varIIsOpen: boolean;
  varIFile?: File;
}

const Documents: React.FC<DocumentsProps> = () => {
  const dispatch = useDispatch();
  const [selectedTempId, setSelectedTempId] = React.useState(0);
  const [selectedId, setSelectedId] = React.useState(0);
  const [selected, setSelected] = React.useState<WorkOrderGeneralAssetDocumentAttachment>();

  const [
    varWorkOrderGeneralAssetDocumentAttachment,
    varSetWorkOrderGeneralAssetDocumentAttachment,
  ] = React.useState<WorkOrderGeneralAssetDocumentAttachment>(
    emptyWorkOrderGeneralAssetDocumentAttachment(),
  );
  const workOrderGeneralAssetDocumentAttachmentReducer = useSelector(
    (state: RootState) => state.workOrderGeneralAssetDocumentAttachmentReducer,
  );
  const [
    {varIIsOpen, varIFile, varIRemarks},
    setAttachmentForm,
  ] = React.useState<AttachmentFormState>({
    varIIsOpen: false,
  });

  const ids = React.useMemo(
    () => workOrderGeneralAssetDocumentAttachmentReducer.map(wovdar => wovdar.tempId),
    [workOrderGeneralAssetDocumentAttachmentReducer],
  );

  const {
    workOrderGeneralAssetId,
    dateUploaded,
    createdById,
  } = varWorkOrderGeneralAssetDocumentAttachment;

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    varSetWorkOrderGeneralAssetDocumentAttachment(
      emptyWorkOrderGeneralAssetDocumentAttachment(ids),
    );
    setSelectedTempId(varWorkOrderGeneralAssetDocumentAttachment.tempId);
    setAttachmentForm({varIIsOpen: true});
  };

  const handleClose = () => {
    varSetWorkOrderGeneralAssetDocumentAttachment(
      emptyWorkOrderGeneralAssetDocumentAttachment(ids),
    );
    setAttachmentForm({varIIsOpen: false});
  };

  const handleEdit = async () => {
    if (!selected) return;

    setSelectedTempId(selected.tempId);
    setSelectedId(selected.id);

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
    dispatch(removeWorkOrderGeneralAssetDocumentAttachment(selected));
    setSelected(undefined);
  };

  const handleExport = () => {
    if (!selected) return;

    const _attachment = getSelectedAttachmentDetails(selected);

    downloadAttachment(_attachment);
  };

  const handleSubmit = (varFile: File, varAttachmentFile: string, varRemarks?: string) => {
    const workOrderGeneralAssetDocumentAttachment: WorkOrderGeneralAssetDocumentAttachment = {
      tempId: selectedTempId,
      id: selectedId,
      workOrderGeneralAssetId: workOrderGeneralAssetId,
      file: varAttachmentFile,
      fileName: varFile.name,
      fileSize: varFile.size,
      fileType: varFile.type,
      remarks: varRemarks || '',
      action: '',
      dateUploaded: dateUploaded,
      createdById: createdById,
    };

    const action =
      ids.indexOf(selectedTempId) === -1
        ? addWorkOrderGeneralAssetDocumentAttachment
        : updateWorkOrderGeneralAssetDocumentAttachment;

    dispatch(action(workOrderGeneralAssetDocumentAttachment));
    setAttachmentForm({varIIsOpen: false});
  };

  const getSelectedAttachmentDetails = (
    selected: WorkOrderGeneralAssetDocumentAttachment,
  ): Attachment => {
    const _attachment: Attachment = {
      id: selected.id,
      file: selected.file,
      filename: selected.fileName,
      fileSize: selected.fileSize,
      fileType: selected.fileType,
      remarks: selected.remarks || '',
      createdDate: selected.dateUploaded,
      createdById: selected.createdById,
    };
    return _attachment;
  };

  React.useEffect(() => {
    varSetWorkOrderGeneralAssetDocumentAttachment(
      emptyWorkOrderGeneralAssetDocumentAttachment(ids),
    );
  }, [workOrderGeneralAssetDocumentAttachmentReducer, ids]);

  return (
    <>
      <FsxDrawer
        isOpen={varIIsOpen}
        unMountChildren={true}
        title="Document Attachment"
        onClose={handleClose}>
        <FsxAttachmentForm
          onSubmit={handleSubmit}
          fileAttachment={varIFile}
          remarks={varIRemarks}
          type="documents"></FsxAttachmentForm>
      </FsxDrawer>

      <FsxExcelExport
        fileName={`WorkEstimate_GeneralAsset_Attachment&CustomField_${moment().format(
          'YYYYMMDDHHmm',
        )}`}
        data={workOrderGeneralAssetDocumentAttachmentReducer}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={workOrderGeneralAssetDocumentAttachmentReducer}
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
    </>
  );
};

export default React.memo(Documents);
