import React, {useRef} from 'react';
import {Checkbox, FsxAttachmentForm, FsxDrawer, FsxTable} from '@app/components/common';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import {Attachment} from '@app/entities/global/Attachment';
import {attachmentToFile, downloadAttachment} from '@app/helpers/file';
import {GridColumn} from '@app/helpers/types';
import {
  addDispositionVehicleImage,
  emptyDispositionVehicleImage,
  removeDispositionVehicleImage,
  updateDispositionVehicleImage,
} from '@app/store/asset/disposition/vehicle/dispositionVehicleImage.reducers';
import {RootState} from '@app/store/rootReducer';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import DispositionVehicleImage from '@app/entities/asset/disposition/vehicle/DispositionVehicleImage';

export interface ImagesProps {
  isReadOnly: boolean;
}

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

const ImageAttachment: React.FC<ImagesProps> = ({isReadOnly}) => {
  const dispatch = useDispatch();
  const [selectedTempId, setSelectedTempId] = React.useState(0);
  const [selectedId, setSelectedId] = React.useState(0);
  const [varIsDefault, setIsDefault] = React.useState(false);
  const [selected, setSelected] = React.useState<DispositionVehicleImage>();

  const [
    varDispositionVehicleImage,
    varSetDispositionVehicleImage,
  ] = React.useState<DispositionVehicleImage>(emptyDispositionVehicleImage());
  const dispositionVehicleImageReducer = useSelector(
    (state: RootState) => state.dispositionVehicleImageReducer,
  );
  const [
    {varIIsOpen, varIFile, varIRemarks},
    setAttachmentForm,
  ] = React.useState<AttachmentFormState>({
    varIIsOpen: false,
  });

  const ids = React.useMemo(() => dispositionVehicleImageReducer.map(woviar => woviar.tempId), [
    dispositionVehicleImageReducer,
  ]);

  const {dispositionVehicleId, dateUploaded} = varDispositionVehicleImage;

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    varSetDispositionVehicleImage(emptyDispositionVehicleImage(ids));
    setSelectedTempId(varDispositionVehicleImage.tempId);
    setAttachmentForm({varIIsOpen: true});
  };

  const handleClose = () => {
    varSetDispositionVehicleImage(emptyDispositionVehicleImage(ids));
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
    dispatch(removeDispositionVehicleImage(selected));
    setSelected(undefined);
  };

  const handleExport = () => {
    if (!selected) return;

    const _attachment = getSelectedAttachmentDetails(selected);

    downloadAttachment(_attachment);
  };

  const handleSubmit = (varFile: File, varAttachmentFile: string, varRemarks?: string) => {
    const _currentIsDefault = varIsDefault; //Use this approach due to error occur when varIsDefault is assign directly to isDefault of class image attachment

    const dispositionVehicleImage: DispositionVehicleImage = {
      tempId: selectedTempId,
      id: selectedId,
      dispositionVehicleId: dispositionVehicleId,
      image: varAttachmentFile,
      fileName: varFile.name,
      fileSize: varFile.size,
      imageType: varFile.type,
      remarks: varRemarks || '',
      dateUploaded: dateUploaded,
      isPrintable: false,
      orientation: '',
      isDefault: _currentIsDefault,
    };

    const action =
      ids.indexOf(selectedTempId) === -1
        ? addDispositionVehicleImage
        : updateDispositionVehicleImage;

    dispatch(action(dispositionVehicleImage));
    setAttachmentForm({varIIsOpen: false});
    setIsDefault(false);
  };

  const getSelectedAttachmentDetails = (selected: DispositionVehicleImage): Attachment => {
    const _attachment: Attachment = {
      id: selected.id,
      file: selected.image,
      filename: selected.fileName,
      fileSize: selected.fileSize,
      fileType: selected.imageType,
      remarks: selected.remarks || '',
      createdDate: selected.dateUploaded,
      createdById: 0,
    };
    return _attachment;
  };

  React.useEffect(() => {
    varSetDispositionVehicleImage(emptyDispositionVehicleImage(ids));
  }, [dispositionVehicleImageReducer, ids]);

  return (
    <div className="flex flex-1 flex-col mb-5">
      <FsxDrawer
        isOpen={varIIsOpen}
        unMountChildren={true}
        title="Image Attachments"
        onClose={handleClose}
        isReadOnly={isReadOnly}>
        <FsxAttachmentForm
          onSubmit={handleSubmit}
          fileAttachment={varIFile}
          remarks={varIRemarks}
          isReadOnly={isReadOnly}
          type="images">
          <Checkbox
            checked={varIsDefault}
            text="Set as Default"
            onChange={() => setIsDefault(!varIsDefault)}
            disabled={isReadOnly}
          />
        </FsxAttachmentForm>
      </FsxDrawer>

      <FsxExcelExport
        fileName={`Disposition_Vehicle_ImageAttachments_${moment().format('YYYYMMDDHHmm')}`}
        data={dispositionVehicleImageReducer}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={dispositionVehicleImageReducer}
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

export default React.memo(ImageAttachment);
