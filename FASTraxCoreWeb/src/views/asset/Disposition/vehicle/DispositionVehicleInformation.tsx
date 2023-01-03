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
import DispositionVehicle from '@app/entities/asset/disposition/vehicle/DispositionVehicle';
import DispositionVehicleTab from './DispositionVehicleTab';
import AssetTypeDropdown from '@app/views/asset/common/Dropdowns/AssetType';
import AssetGroupDropdown from '@app/views/asset/common/Dropdowns/AssetGroup';
import {useHistory} from 'react-router-dom';
import UsersDropdown from '@app/views/catalog/common/Dropdowns/Users';
import {loadUser} from '@app/store/catalog/users/user.actions';
import {User} from '@app/entities/catalog';
import {AssetCategoryEnum} from '@app/helpers/asset/enum';

export interface DispositionVehicleInformationProps {
  isEdit: boolean;
  isReadOnly: boolean;
}

const DispositionVehicleInformation: React.FC<DispositionVehicleInformationProps> = ({isEdit,isReadOnly}) => {
  const history = useHistory();
  const formik = useFormikContext<DispositionVehicle>();

  const dispatch: StoreDispatch = useDispatch();
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    dispatch(loadUser(formik.values.requestedById)).then(user => setUser(user));
  }, [dispatch, formik.values.requestedById]);

  const dispositionVehicleImageReducer = useSelector(
    (state: RootState) => state.dispositionVehicleImageReducer,
  );

  const [carouselImages, setCarouselImages] = React.useState<FileAttachment[]>();

  React.useEffect(() => {
    if (dispositionVehicleImageReducer !== undefined) {
      if (dispositionVehicleImageReducer.length > 0) {
        const _carouselImages: FileAttachment[] = dispositionVehicleImageReducer.map(x => {
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
  }, [dispositionVehicleImageReducer]);

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
              <FsxFormikInput label="Asset ID:" name={`vehicle.assetRefId`} type="text" disabled />
              <AssetTypeDropdown
                isFormik
                label="Asset Type:"
                name={`vehicle.assetTypeId`}
                assetCategoryId={AssetCategoryEnum.Vehicle}
                disabled
              />
              <div className="col-span-2">
                <FsxFormikInput
                  label="Serial No.:"
                  name={`vehicle.serialNo`}
                  type="text"
                  disabled
                />
              </div>
              <AssetManufacturerDropdown
                isFormik
                name={`vehicle.assetManufacturerId`}
                assetTypeId={formik.values.vehicle?.assetTypeId || 0}
                disabled
              />
              <AssetModelDropdown
                isFormik
                name={`vehicle.assetModelId`}
                assetManufacturerId={formik.values.vehicle?.assetManufacturerId || 0}
                disabled
              />
              <div className="col-span-2">
                <FsxFormikInput label="Series:" name={`vehicle.series`} type="text" disabled />
              </div>
              <AssetGroupDropdown isFormik name={`vehicle.assetGroupId`} disabled />
              <AssetOwnershipTypeDropdown isFormik name={`vehicle.assetOwnershipTypeId`} disabled />
              <FsxFormikDatePicker
                label="Report Date:"
                name={`vehicle.dateRegistered`}
                format={FSXDateFormat.Default}
                disabled
              />
              <AssetColorDropdown isFormik name={`vehicle.assetColorId`} disabled />
            </div>
            {/**End - Asset Information **/}

            {/**Start - Assigned Employee **/}
            <div className="uppercase mb-2">Assigned Employee</div>
            <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
              <FsxFormikInput
                label="Assigned Person:"
                name="vehicle.vehicleSecondaryDetail.assignedToName"
                type="text"
                disabled
              />
              <FsxFormikInput
                label="Assigned Department:"
                name="vehicle.vehicleSecondaryDetail.assignedToName"
                type="text"
                disabled
              />
              <FsxFormikInput
                label="Contact No:"
                name="vehicle.vehicleSecondaryDetail.contactNo"
                type="text"
                disabled
              />
              <FsxFormikInput
                label="Email Address:"
                name="vehicle.vehicleSecondaryDetail.emailAddress"
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
                  name={`vehicle.vehiclePurchase.acquisitionAmount`}
                  value={formik.values.vehicle?.vehiclePurchase?.acquisitionAmount || 0}
                  disabled
                />
              </div>
              <div className="grid gap-1">
                <label>Current Asset Value</label>
                <CurrencyInput label="Current Asset Value" name=" " disabled />
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
        <DispositionVehicleTab isReadOnly={isReadOnly}/>
      </div>
      {/*End - Tab groups*/}
    </div>
  );
};

export default React.memo(DispositionVehicleInformation);
