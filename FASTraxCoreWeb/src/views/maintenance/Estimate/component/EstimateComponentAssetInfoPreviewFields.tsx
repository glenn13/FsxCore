import { FsxInput } from '@app/components/common';
import React from 'react';
import { Component } from '@app/entities/asset/inventory/Component';
import { getComponent } from '@app/services/asset/inventory/components.service';
import { useFormikContext } from 'formik';
import EstimateComponent from '@app/entities/maintenance/estimate/EstimateComponent';

interface EstimateComponentAssetInfoPreviewFieldsProps {
    components?: Component[];
}

const EstimateComponentAssetInfoPreviewFields = (
    props: EstimateComponentAssetInfoPreviewFieldsProps,
) => {
    const [fieldsValue, setFieldsValue] = React.useState<Component>();

    const { values } = useFormikContext<EstimateComponent>();

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
            <FsxInput label="VIN:" name="vin" disabled value={fieldsValue?.serialNo} />
            <FsxInput
                label="Ownership Type:"
                name="ownershipType"
                disabled
                value={fieldsValue?.assetOwnershipType?.title}
            />
            <FsxInput
                label="Manufacturer:"
                name="manufacturer"
                disabled
                value={fieldsValue?.assetManufacturer?.title}
            />
            <FsxInput label="Model:" name="model" disabled value={fieldsValue?.assetModel?.title} />
            <FsxInput label="Series" name="series" disabled value={fieldsValue?.series?.title} />
        </>
    );
};

export default EstimateComponentAssetInfoPreviewFields;
