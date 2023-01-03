import React from 'react';
import {useFormikContext} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import AssetForm from './AssetForm';
import {useAsset} from '@app/hooks/useAsset';
import {RootState} from '@app/store/rootReducer';
import {useAttachments} from '@app/hooks/useAttachments';
import {Component} from '@app/entities/asset/inventory/Component';
import SeriesDropdown from '@app/views/asset/common/Dropdowns/Series';
import UsersDropdown from '@app/views/catalog/common/Dropdowns/Users';
import EntityAttachmentDocument from '@app/entities/global/EntityAttachment';
import AssetTypesDropdown from '@app/views/asset/common/Dropdowns/AssetType';
import HumanResourceDepartmentDropdown from '@app/views//hr/common/Dropdowns/HumanResouceDepartment';
import {setImages} from '@app/store/asset/inventory/attachmentImages.reducer';
import {EntityAttachmentImage} from '@app/entities/global/EntityAttachmentImage';
import {setDocuments} from '@app/store/asset/inventory/attachmentDocuments.reducer';
import { AssetCategoryEnum } from '@app/helpers/asset/enum'

export interface ComponentFormProps {
  isNew?: boolean;
}

const ComponentForm: React.FC<ComponentFormProps> = ({isNew}) => {
  const asset = useAsset();
  const dispatch = useDispatch();
  const formik = useFormikContext<Component>();
  const {images, documents} = useSelector((state: RootState) => ({
    images: state.attachmentImages,
    documents: state.attachmentDocuments,
  }));

  useAttachments<EntityAttachmentImage>({
    attachments: images,
    updateAttachments: attachments => dispatch(setImages(attachments)),
  });

  useAttachments<EntityAttachmentDocument>({
    attachments: documents,
    updateAttachments: attachments => dispatch(setDocuments(attachments)),
  });

  return (
    <AssetForm
      isNew={isNew}
          images={images}
          categoryId={AssetCategoryEnum.Component}
      onCategoryChange={asset.onSetCategory}>
      <div className="grid grid-cols-4 gap-x-4 gap-y-2">
        <AssetTypesDropdown isFormik assetCategoryId={formik.values.assetGroupId} required />
        <SeriesDropdown isFormik modelId={formik.values.assetModelId} required />
        <HumanResourceDepartmentDropdown isFormik required/>
        <UsersDropdown isFormik name="assignedToId" label="Assigned To:" required />
      </div>
    </AssetForm>
  );
};

export default ComponentForm;
