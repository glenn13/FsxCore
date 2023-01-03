import React, {useRef} from 'react';
import {Attachment} from '@app/entities/global/Attachment';
import {GridColumn} from '@app/helpers/types';
import {RootState} from '@app/store/rootReducer';
import {attachmentToFile, downloadAttachment} from '@app/helpers/file';
import {Checkbox, FsxAttachmentForm, FsxDrawer, FsxTable} from '@app/components/common';
import {useDispatch, useSelector} from 'react-redux';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';

import {
  addGeneralAssetImageAttachment,
  removeGeneralAssetImageAttachment,
  updateGeneralAssetImageAttachment,
} from '@app/store/asset/register/generalassetimageattachment.reducers';
import {newGeneralAssetImageAttachment} from '@app/entities/asset/register/generalasset/generalasset.schema';

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
  const [selected, setSelected] = React.useState<GeneralAssetImageAttachment>();

  const [
    varGeneralAssetImageAttachment,
    varSetGeneralAssetImageAttachment,
  ] = React.useState<GeneralAssetImageAttachment>(newGeneralAssetImageAttachment());
  const generalAssetImageAttachmentReducer = useSelector(
    (state: RootState) => state.generalAssetImageAttachmentReducer,
  );
  const [
    {varIIsOpen, varIFile, varIRemarks},
    setAttachmentForm,
  ] = React.useState<AttachmentFormState>({
    varIIsOpen: false,
  });

  const tempIds = React.useMemo(
    () => generalAssetImageAttachmentReducer.current?.map(x => x.tempId),
    [generalAssetImageAttachmentReducer],
  );

  const {generalAssetId, dateUploaded} = varGeneralAssetImageAttachment;

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    varSetGeneralAssetImageAttachment(newGeneralAssetImageAttachment(tempIds));
    setSelectedTempId(varGeneralAssetImageAttachment.tempId);
    setAttachmentForm({varIIsOpen: true});
  };

  const handleClose = () => {
    varSetGeneralAssetImageAttachment(newGeneralAssetImageAttachment(tempIds));
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
    dispatch(removeGeneralAssetImageAttachment(selected));
    setSelected(undefined);
  };

  const handleExport = () => {
    if (!selected) return;

    const _attachment = getSelectedAttachmentDetails(selected);

    downloadAttachment(_attachment);
  };

  const handleSubmit = (varFile: File, varAttachmentFile: string, varRemarks?: string) => {
    const _currentIsDefault = varIsDefault; //Use this approach due to error occur when varIsDefault is assign directly to isDefault of class image attachment

    const generalAssetImageAttachment: GeneralAssetImageAttachment = {
      tempId: selectedTempId,
      id: selectedId,
      generalAssetId: generalAssetId,
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
      tempIds?.indexOf(selectedTempId) === -1
        ? addGeneralAssetImageAttachment
        : updateGeneralAssetImageAttachment;
    dispatch(action(generalAssetImageAttachment));
    setAttachmentForm({varIIsOpen: false});
    setIsDefault(false);
  };

  const getSelectedAttachmentDetails = (selected: GeneralAssetImageAttachment): Attachment => {
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
    varSetGeneralAssetImageAttachment(newGeneralAssetImageAttachment(tempIds));
  }, [generalAssetImageAttachmentReducer, tempIds]);

  return (
    <div className="flex flex-1 flex-col p-2 mb-5">
      <FsxDrawer
        isOpen={varIIsOpen}
        unMountChildren={true}
        title="Image Attachment"
        onClose={handleClose}>
        <FsxAttachmentForm
          onSubmit={handleSubmit}
          fileAttachment={varIFile}
          remarks={varIRemarks}
          type="images"
          isReadOnly={isReadOnly}>
          <Checkbox
            checked={varIsDefault}
            text="Set as Default"
            onChange={() => setIsDefault(!varIsDefault)}            
            disabled={isReadOnly}
          />
        </FsxAttachmentForm>
      </FsxDrawer>

      <FsxExcelExport
        fileName={`Register_GeneralAsset_ImageAttachment_${moment().format('YYYYMMDDHHmm')}`}
        data={generalAssetImageAttachmentReducer.current}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={generalAssetImageAttachmentReducer.current}
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
