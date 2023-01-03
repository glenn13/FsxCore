import React from 'react';
import {useFormikContext} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import AssetForm from './AssetForm';
import {useAsset} from '@app/hooks/useAsset';
import {RootState} from '@app/store/rootReducer';
import {useAttachments} from '@app/hooks/useAttachments';
import SeriesDropdown from '@app/views/asset/common/Dropdowns/Series';
import {GeneralAsset} from '@app/entities/asset/inventory/GeneralAsset';
import {useGeneralAssetGroups} from '@app/services/asset/assets.service';
import EntityAttachmentDocument from '@app/entities/global/EntityAttachment';
import AssetTypeDropdown from '@app/views/asset/common/Dropdowns/AssetType';
import AssetDepartmentDropdown from '@app/views/asset/common/Dropdowns/AssetDepartment';
import {setImages} from '@app/store/asset/inventory/attachmentImages.reducer';
import {EntityAttachmentImage} from '@app/entities/global/EntityAttachmentImage';
import { setDocuments } from '@app/store/asset/inventory/attachmentDocuments.reducer';
import PersonnelDropdown from '@app/views/hr/common/Dropdowns/Personnel';
import { AssetCategoryEnum } from '@app/helpers/asset/enum'

export interface GeneralAssetFormProps {
  isNew?: boolean;
}

const GeneralAssetForm: React.FC<GeneralAssetFormProps> = ({isNew}) => {
  const asset = useAsset();
  const dispatch = useDispatch();
  const formik = useFormikContext<GeneralAsset>();
  const generalAssetGroups = useGeneralAssetGroups();
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

  React.useEffect(() => {
    if (isNew) return;

    if (formik.values.generalAssetNameId) return;

    const generalAssetGroup = generalAssetGroups.data?.data?.find(
      gag => gag.id === formik.values.generalAssetGroupId,
    );

    if (!generalAssetGroup) return;

    formik.setFieldValue('generalAssetNameId', generalAssetGroup.generalAssetNameId);
    formik.setFieldValue('generalAssetGroupId', generalAssetGroup.id);
  }, [isNew, formik, generalAssetGroups]);

  return (
    <AssetForm
      isNew={isNew}
          images={images}
          categoryId={AssetCategoryEnum.GeneralAsset}
      generalAssetNameId={formik.values.generalAssetNameId}
      onCategoryChange={asset.onSetCategory}>
      <div className="grid grid-cols-4 gap-x-4 gap-y-2">
        <AssetTypeDropdown isFormik assetCategoryId={formik.values.assetCategoryId} required />
        <SeriesDropdown isFormik modelId={formik.values.assetModelId} required />
        <AssetDepartmentDropdown isFormik required />
        <PersonnelDropdown isFormik name="assignedToId" label="Assigned Person :" required />
      </div>
    </AssetForm>
  );
};

export default GeneralAssetForm;
