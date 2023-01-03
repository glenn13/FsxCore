import React, {useState} from 'react';
import {useFormikContext} from 'formik';
import FsxFormikDatePicker from '@app/components/common/FsxFormik/FsxFormikDatePicker';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';
import DispositionStatusesDropdown from '@app/views/asset/common/Dropdowns/DispositionStatuses';
import DispositionTypesDropdown from '@app/views/asset/common/Dropdowns/DispositionTypes';
import AssetColorDropdown from '@app/views/asset/common/Dropdowns/AssetColor';
import AssetManufacturerDropdown from '@app/views/asset/common/Dropdowns/AssetManufacturer';
import AssetModelDropdown from '@app/views/asset/common/Dropdowns/AssetModel';
import AssetOwnershipTypeDropdown from '@app/views/asset/common/Dropdowns/AssetOwnershipType';
import {FileAttachment} from '@app/helpers/files';
import {RootState, StoreDispatch} from '@app/store/rootReducer';
import {useDispatch, useSelector} from 'react-redux';
import {Carousel, CurrencyInput, FsxNumericTextBox} from '@app/components/common';
import {FSXDateFormat} from '@app/helpers/global/enum';
import DispositionGeneralAsset from '@app/entities/asset/disposition/generalasset/DispositionGeneralAsset';
import DispositionGeneralAssetTab from './DispositionGeneralAssetTab';
import AssetItemNameDropdown from '../../common/Dropdowns/AssetItemName';
import AssetTypeDropdown from '@app/views/asset/common/Dropdowns/AssetType';
import AssetGroupDropdown from '@app/views/asset/common/Dropdowns/AssetGroup';
import {useHistory} from 'react-router-dom';
import UsersDropdown from '@app/views/catalog/common/Dropdowns/Users';
import {loadUser} from '@app/store/catalog/users/user.actions';
import {User} from '@app/entities/catalog';
import {AssetCategoryEnum} from '@app/helpers/asset/enum';
export interface DispositionGeneralAssetInformationProps {
  isEdit: boolean;
  isReadOnly: boolean;
}

const DispositionGeneralAssetInformation: React.FC<DispositionGeneralAssetInformationProps> = ({
  isEdit,isReadOnly
}) => {
  const history = useHistory();
  const formik = useFormikContext<DispositionGeneralAsset>();

  const dispatch: StoreDispatch = useDispatch();
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    dispatch(loadUser(formik.values.requestedById)).then(user => setUser(user));
  }, [dispatch, formik.values.requestedById]);

  const dispositionGeneralAssetImageReducer = useSelector(
    (state: RootState) => state.dispositionGeneralAssetImageReducer,
  );

  const [carouselImages, setCarouselImages] = React.useState<FileAttachment[]>();

  React.useEffect(() => {
    if (dispositionGeneralAssetImageReducer !== undefined) {
      if (dispositionGeneralAssetImageReducer.length > 0) {
        const _carouselImages: FileAttachment[] = dispositionGeneralAssetImageReducer.map(x => {
          return {
            file: x.image,
            filename: x.fileName,
            fileType: x.imageType,
            fileSize: x.fileSize,
            default: x.isDefault,
          };
        });
        setCarouselImages(_carouselImages);
      } else {
        setCarouselImages([]);
      }
    }
  }, [dispositionGeneralAssetImageReducer]);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-full">
      <div className="col-span-3">
        <div className="flex flex-col h-full">
          {/**Start - Disposition Information **/}
          <div className="shadow-lg p-4 bg-white rounded">
            <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
              <FsxFormikInput label="Disposition No:" name={`dispositionNo`} type="text" disabled />
              <DispositionStatusesDropdown
                isFormik
                name={`dispositionStatusId`}
                label="Status:"
                disabled={isReadOnly}
                required
              />
              <FsxFormikInput
                label="Requesting Department:"
                name={`user?.department?.title`}
                value={`${user?.department?.title}` || ''}
                type="text"
                disabled
              />
              <FsxFormikDatePicker
                label="Report Date:"
                name={`requestDateTime`}
                format={FSXDateFormat.Default}
                disabled
              />
              <div className="col-span-2">
                <DispositionTypesDropdown isFormik name={`dispositionTypeId`} disabled={isReadOnly} required />
              </div>
              <div className="col-span-2">
                <UsersDropdown isFormik name={`requestedById`} label="Requested By:" disabled />
              </div>
            </div>
          </div>
          {/**End - Disposition Information **/}

          <div className="shadow-lg p-4 bg-white rounded mt-4 flex-1">
            {/**Start - Asset Information **/}
            <div className="uppercase mb-2">Asset Information</div>
            <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
              <FsxFormikInput
                label="Asset ID:"
                name={`generalAsset.assetRefId`}
                type="text"
                disabled
              />
              <div className="col-span-2">
                <AssetItemNameDropdown
                  isFormik
                  name={`generalAsset.assetItemNameId`}
                  assetGroupId={formik.values.generalAsset?.assetGroupId || 0}
                  disabled
                />
              </div>
              <AssetTypeDropdown
                isFormik
                label="Asset Type:"
                name={`generalAsset.assetTypeId`}
                assetCategoryId={AssetCategoryEnum.GeneralAsset}
                disabled
              />
              <FsxFormikInput
                label="Serial No.:"
                name={`generalAsset.serialNo`}
                type="text"
                disabled
              />
              <AssetManufacturerDropdown
                isFormik
                name={`generalAsset.assetManufacturerId`}
                assetTypeId={formik.values.generalAsset?.assetTypeId || 0}
                disabled
              />
              <AssetModelDropdown
                isFormik
                name={`generalAsset.assetModelId`}
                assetManufacturerId={formik.values.generalAsset?.assetManufacturerId || 0}
                disabled
              />
              <FsxFormikInput label="Series:" name={`generalAsset.series`} type="text" disabled />
              <AssetGroupDropdown isFormik name={`generalAsset.assetGroupId`} disabled />
              <AssetOwnershipTypeDropdown
                isFormik
                name={`generalAsset.assetOwnershipTypeId`}
                disabled
              />
              <FsxFormikDatePicker
                label="Report Date:"
                name={`generalAsset.dateRegistered`}
                format={FSXDateFormat.Default}
                disabled
              />
              <AssetColorDropdown isFormik name={`generalAsset.assetColorId`} disabled />
            </div>
            {/**End - Asset Information **/}

            {/**Start - Assigned Employee **/}
            <div className="uppercase mb-2">Assigned Employee</div>
            <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
              <FsxFormikInput
                label="Assigned Person:"
                name="generalAsset.generalAssetSecondaryDetail.assignedToName"
                type="text"
                disabled
              />
              <FsxFormikInput
                label="Assigned Department:"
                name="generalAsset.generalAssetSecondaryDetail.assignedToName"
                type="text"
                disabled
              />
              <FsxFormikInput
                label="Contact No:"
                name="generalAsset.generalAssetSecondaryDetail.contactNo"
                type="text"
                disabled
              />
              <FsxFormikInput
                label="Email Address:"
                name="generalAsset.generalAssetSecondaryDetail.emailAddress"
                type="text"
                disabled
              />
            </div>
            {/**End - Assigned Employee **/}
          </div>
        </div>
      </div>
      <div className="col-auto">
        <div className="flex flex-col h-full">
          {/**Start - Right image area **/}
          <div className="shadow-lg p-4 bg-white rounded">
            <Carousel images={carouselImages || []} />
          </div>
          {/**End - Right image area **/}

          {/**Start - Asset Value **/}
          <div className="shadow-lg p-4 bg-white rounded mt-4 flex-1">
            <div className="uppercase mb-2">Asset Value</div>
            <div className="grid sm:grod-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
              <div className="grid gap-1">
                <label>Total Purchase Cost</label>
                <CurrencyInput
                  label="Total Purchase Cost:"
                  name={`generalAsset.generalAssetPurchase.acquisitionAmount`}
                  value={AssetCategoryEnum.GeneralAsset || 0}
                  disabled
                />
              </div>
              <div className="grid gap-1">
                <label>Current Asset Value</label>
                <CurrencyInput name="" disabled />
              </div>
              <div className="grid gap-1">
                <label>Asset Age (in Months)</label>
                <FsxNumericTextBox name=" " disabled />
              </div>
              <div className="grid gap-1">
                <label>Asset Residual Value</label>
                <CurrencyInput name=" " disabled />
              </div>
            </div>
          </div>
          {/**End - Asset Value **/}
        </div>
      </div>

      {/*Start - Tab groups*/}
      <div className="col-span-4">
        <DispositionGeneralAssetTab isReadOnly={isReadOnly}/>
      </div>
      {/*End - Tab groups*/}
    </div>
  );
};

export default React.memo(DispositionGeneralAssetInformation);
