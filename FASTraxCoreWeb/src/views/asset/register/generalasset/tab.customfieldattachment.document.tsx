import React, {useRef} from 'react';
import {RootState} from '@app/store/rootReducer';
import {GridColumn} from '@app/helpers/types';
import {attachmentToFile, downloadAttachment} from '@app/helpers/file';
import {FsxAttachmentForm, FsxDrawer, FsxTable} from '@app/components/common';
import {useDispatch, useSelector} from 'react-redux';
import FsxTableActions from '@app/components/common/FsxTable/Actions';

import {Attachment} from '@app/entities/global/Attachment';
import {
  addGeneralAssetDocumentAttachment,
  removeGeneralAssetDocumentAttachment,
  updateGeneralAssetDocumentAttachment,
} from '@app/store/asset/register/generalassetdocumentattachment.reducers';
import {newGeneralAssetDocumentAttachment} from '@app/entities/asset/register/generalasset/generalasset.schema';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';

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
  const [selected, setSelected] = React.useState<GeneralAssetDocumentAttachment>();

  const [
    varGeneralAssetDocumentAttachment,
    varSetGeneralAssetDocumentAttachment,
  ] = React.useState<GeneralAssetDocumentAttachment>(newGeneralAssetDocumentAttachment());
  const generalAssetDocumentAttachmentReducer = useSelector(
    (state: RootState) => state.generalAssetDocumentAttachmentReducer,
  );
  const [
    {varIIsOpen, varIFile, varIRemarks},
    setAttachmentForm,
  ] = React.useState<AttachmentFormState>({
    varIIsOpen: false,
  });

  const tempIds = React.useMemo(
    () => generalAssetDocumentAttachmentReducer.current?.map(x => x.tempId),
    [generalAssetDocumentAttachmentReducer],
  );

  const {generalAssetId, dateUploaded} = varGeneralAssetDocumentAttachment;

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    varSetGeneralAssetDocumentAttachment(newGeneralAssetDocumentAttachment(tempIds));
    setSelectedTempId(varGeneralAssetDocumentAttachment.tempId);
    setAttachmentForm({varIIsOpen: true});
  };

  const handleClose = () => {
    varSetGeneralAssetDocumentAttachment(newGeneralAssetDocumentAttachment(tempIds));
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
    dispatch(removeGeneralAssetDocumentAttachment(selected));
    setSelected(undefined);
  };

  const handleExport = () => {
    if (!selected) return;

    const _attachment = getSelectedAttachmentDetails(selected);

    downloadAttachment(_attachment);
  };

  const handleSubmit = (varFile: File, varAttachmentFile: string, varRemarks?: string) => {
    const generalAssetDocumentAttachment: GeneralAssetDocumentAttachment = {
      tempId: selectedTempId,
      id: selectedId,
      generalAssetId: generalAssetId,
      file: varAttachmentFile,
      fileName: varFile.name,
      fileSize: varFile.size,
      fileType: varFile.type,
      remarks: varRemarks || '',
      action: '',
      dateUploaded: dateUploaded,
    };

    const action =
      tempIds?.indexOf(selectedTempId) === -1
        ? addGeneralAssetDocumentAttachment
        : updateGeneralAssetDocumentAttachment;

    dispatch(action(generalAssetDocumentAttachment));
    setAttachmentForm({varIIsOpen: false});
  };

  const getSelectedAttachmentDetails = (selected: GeneralAssetDocumentAttachment): Attachment => {
    const _attachment: Attachment = {
      id: selected.id,
      file: selected.file,
      filename: selected.fileName,
      fileSize: selected.fileSize,
      fileType: selected.fileType,
      remarks: selected.remarks || '',
      createdDate: selected.dateUploaded,
      createdById: 0,
    };
    return _attachment;
  };

  React.useEffect(() => {
    varSetGeneralAssetDocumentAttachment(newGeneralAssetDocumentAttachment(tempIds));
  }, [generalAssetDocumentAttachmentReducer, tempIds]);

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
          isReadOnly={isReadOnly}></FsxAttachmentForm>
      </FsxDrawer>

      <FsxExcelExport
        fileName={`Register_GeneralAsset_AttachmentDocument_${moment().format('YYYYMMDDHHmm')}`}
        data={generalAssetDocumentAttachmentReducer.current}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={generalAssetDocumentAttachmentReducer.current}
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
