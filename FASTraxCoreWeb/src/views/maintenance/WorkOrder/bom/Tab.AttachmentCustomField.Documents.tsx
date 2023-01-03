import {RootState} from '@app/store/rootReducer';
import {GridColumn} from '@app/helpers/types';
import {attachmentToFile, downloadAttachment} from '@app/helpers/file';
import {FsxAttachmentForm, FsxDrawer, FsxTable} from '@app/components/common';
import {useDispatch, useSelector} from 'react-redux';
import FsxTableActions from '@app/components/common/FsxTable/Actions';

import {Attachment} from '@app/entities/global/Attachment';
import {
  addWorkOrderBOMDocumentAttachment,
  removeWorkOrderBOMDocumentAttachment,
  updateWorkOrderBOMDocumentAttachment,
  emptyWorkOrderBOMDocumentAttachment,
} from '@app/store/maintenance/workorder/bomDocumentAttachment.reducers';
import WorkOrderBOMDocumentAttachment from '@app/entities/maintenance/workorder/WorkOrderBOMDocumentAttachment';
import {ExcelExport, ExcelExportColumnProps} from '@progress/kendo-react-excel-export';
import moment from 'moment';
import React, {useRef} from 'react';
import FsxExcelExport from '@app/components/common/FsxExcelExport';

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
  const [selected, setSelected] = React.useState<WorkOrderBOMDocumentAttachment>();

  const [
    varWorkOrderBOMDocumentAttachment,
    varSetWorkOrderBOMDocumentAttachment,
  ] = React.useState<WorkOrderBOMDocumentAttachment>(emptyWorkOrderBOMDocumentAttachment());
  const workOrderBOMDocumentAttachmentReducer = useSelector(
    (state: RootState) => state.workOrderBOMDocumentAttachmentReducer,
  );
  const [
    {varIIsOpen, varIFile, varIRemarks},
    setAttachmentForm,
  ] = React.useState<AttachmentFormState>({
    varIIsOpen: false,
  });

  const ids = React.useMemo(
    () => workOrderBOMDocumentAttachmentReducer.map(wovdar => wovdar.tempId),
    [workOrderBOMDocumentAttachmentReducer],
  );

  const {workOrderBOMId, dateUploaded, createdById} = varWorkOrderBOMDocumentAttachment;

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    varSetWorkOrderBOMDocumentAttachment(emptyWorkOrderBOMDocumentAttachment(ids));
    setSelectedTempId(varWorkOrderBOMDocumentAttachment.tempId);
    setAttachmentForm({varIIsOpen: true});
  };

  const handleClose = () => {
    varSetWorkOrderBOMDocumentAttachment(emptyWorkOrderBOMDocumentAttachment(ids));
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
    dispatch(removeWorkOrderBOMDocumentAttachment(selected));
    setSelected(undefined);
  };

  const handleExport = () => {
    if (!selected) return;

    const _attachment = getSelectedAttachmentDetails(selected);

    downloadAttachment(_attachment);
  };

  const handleSubmit = (varFile: File, varAttachmentFile: string, varRemarks?: string) => {
    const workOrderBOMDocumentAttachment: WorkOrderBOMDocumentAttachment = {
      tempId: selectedTempId,
      id: selectedId,
      workOrderBOMId: workOrderBOMId,
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
        ? addWorkOrderBOMDocumentAttachment
        : updateWorkOrderBOMDocumentAttachment;

    dispatch(action(workOrderBOMDocumentAttachment));
    setAttachmentForm({varIIsOpen: false});
  };

  const getSelectedAttachmentDetails = (selected: WorkOrderBOMDocumentAttachment): Attachment => {
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
    varSetWorkOrderBOMDocumentAttachment(emptyWorkOrderBOMDocumentAttachment(ids));
  }, [workOrderBOMDocumentAttachmentReducer, ids]);

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
          type="documents"></FsxAttachmentForm>
      </FsxDrawer>

      <FsxExcelExport
        fileName={`WorkEstimate_Component_Attachment&CustomField_${moment().format(
          'YYYYMMDDHHmm',
        )}`}
        data={workOrderBOMDocumentAttachmentReducer}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={workOrderBOMDocumentAttachmentReducer}
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

export default React.memo(Documents);
