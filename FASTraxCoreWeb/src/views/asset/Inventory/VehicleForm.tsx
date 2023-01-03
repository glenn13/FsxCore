import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AssetForm from './AssetForm';
import {useFormikContext} from 'formik';
import {useAsset} from '@app/hooks/useAsset';
import {RootState} from '@app/store/rootReducer';
import {useAttachments} from '@app/hooks/useAttachments';
import {Vehicle} from '@app/entities/asset/inventory/Vehicle';
import AssetLocationDropdown from '../common/Dropdowns/AssetLocation';
import SeriesDropdown from '@app/views/asset/common/Dropdowns/Series';
import AssetTypeDropdown from '@app/views/asset/common/Dropdowns/AssetType';
import EntityAttachmentDocument from '@app/entities/global/EntityAttachment';
import {setImages} from '@app/store/asset/inventory/attachmentImages.reducer';
import {EntityAttachmentImage} from '@app/entities/global/EntityAttachmentImage';
import {setDocuments} from '@app/store/asset/inventory/attachmentDocuments.reducer';
import {
  FsxFormikNumericTextBox as FsxFormikNumericTextBox,
  FsxFormikInput,
  FsxFormikDatePicker,
} from '@app/components/common/FsxFormik';
import { AssetCategoryEnum } from '@app/helpers/asset/enum'

export interface VehicleFormProps {
  isNew?: boolean;
}

const VehicleForm: React.FC<VehicleFormProps> = ({isNew}) => {
  const asset = useAsset();
  const dispatch = useDispatch();
  const formik = useFormikContext<Vehicle>();
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
          categoryId={AssetCategoryEnum.Vehicle}
      onCategoryChange={asset.onSetCategory}>
       <div className="grid grid-cols-4 gap-x-4 gap-y-2">
        <AssetTypeDropdown isFormik assetCategoryId={formik.values.assetCategoryId} required />
        <SeriesDropdown isFormik modelId={formik.values.assetModelId} required />
        <AssetLocationDropdown isFormik required/>
        <FsxFormikDatePicker name="pickupDate" label="Pick-up Date:" required />
      </div>
      <div className="grid grid-cols-4 gap-x-4 gap-y-2">
        <FsxFormikInput name="tireFront" label="Tire Size(Front):" required />
        <FsxFormikInput name="tireRear" label="Tire Size(Rear):" required />
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <FsxFormikNumericTextBox name="maxCapacity" label="Max Capacity:" required />
          <FsxFormikNumericTextBox name="doorCount" label="Door Count:" required />
        </div>
      </div>
    </AssetForm>
  );
};

export default VehicleForm;
