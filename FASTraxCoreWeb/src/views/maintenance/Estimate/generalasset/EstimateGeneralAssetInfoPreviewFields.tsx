import { FsxInput } from '@app/components/common';
import React from 'react';
import { GeneralAsset } from '@app/entities/asset/inventory/GeneralAsset';
import { getGeneralAsset } from '@app/services/asset/assets.service';
import { useFormikContext } from 'formik';
import EstimateGeneralAsset from '@app/entities/maintenance/estimate/EstimateGeneralAsset';

interface EstimateGeneralAssetAssetInfoPreviewFieldsProps {
    generalasset?: GeneralAsset[];
}

const EstimateGeneralAssetAssetInfoPreviewFields = (
    props: EstimateGeneralAssetAssetInfoPreviewFieldsProps,
) => {
    const [fieldsValue, setFieldsValue] = React.useState<GeneralAsset>();

    const { values } = useFormikContext<EstimateGeneralAsset>();

    React.useEffect(() => {
        (async () => {
            if (props.generalasset)
                await getGeneralAsset(values.generalAssetId ? values.generalAssetId : 0, true).then(generalasset =>
                    setFieldsValue(generalasset.data),
                );
        })();
    }, [props.generalasset, values.generalAssetId]);

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

export default EstimateGeneralAssetAssetInfoPreviewFields;
