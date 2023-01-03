import FsxInput from '@app/components/common/FsxInput';
import React from 'react';
import {Vehicle} from '@app/entities/asset/inventory/Vehicle';
import {getVehicle} from '@app/services/asset/vehicles.service';
import {useFormikContext} from 'formik';

interface InspectionVehicleAssetInfoPreviewFieldsProps {
  vehicles?: Vehicle[];
}

const InspectionVehicleAssetInfoPreviewFields = (
  props: InspectionVehicleAssetInfoPreviewFieldsProps,
) => {
  const [fieldsValue, setFieldsValue] = React.useState<Vehicle>();

  const {values} = useFormikContext<InspectionVehicle>();

  React.useEffect(() => {
    (async () => {
      if (props.vehicles)
        await getVehicle(values.vehicleId ? values.vehicleId : 0, true).then(vehicle =>
          setFieldsValue(vehicle.data),
        );
    })();
  }, [props.vehicles, values.vehicleId]);

  return (
    <>
      <FsxInput label="VIN:" name="vin" readOnly value={fieldsValue?.serialNo} />
      <FsxInput label="Asset Category:" name="assetCategory" readOnly value="Vehicle" />
      <FsxInput
        label="Equipment Type:"
        name="equipmentType"
        value={fieldsValue?.assetType?.title}
        readOnly
      />
      <FsxInput
        label="Asset Group"
        name="assetGroup"
        value={fieldsValue?.assetGroup?.title}
        readOnly
      />
      <FsxInput
        label="Manufacturer:"
        name="manufacturer"
        value={fieldsValue?.assetManufacturer?.title}
        readOnly
      />
      <FsxInput label="Model:" name="model" readOnly value={fieldsValue?.assetModel?.title} />
      <FsxInput label="Series" name="series" readOnly value={fieldsValue?.series?.title} />
      <FsxInput
        label="Ownership Type:"
        name="ownershipType"
              value={fieldsValue?.assetOwnershipType?.title}
        readOnly
      />
    </>
  );
};

export default InspectionVehicleAssetInfoPreviewFields;
