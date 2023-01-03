import React from 'react';

import { useFormikContext } from 'formik';
import { Carousel, FsxModal } from '@app/components/common';
import { FsxFormikDatePicker } from '@app/components/common/FsxFormik';
import { FsxFormikInput } from '@app/components/common/FsxFormik';

import { Asset } from '@app/entities/asset/inventory/Asset';
import { EntityAttachmentImage } from '@app/entities/global/EntityAttachmentImage';

import { getDefaultAssetStatus } from '@app/services/asset/standardentries/assetStatus.service';
import { getDefaultMaintenanceStatus } from '@app/services/maintenance/standardentries/maintenanceStatus.service';
import { getTypeSafePropertyAsString } from '@app/helpers/types';

import AssetCategoryDropdown from '../common/Dropdowns/AssetCategory';
import AssetColorDropdown from '@app/views/asset/common/Dropdowns/AssetColor';
//import AssetGroupDropdown from '../common/Dropdowns/AssetGroup';
import AssetItemNameDropdown from '../common/Dropdowns/AssetItemName';
import AssetManufacturerDropdown from '../common/Dropdowns/AssetManufacturer';
import AssetModelDropdown from '../common/Dropdowns/AssetModel';
import AssetModelYearDropdown from '@app/views/asset/common/Dropdowns/AssetModelYear';
import AssetOwnershipTypeDropdown from '@app/views/asset/common/Dropdowns/AssetOwnershipType';
import AssetStatusesDropdown from '../common/Dropdowns/AssetStatus';
// import GeneralAssetGroupInput from './GeneralAssetGroupInput';
// import GeneralAssetNameInput from './GeneralAssetNameInput';
// import GeneralAssetGroupItemDropdown from '@app/views/asset/common/Dropdowns/GeneralAssetGroupItem';

import MaintenanceStatusesDropdown from '@app/views/maintenance/common/Dropdowns/MaintenanceStatus';
import { AssetCategoryEnum } from '@app/helpers/asset/enum'

const Barcode = require('react-barcode');

export interface AssetFormProps {
  isNew?: boolean;
    categoryId: AssetCategoryEnum;
  generalAssetNameId?: number;
  images: EntityAttachmentImage[];
    onCategoryChange: (value: AssetCategoryEnum) => void;
}

const AssetForm: React.FC<AssetFormProps> = ({
  isNew,
  images,
  categoryId,
  generalAssetNameId,
  onCategoryChange,
  children,
}) => {
  const formik = useFormikContext<Asset>();
  const [isBarcodeOpen, setIsBarcodeOpen] = React.useState(() => false);

  React.useEffect(() => {
    if (!isNew) return;

    if (!formik.values.maintenanceStatusId) {
      getDefaultAssetStatus().then(response => {
        const property = getTypeSafePropertyAsString<Asset>('assetStatusId');

        const isDirty = Object.keys(formik.touched).length > 0;

        formik.setFieldValue(property, response.data.id);

        if (isDirty) return formik.setStatus(true);

        formik.setStatus(false);
      });
    }

    if (!formik.values.maintenanceStatusId) {
      getDefaultMaintenanceStatus().then(async response => {
        const property = getTypeSafePropertyAsString<Asset>('maintenanceStatusId');

        formik.setFieldValue(property, response.data.id);
      });
    }
  }, [formik, isNew]);

    const serialNoLabel = categoryId === AssetCategoryEnum.Vehicle ? 'VIN:' : 'Serial No:';

  return (
    <div className="flex flex-1 flex-row-reverse flex-wrap bg-white py-4 px-8 shadow">
      <div className="w-1/4 pl-2 pt-5">
        {/* <Carousel images={images} /> */}
        <div className="w-full mt-8">
          <button type="button" onClick={() => formik.values.serialNo && setIsBarcodeOpen(true)}>
            View Barcode
          </button>
          <FsxModal
            title="Scan Barcode"
            isOpen={isBarcodeOpen}
            onClose={() => setIsBarcodeOpen(false)}>
            <Barcode value={formik.values.serialNo} height={56} displayValue={false} />
          </FsxModal>
        </div>
      </div>
      <div className="w-3/4 pr-2 flex flex-col flex-wrap content-start">
        <AssetCategoryDropdown
          className="mb-3"
          value={categoryId}
          disabled={!!formik.values.id}
          onChange={e => !formik.values.id && onCategoryChange(e.value['id'])}
        />
        <div className="flex flex-1 flex-row">
          <FsxFormikInput
            className="w-1/4 mr-1"
            name="serialNo"
            label={serialNoLabel}
            // changeOnBlur
            required
          />
                  <div className="w-2/4 mx-1 flex flex-row">
                      {categoryId !== AssetCategoryEnum.GeneralAsset ? (
              <FsxFormikInput
                className="flex flex-1"
                name="title"
                label="Asset Name:"
                // changeOnBlur
              />
            ) : (
              <div className="w-full grid grid-cols-2 gap-x-4 gap-y-2">
                <AssetItemNameDropdown assetGroupId={formik.values.assetGroupId} />
              </div>
            )}
          </div>
          <FsxFormikDatePicker
            className="w-1/4 ml-1"
            name="dateRegistered"
            label="Date Registered:"
          />
        </div>
        <div className="w-full grid gap-x-4 gap-y-2 grid-cols-4 top-0">
          <FsxFormikInput name="assetRefId" label="Asset ID:" required />
          <AssetManufacturerDropdown isFormik assetTypeId={formik.values.assetTypeId} required />
          <AssetStatusesDropdown isFormik disabled={isNew} required />
          <FsxFormikDatePicker name="lastServiceDate" label="Last Service Date:" required />
          <AssetModelDropdown isFormik assetManufacturerId={formik.values.assetManufacturerId} required />
          <MaintenanceStatusesDropdown isFormik disabled={isNew} />
          <FsxFormikDatePicker name="inventoryDate" label="Inventory Date:" required />
        </div>
        {children}
        <div className="w-full grid grid-cols-2 gap-x-4 gap-y-2">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <AssetOwnershipTypeDropdown isFormik required />
            <div className="w-full grid grid-cols-2 gap-x-4 gap-y-2">
            <AssetModelYearDropdown isFormik required />
            <AssetColorDropdown isFormik required />
            </div>
          </div>
          <FsxFormikInput name="description" label="Asset Description:" />
        </div>
      </div>
    </div>
  );
};

export default AssetForm;
