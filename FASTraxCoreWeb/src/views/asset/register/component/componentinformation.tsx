import React, {useState} from 'react';

import AssetCategoryDropdown from '@app/views/asset/common/Dropdowns/AssetCategory';
import AssetColorDropdown from '@app/views/asset/common/Dropdowns/AssetColor';
import AssetDepartmentDropdown from '@app/views/asset/common/Dropdowns/AssetDepartment';
import AssetHeader from '@app/components/common/AssetHeader';
import AssetManufacturerDropdown from '@app/views/asset/common/Dropdowns/AssetManufacturer';
import AssetModelDropdown from '@app/views/asset/common/Dropdowns/AssetModel';
import AssetOwnershipTypeDropdown from '@app/views/asset/common/Dropdowns/AssetOwnershipType';
import AssetStatusDropdown from '@app/views/asset/common/Dropdowns/AssetStatus';
import AssetTypeDropdown from '@app/views/asset/common/Dropdowns/AssetType';
import {Carousel} from '@app/components/common';
import ComponentTab from './componenttab';
import PersonnelDropdown from '@app/views/hr/common/Dropdowns/Personnel';
import {FSXDateFormat} from '@app/helpers/global/enum';
import {FileAttachment} from '@app/helpers/files';
import FsxFormikDatePicker from '@app/components/common/FsxFormik/FsxFormikDatePicker';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';
import {GetURIAssetPageForNew} from '@app/services/asset/register/register.service';
import MaintenanceStatusDropdown from '@app/views/maintenance/common/Dropdowns/MaintenanceStatus';
import {RootState} from '@app/store/rootReducer';
import {useFormikContext} from 'formik';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import FsxQRCode from '@app/components/common/FsxQRCode';
import moment from 'moment';
import { format } from 'react-string-format';
import { find } from 'lodash';
import { useAssetManufacturers } from '@app/services/asset/standardentries/assetManufacturer.service';
import { useAssetModels } from '@app/services/asset/standardentries/assetModel.service';

export interface ComponentInformationProps {
  isEdit: boolean;
  isReadOnly: boolean;
}

const ComponentInformation: React.FC<ComponentInformationProps> = ({isEdit, isReadOnly}) => {
  const history = useHistory();
  const formik = useFormikContext<Component>();

  const componentImageAttachmentReducer = useSelector(
    (state: RootState) => state.componentImageAttachmentReducer,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAssetStatusEnabled, setIsAssetStatusEnabled] = useState(() => !isEdit || !isReadOnly);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMaintenanceStatusEnabled, setIsMaintenanceStatusEnabled] = useState(() => !isEdit || !isReadOnly);

  const [carouselImages, setCarouselImages] = React.useState<FileAttachment[]>();

  const changeAssetPageOnSelection = (e: AssetCategory) => {
    let _uri = GetURIAssetPageForNew(e);
    if (_uri !== '') {
      history.push(_uri);
    }
  };

  const [qrCodeVal, setQrCodeVal] = useState("");

  const [assetManufacturerTitle, setManufacturerTitle] = useState("");

  const [assetModelTitle, setModelTitle] = useState("");

  const [assetModelYear, setModelYear] = useState("");

  const [acquisitionDate, setAcquisitionDate] = useState("");

  const [lastServiceDate, setLastServiceDate] = useState("");

  const [nextServiceDate, setNextServiceDate] = useState("");

  const {data: manufacturersQuery} = useAssetManufacturers();

  const {data: modelsQuery} = useAssetModels();

  React.useEffect(() => {
    if (componentImageAttachmentReducer.current !== undefined) {
      if (componentImageAttachmentReducer.current.length > 0) {
        const _carouselImages: FileAttachment[] = componentImageAttachmentReducer.current.map(x => {
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
  }, [componentImageAttachmentReducer]); 
  
  React.useEffect(()=> {
    if(manufacturersQuery?.data) {
      const manufacturer = find(manufacturersQuery.data, (manufacturer) =>  manufacturer.id === formik.values.assetManufacturerId &&
                                                                            manufacturer.assetTypeId === formik.values.assetTypeId)
      if(manufacturer && manufacturer.title) setManufacturerTitle(manufacturer.title) ; setModelTitle("");
    } 
    },[manufacturersQuery?.data, formik.values.assetTypeId, formik.values.assetManufacturerId]
  );
  
  React.useEffect(()=> {
    if(modelsQuery?.data) {
      const model = find(modelsQuery.data, (model) => model.id === formik.values.assetModelId && 
                                                      model.assetManufacturerId === formik.values.assetManufacturerId)
      if(model && model.title) setModelTitle(model.title)
    }
    },[modelsQuery?.data, formik.values.assetManufacturerId, formik.values.assetModelId]
  );

  React.useEffect(() => {
    var date = formik.values.assetModelYear;

    if (date === undefined || date === null)  
      setModelYear("");
    else 
      setModelYear(moment(formik.values.assetModelYear).format("yyyy"));
    },[formik.values.assetModelYear]
  );

  React.useEffect(() => {
    var date = formik.values.componentPurchase?.acquisitionDate;

    if (date === undefined || date === null)  
      setAcquisitionDate("");
    else 
    setAcquisitionDate(moment(formik.values.componentPurchase?.acquisitionDate).format("DD-MMM-yyyy"));
    },[formik.values.componentPurchase?.acquisitionDate]
  );

  React.useEffect(() => {
    var date = formik.values.lastServiceDate;

    if (date === undefined || date === null)  
      setLastServiceDate("");
    else 
      setLastServiceDate(moment(formik.values.lastServiceDate).format("DD-MMM-yyyy"));
    },[formik.values.lastServiceDate]
  );
  
  React.useEffect(() => {
    var date = formik.values.nextServiceDate;
    
    if (date === undefined || date === null)
      setNextServiceDate("");
    else
      setNextServiceDate(moment(formik.values.nextServiceDate).format("DD-MMM-yyyy"));
    },[formik.values.nextServiceDate]
  );

  React.useEffect(() => {
    var qrVal = format('Serial No.: {0} | Manufacturer: {1} | Model: {2} | Model Year: {3} | ' +
                  'Acquisition Date: {4} | Last Service Date: {5} | Next Service Date: {6}');

    qrVal = format(qrVal, formik.values.serialNo, assetManufacturerTitle, assetModelTitle, assetModelYear, acquisitionDate, 
                          lastServiceDate, nextServiceDate);

    setQrCodeVal(qrVal);

    }, [formik.values.serialNo, assetManufacturerTitle, assetModelTitle, assetModelYear, acquisitionDate, lastServiceDate, nextServiceDate]
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-white rounded shadow-lg">
        <div className="grid min-h-full gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {/**Start - Left group of fields**/}
          <div className="col-span-3">
            <div className="flex flex-col h-full">
              {(isEdit || isReadOnly) && (
                <div className="flex mb-4 col-span-full">
                  <AssetHeader label="Asset ID">{formik.values.assetRefId}</AssetHeader>
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                <div className="col-span-2">
                  <AssetCategoryDropdown
                    isFormik
                    disabled={isEdit || isReadOnly}
                    onChange={e => {
                      changeAssetPageOnSelection(e.value);
                    }}
                  />
                </div>
                <div className="col-span-2">
                  {(!isEdit && !isReadOnly) && (
                    <FsxFormikInput label="Asset ID:" name="assetRefId" type="text" disabled />
                  )}
                </div>

                <div className="col-span-2">
                  <FsxFormikInput label="Asset Name:" name="assetName" type="text" disabled={isReadOnly} required />
                </div>
                <FsxFormikInput label="Serial No.:" name="serialNo" type="text" disabled={isReadOnly} required />
                <FsxFormikInput
                  label="Asset Group:"
                  name="assetGroup"
                  type="text"
                  value="Component"
                  disabled={true}
                />
                
                <AssetTypeDropdown
                  isFormik
                  label="Asset Type:"
                  name={`assetTypeId`}
                  assetCategoryId={formik.values.assetCategoryId}
                  onChange={e => setManufacturerTitle("")}
                  disabled={isReadOnly}
                  required
                />
                <AssetManufacturerDropdown
                  isFormik
                  assetTypeId={formik.values.assetTypeId}
                  disabled={isReadOnly}
                  required
                />
                <AssetModelDropdown
                  isFormik
                  assetManufacturerId={formik.values.assetManufacturerId}
                  disabled={isReadOnly}
                  required
                />
                <AssetStatusDropdown isFormik disabled={isAssetStatusEnabled} required />
                
                <AssetOwnershipTypeDropdown disabled={isReadOnly} isFormik required />
                <AssetDepartmentDropdown disabled={isReadOnly} isFormik label="Assigned Department:" required />
                <FsxFormikDatePicker
                  name={`assetModelYear`}
                  label="Model Year:"
                  defaultView={{enabled: true, view: 'decade'}}
                  format={'yyyy'}
                  max={new Date()}
                  disabled={isReadOnly}
                  required
                />
                <AssetDepartmentDropdown isFormik label="Assigned Department:" required />
                <PersonnelDropdown
                  isFormik
                  name={`assignedToId`}
                  label="Assigned Person:"
                  required
                />

                <div className="col-span-2">                    
                  <FsxFormikInput label="Series:" name="series" type="text" disabled={isReadOnly}/>
                </div>
                <FsxFormikDatePicker
                  label="Last Service Date:"
                  name={`lastServiceDate`}
                  format={FSXDateFormat.Default}
                  disabled
                />
                <FsxFormikDatePicker
                  label="Next Service Date:"
                  name={`nextServiceDate`}
                  format={FSXDateFormat.Default}
                  disabled
                />
                
                <div className="col-span-3">
                  <FsxFormikInput label="Asset Description:" name="description" type="text" disabled={isReadOnly}/>
                </div>
                <AssetColorDropdown disabled={isReadOnly} isFormik required />
              </div>
            </div>
          </div>
          {/**End - Left group of fields**/}

          {/**Start - Right image area **/}
          <div className="col-auto">
            <Carousel images={carouselImages || []} />
            
            {/* QR Code */}
            <div className="col-span-2 mt-3 text-center">
              <FsxQRCode value={qrCodeVal} />
            </div>
          </div>
          {/**End - Right image area **/}
        </div>
      </div>

      <div className="w-full mb-8" />

      <div className="flex flex-col h-full">
        <ComponentTab isEdit={isEdit} isReadOnly={isReadOnly}/>
      </div>
    </div>
  );
};

export default React.memo(ComponentInformation);
