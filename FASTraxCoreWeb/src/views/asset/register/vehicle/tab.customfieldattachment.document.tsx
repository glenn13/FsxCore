import React, {useRef} from 'react';
import {RootState} from '@app/store/rootReducer';
import {GridColumn} from '@app/helpers/types';
import {attachmentToFile, downloadAttachment} from '@app/helpers/file';
import {FsxAttachmentForm, FsxDrawer, FsxTable} from '@app/components/common';
import {useDispatch, useSelector} from 'react-redux';
import FsxTableActions from '@app/components/common/FsxTable/Actions';

import {Attachment} from '@app/entities/global/Attachment';
import {
  addVehicleDocumentAttachment,
  removeVehicleDocumentAttachment,
  updateVehicleDocumentAttachment,
} from '@app/store/asset/register/vehicledocumentattachment.reducers';
import {newVehicleDocumentAttachment} from '@app/entities/asset/register/vehicle/vehicle.schema';
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
  const [selected, setSelected] = React.useState<VehicleDocumentAttachment>();

  const [
    varVehicleDocumentAttachment,
    varSetVehicleDocumentAttachment,
  ] = React.useState<VehicleDocumentAttachment>(newVehicleDocumentAttachment());
  const vehicleDocumentAttachmentReducer = useSelector(
    (state: RootState) => state.vehicleDocumentAttachmentReducer,
  );
  const [
    {varIIsOpen, varIFile, varIRemarks},
    setAttachmentForm,
  ] = React.useState<AttachmentFormState>({
    varIIsOpen: false,
  });

  const tempIds = React.useMemo(
    () => vehicleDocumentAttachmentReducer.current?.map(x => x.tempId),
    [vehicleDocumentAttachmentReducer],
  );

  const {vehicleId, dateUploaded} = varVehicleDocumentAttachment;

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    varSetVehicleDocumentAttachment(newVehicleDocumentAttachment(tempIds));
    setSelectedTempId(varVehicleDocumentAttachment.tempId);
    setAttachmentForm({varIIsOpen: true});
  };

  const handleClose = () => {
    varSetVehicleDocumentAttachment(newVehicleDocumentAttachment(tempIds));
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
    dispatch(removeVehicleDocumentAttachment(selected));
    setSelected(undefined);
  };

  const handleExport = () => {
    if (!selected) return;

    const _attachment = getSelectedAttachmentDetails(selected);

    downloadAttachment(_attachment);
  };

  const handleSubmit = (varFile: File, varAttachmentFile: string, varRemarks?: string) => {
    const vehicleDocumentAttachment: VehicleDocumentAttachment = {
      tempId: selectedTempId,
      id: selectedId,
      vehicleId: vehicleId,
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
        ? addVehicleDocumentAttachment
        : updateVehicleDocumentAttachment;

    dispatch(action(vehicleDocumentAttachment));
    setAttachmentForm({varIIsOpen: false});
  };

  const getSelectedAttachmentDetails = (selected: VehicleDocumentAttachment): Attachment => {
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
    varSetVehicleDocumentAttachment(newVehicleDocumentAttachment(tempIds));
  }, [vehicleDocumentAttachmentReducer, tempIds]);

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
        fileName={`Register_Vehicle_DocumentAttachment_${moment().format('YYYYMMDDHHmm')}`}
        data={vehicleDocumentAttachmentReducer.current}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={vehicleDocumentAttachmentReducer.current}
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
