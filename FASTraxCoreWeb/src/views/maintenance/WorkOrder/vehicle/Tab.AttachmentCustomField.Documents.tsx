import {FsxAttachmentForm, FsxDrawer, FsxTable} from '@app/components/common';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import {Attachment} from '@app/entities/global/Attachment';
import WorkOrderVehicleDocumentAttachment from '@app/entities/maintenance/workorder/WorkOrderVehicleDocumentAttachment';
import {attachmentToFile, downloadAttachment} from '@app/helpers/file';
import {GridColumn} from '@app/helpers/types';
import {
  addWorkOrderVehicleDocumentAttachment,
  emptyWorkOrderVehicleDocumentAttachment,
  removeWorkOrderVehicleDocumentAttachment,
  updateWorkOrderVehicleDocumentAttachment,
} from '@app/store/maintenance/workorder/vehicleDocumentAttachment.reducers';
import {RootState} from '@app/store/rootReducer';
import {ExcelExport, ExcelExportColumnProps} from '@progress/kendo-react-excel-export';
import moment from 'moment';
import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FsxExcelExport from '@app/components/common/FsxExcelExport';

export interface DocumentsProps {}

const columns: GridColumn[] = [
  {field: 'fileName', title: 'File Name'},
  {field: 'fileSize', title: 'File Size', type: 'byteToKb'},
  {field: 'fileType', title: 'File Type'},
  {field: 'remarks', title: 'Remarks'},
  {field: 'action', title: 'Action'},
  {field: 'dateUploaded', title: 'Date Uploaded'},
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
  const [selected, setSelected] = React.useState<WorkOrderVehicleDocumentAttachment>();

  const [
    varWorkOrderVehicleDocumentAttachment,
    varSetWorkOrderVehicleDocumentAttachment,
  ] = React.useState<WorkOrderVehicleDocumentAttachment>(emptyWorkOrderVehicleDocumentAttachment());
  const workOrderVehicleDocumentAttachmentReducer = useSelector(
    (state: RootState) => state.workOrderVehicleDocumentAttachmentReducer,
  );
  const [
    {varIIsOpen, varIFile, varIRemarks},
    setAttachmentForm,
  ] = React.useState<AttachmentFormState>({
    varIIsOpen: false,
  });

  const ids = React.useMemo(
    () => workOrderVehicleDocumentAttachmentReducer.map(wovdar => wovdar.tempId),
    [workOrderVehicleDocumentAttachmentReducer],
  );

  const {workOrderVehicleId, dateUploaded, createdById} = varWorkOrderVehicleDocumentAttachment;

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    varSetWorkOrderVehicleDocumentAttachment(emptyWorkOrderVehicleDocumentAttachment(ids));
    setSelectedTempId(varWorkOrderVehicleDocumentAttachment.tempId);
    setAttachmentForm({varIIsOpen: true});
  };

  const handleClose = () => {
    varSetWorkOrderVehicleDocumentAttachment(emptyWorkOrderVehicleDocumentAttachment(ids));
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
    dispatch(removeWorkOrderVehicleDocumentAttachment(selected));
    setSelected(undefined);
  };

  const handleExport = () => {
    if (!selected) return;

    const _attachment = getSelectedAttachmentDetails(selected);

    downloadAttachment(_attachment);
  };

  const handleSubmit = (varFile: File, varAttachmentFile: string, varRemarks?: string) => {
    const workOrderVehicleDocumentAttachment: WorkOrderVehicleDocumentAttachment = {
      tempId: selectedTempId,
      id: selectedId,
      workOrderVehicleId: workOrderVehicleId,
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
        ? addWorkOrderVehicleDocumentAttachment
        : updateWorkOrderVehicleDocumentAttachment;

    dispatch(action(workOrderVehicleDocumentAttachment));
    setAttachmentForm({varIIsOpen: false});
  };

  const getSelectedAttachmentDetails = (
    selected: WorkOrderVehicleDocumentAttachment,
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
    varSetWorkOrderVehicleDocumentAttachment(emptyWorkOrderVehicleDocumentAttachment(ids));
  }, [workOrderVehicleDocumentAttachmentReducer, ids]);

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
        fileName={`WorkOrder_Vehicle_Attachment&CustomField_${moment().format('YYYYMMDDHHmm')}`}
        data={workOrderVehicleDocumentAttachmentReducer}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={workOrderVehicleDocumentAttachmentReducer}
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
