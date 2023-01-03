import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@app/store/rootReducer';
import {FsxAttachmentForm, FsxDrawer, FsxTable} from '@app/components/common';
import {Attachment} from '@app/entities/global/Attachment';
import {attachmentToFile, downloadAttachment} from '@app/helpers/file';
import {GridColumn} from '@app/helpers/types';
import {
  addDispositionVehicleDocument,
  emptyDispositionVehicleDocument,
  removeDispositionVehicleDocument,
  updateDispositionVehicleDocument,
} from '@app/store/asset/disposition/vehicle/dispositionVehicleDocument.reducers';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import moment from 'moment';
import DispositionVehicleDocument from '@app/entities/asset/disposition/vehicle/DispositionVehicleDocument';

export interface DocumentsProps {
  isReadOnly: boolean;
}

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

const Documents: React.FC<DocumentsProps> = ({isReadOnly}) => {
  const dispatch = useDispatch();
  const [selectedTempId, setSelectedTempId] = React.useState(0);
  const [selectedId, setSelectedId] = React.useState(0);
  const [selected, setSelected] = React.useState<DispositionVehicleDocument>();

  const [
    varDispositionVehicleDocument,
    varSetDispositionVehicleDocument,
  ] = React.useState<DispositionVehicleDocument>(emptyDispositionVehicleDocument());
  const dispositionVehicleDocumentReducer = useSelector(
    (state: RootState) => state.dispositionVehicleDocumentReducer,
  );
  const [
    {varIIsOpen, varIFile, varIRemarks},
    setAttachmentForm,
  ] = React.useState<AttachmentFormState>({
    varIIsOpen: false,
  });

  const ids = React.useMemo(() => dispositionVehicleDocumentReducer.map(wovdar => wovdar.tempId), [
    dispositionVehicleDocumentReducer,
  ]);

  const {dispositionVehicleId, dateUploaded, createdById} = varDispositionVehicleDocument;

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    varSetDispositionVehicleDocument(emptyDispositionVehicleDocument(ids));
    setSelectedTempId(varDispositionVehicleDocument.tempId);
    setAttachmentForm({varIIsOpen: true});
  };

  const handleClose = () => {
    varSetDispositionVehicleDocument(emptyDispositionVehicleDocument(ids));
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
    dispatch(removeDispositionVehicleDocument(selected));
    setSelected(undefined);
  };

  const handleExport = () => {
    if (!selected) return;

    const _attachment = getSelectedAttachmentDetails(selected);

    downloadAttachment(_attachment);
  };

  const handleSubmit = (varFile: File, varAttachmentFile: string, varRemarks?: string) => {
    const dispositionVehicleDocument: DispositionVehicleDocument = {
      tempId: selectedTempId,
      id: selectedId,
      dispositionVehicleId: dispositionVehicleId,

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
        ? addDispositionVehicleDocument
        : updateDispositionVehicleDocument;

    dispatch(action(dispositionVehicleDocument));
    setAttachmentForm({varIIsOpen: false});
  };

  const getSelectedAttachmentDetails = (selected: DispositionVehicleDocument): Attachment => {
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
    varSetDispositionVehicleDocument(emptyDispositionVehicleDocument(ids));
  }, [dispositionVehicleDocumentReducer, ids]);

  return (
    <div className="flex flex-1 flex-col mb-5">
      <FsxDrawer
        isOpen={varIIsOpen}
        unMountChildren={true}
        title="Document Attachment"
        onClose={handleClose}
        isReadOnly={isReadOnly}>
        <FsxAttachmentForm
          onSubmit={handleSubmit}
          fileAttachment={varIFile}
          remarks={varIRemarks}
          type="documents"
          isReadOnly={isReadOnly}></FsxAttachmentForm>
      </FsxDrawer>

      <FsxExcelExport
        fileName={`Disposition_Vehicle_DocumentAttachments_${moment().format('YYYYMMDDHHmm')}`}
        data={dispositionVehicleDocumentReducer}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={dispositionVehicleDocumentReducer}
          columns={columns}
          onRowClick={e => setSelected(e.dataItem)}
          onRowDoubleClick={handleEdit}>
          <FsxTableActions
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onExport={exportToExcel}
            isReadOnly={isReadOnly}
          />
        </FsxTable>
      </FsxExcelExport>
    </div>
  );
};

export default React.memo(Documents);
