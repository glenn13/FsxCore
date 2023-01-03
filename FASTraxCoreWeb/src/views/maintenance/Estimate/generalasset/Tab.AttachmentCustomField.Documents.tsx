import {FsxAttachmentForm, FsxDrawer, FsxTable} from '@app/components/common';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import {Attachment} from '@app/entities/global/Attachment';
import EstimateGeneralAssetDocumentAttachment from '@app/entities/maintenance/estimate/EstimateGeneralAssetDocumentAttachment';
import {attachmentToFile, downloadAttachment} from '@app/helpers/file';
import {GridColumn} from '@app/helpers/types';
import {
  addEstimateGeneralAssetDocumentAttachment,
  emptyEstimateGeneralAssetDocumentAttachment,
  removeEstimateGeneralAssetDocumentAttachment,
  updateEstimateGeneralAssetDocumentAttachment,
} from '@app/store/maintenance/estimate/generalAssetDocumentAttachment.reducers';
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
  const [selected, setSelected] = React.useState<EstimateGeneralAssetDocumentAttachment>();

  const [
    varEstimateGeneralAssetDocumentAttachment,
    varSetEstimateGeneralAssetDocumentAttachment,
  ] = React.useState<EstimateGeneralAssetDocumentAttachment>(
    emptyEstimateGeneralAssetDocumentAttachment(),
  );
  const estimateGeneralAssetDocumentAttachmentReducer = useSelector(
    (state: RootState) => state.estimateGeneralAssetDocumentAttachmentReducer,
  );
  const [
    {varIIsOpen, varIFile, varIRemarks},
    setAttachmentForm,
  ] = React.useState<AttachmentFormState>({
    varIIsOpen: false,
  });

  const ids = React.useMemo(
    () => estimateGeneralAssetDocumentAttachmentReducer.map(wovdar => wovdar.tempId),
    [estimateGeneralAssetDocumentAttachmentReducer],
  );

  const {
    estimateGeneralAssetId,
    dateUploaded,
    createdById,
  } = varEstimateGeneralAssetDocumentAttachment;

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    varSetEstimateGeneralAssetDocumentAttachment(emptyEstimateGeneralAssetDocumentAttachment(ids));
    setSelectedTempId(varEstimateGeneralAssetDocumentAttachment.tempId);
    setAttachmentForm({varIIsOpen: true});
  };

  const handleClose = () => {
    varSetEstimateGeneralAssetDocumentAttachment(emptyEstimateGeneralAssetDocumentAttachment(ids));
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
    dispatch(removeEstimateGeneralAssetDocumentAttachment(selected));
    setSelected(undefined);
  };

  const handleExport = () => {
    if (!selected) return;

    const _attachment = getSelectedAttachmentDetails(selected);

    downloadAttachment(_attachment);
  };

  const handleSubmit = (varFile: File, varAttachmentFile: string, varRemarks?: string) => {
    const estimateGeneralAssetDocumentAttachment: EstimateGeneralAssetDocumentAttachment = {
      tempId: selectedTempId,
      id: selectedId,
      estimateGeneralAssetId: estimateGeneralAssetId,
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
        ? addEstimateGeneralAssetDocumentAttachment
        : updateEstimateGeneralAssetDocumentAttachment;

    dispatch(action(estimateGeneralAssetDocumentAttachment));
    setAttachmentForm({varIIsOpen: false});
  };

  const getSelectedAttachmentDetails = (
    selected: EstimateGeneralAssetDocumentAttachment,
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
    varSetEstimateGeneralAssetDocumentAttachment(emptyEstimateGeneralAssetDocumentAttachment(ids));
  }, [estimateGeneralAssetDocumentAttachmentReducer, ids]);

  const excelColumns: ExcelExportColumnProps[] = React.useMemo(() => {
    if (!columns) return [];
    return columns.map(col => ({field: col.field, title: col.title}));
  }, [columns]);

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
        fileName={`WorkEstimate_GeneralAsset_Attachment&CustomField_${moment().format(
          'YYYYMMDDHHmm',
        )}`}
        data={estimateGeneralAssetDocumentAttachmentReducer}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={estimateGeneralAssetDocumentAttachmentReducer}
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
