import { FsxInput } from '@app/components/common';
import React from 'react';
import { getGeneralAsset } from '@app/services/asset/assets.service';
import { useFormikContext } from 'formik';
import WorkOrderGeneralAsset from '@app/entities/maintenance/workorder/WorkOrderGeneralAsset';
import { GeneralAsset } from '@app/entities/asset/inventory/GeneralAsset';

interface WorkOrderGeneralAssetAssetInfoPreviewFieldsProps {
    generalassets?: GeneralAsset[];
}

const WorkOrderGeneralAssetAssetInfoPreviewFields = (
    props: WorkOrderGeneralAssetAssetInfoPreviewFieldsProps,
) => {
    const [fieldsValue, setFieldsValue] = React.useState<GeneralAsset>();

    const { values } = useFormikContext<WorkOrderGeneralAsset>();

    React.useEffect(() => {
        (async () => {
            if (props.generalassets)
                await getGeneralAsset(values.generalAssetId ? values.generalAssetId : 0, true).then(component =>
                    setFieldsValue(component.data),
                );
        })();
    }, [props.generalassets, values.generalAssetId]);

    return (
        <>
            <FsxInput label="Serial No. :" name="serialno" disabled value={fieldsValue?.serialNo} />
            <FsxInput label="Asset Category :" name="assetCategory" disabled value='General Asset' />
            <FsxInput label="Equipment Type :" name="assetType" disabled value={fieldsValue?.assetType?.title} />
            <FsxInput label="Asset Group :" name="assetGroup" disabled value={fieldsValue?.assetGroup?.title} />
            <FsxInput label="Manufacturer :" name="manufacturer" disabled value={fieldsValue?.assetManufacturer?.title} />
            <FsxInput label="Model :" name="model" disabled value={fieldsValue?.assetModel?.title} />
            <FsxInput label="Series :" name="series" disabled value={fieldsValue?.series?.title} />
            <FsxInput label="Ownership Type :" name="ownershipType" disabled value={fieldsValue?.assetOwnershipType?.title} />
        </>
    );
};

export default WorkOrderGeneralAssetAssetInfoPreviewFields;
