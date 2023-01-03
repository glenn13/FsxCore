import { FsxInput } from '@app/components/common';
import React from 'react';
import { getVehicle } from '@app/services/asset/vehicles.service';
import { useFormikContext } from 'formik';
import WorkOrderVehicle from '@app/entities/maintenance/workorder/WorkOrderVehicle';
import { Vehicle } from '@app/entities/asset/inventory/Vehicle';

interface WorkOrderVehicleAssetInfoPreviewFieldsProps {
    vehicles?: Vehicle[];
}

const WorkOrderVehicleAssetInfoPreviewFields = (
    props: WorkOrderVehicleAssetInfoPreviewFieldsProps,
) => {
    const [fieldsValue, setFieldsValue] = React.useState<Vehicle>();

    const { values } = useFormikContext<WorkOrderVehicle>();

    React.useEffect(() => {
        (async () => {
            if (props.vehicles)
                await getVehicle(values.vehicleId ? values.vehicleId : 0, true).then(component =>
                    setFieldsValue(component.data),
                );
        })();
    }, [props.vehicles, values.vehicleId]);

    return (
        <>
            <FsxInput label="Serial No. :" name="serialno" disabled value={fieldsValue?.serialNo} />
            <FsxInput label="Asset Category :" name="assetCategory" disabled value='Vehicle' />
            <FsxInput label="Equipment Type :" name="assetType" disabled value={fieldsValue?.assetType?.title} />
            <FsxInput label="Asset Group :" name="assetGroup" disabled value={fieldsValue?.assetGroup?.title} />
            <FsxInput label="Manufacturer :" name="manufacturer" disabled value={fieldsValue?.assetManufacturer?.title} />
            <FsxInput label="Model :" name="model" disabled value={fieldsValue?.assetModel?.title} />
            <FsxInput label="Series :" name="series" disabled value={fieldsValue?.series?.title} />
            <FsxInput label="Ownership Type :" name="ownershipType" disabled value={fieldsValue?.assetOwnershipType?.title} />
        </>
    );
};

export default WorkOrderVehicleAssetInfoPreviewFields;
