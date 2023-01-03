import {Component} from '@app/entities/asset/inventory/Component';
import FsxInput from '@app/components/common/FsxInput';
import React from 'react';
import {getComponent} from '@app/services/asset/inventory/components.service';
import {useFormikContext} from 'formik';

interface InspectionComponentAssetInfoPreviewFields {
  components?: Component[];
}
const InspectionComponentAssetInfoPreviewFields: React.VFC<InspectionComponentAssetInfoPreviewFields> = props => {
  const [fieldsValue, setFieldsValue] = React.useState<Component>();
  const {values} = useFormikContext<InspectionComponent>();

  React.useEffect(() => {
    (async () => {
      if (props.components)
        await getComponent(values.componentId ? values.componentId : 0, true).then(component =>
          setFieldsValue(component.data),
        );
    })();
  }, [props.components, values.componentId]);

  return (
    <>
      <FsxInput label="Serial No.:" name="serialNumber" readOnly value={fieldsValue?.serialNo} />
      <FsxInput label="Asset Category:" name="assetCategory" readOnly value="Component" />
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

export default InspectionComponentAssetInfoPreviewFields;
