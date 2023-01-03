import FsxInput from '@app/components/common/FsxInput';
import {GeneralAsset} from '@app/entities/asset/inventory/GeneralAsset';
import React from 'react';
import {getGeneralAsset} from '@app/services/asset/assets.service';
import {useFormikContext} from 'formik';

interface InspectionGeneralAssetInfoPreviewFieldsProps {
  generalAsset?: GeneralAsset[];
}

const InspectionGeneralAssetInfoPreviewFields: React.VFC<InspectionGeneralAssetInfoPreviewFieldsProps> = props => {
  const [fieldsValue, setFieldsValue] = React.useState<GeneralAsset>();

  const {values} = useFormikContext<InspectionGeneralAsset>();

  React.useEffect(() => {
    (async () => {
      if (props.generalAsset)
        await getGeneralAsset(
          values.generalAssetId ? values.generalAssetId : 0,
          true,
        ).then(generalAsset => setFieldsValue(generalAsset.data));
    })();
  }, [props.generalAsset, values.generalAssetId]);

  return (
    <>
      <FsxInput label="Serial No.:" name="serialNumber" readOnly value={fieldsValue?.serialNo} />
      <FsxInput label="Asset Category:" name="assetCategory" readOnly value="Vehicle" />
      <FsxInput
        label="Equipment Type:"
        name="equipmentType"
        readOnly
        value={fieldsValue?.assetType?.title}
      />
      <FsxInput
        label="Asset Group"
        name="assetGroup"
        readOnly
        value={fieldsValue?.assetGroup?.title}
      />
      <FsxInput
        label="Manufacturer:"
        name="manufacturer"
        readOnly
        value={fieldsValue?.assetManufacturer?.title}
      />
      <FsxInput label="Model:" name="model" readOnly value={fieldsValue?.assetModel?.title} />
      <FsxInput label="Series" name="series" readOnly value={fieldsValue?.series?.title} />
      <FsxInput
        label="Ownership Type:"
        name="ownershipType"
        readOnly
              value={fieldsValue?.assetOwnershipType?.title}
      />
    </>
  );
};

export default InspectionGeneralAssetInfoPreviewFields;
