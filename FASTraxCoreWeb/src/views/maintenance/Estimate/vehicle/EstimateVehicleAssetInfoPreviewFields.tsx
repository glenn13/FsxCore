import { FsxInput } from '@app/components/common';
import React from 'react';
import { Vehicle } from '@app/entities/asset/inventory/Vehicle';
import { getVehicle } from '@app/services/asset/vehicles.service';
import { useFormikContext } from 'formik';
import EstimateVehicle from '@app/entities/maintenance/estimate/EstimateVehicle';

interface EstimateVehicleAssetInfoPreviewFieldsProps {
    vehicles?: Vehicle[];
}

const EstimateVehicleAssetInfoPreviewFields = (
    props: EstimateVehicleAssetInfoPreviewFieldsProps,
) => {
    const [fieldsValue, setFieldsValue] = React.useState<Vehicle>();

    const { values } = useFormikContext<EstimateVehicle>();

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

export default EstimateVehicleAssetInfoPreviewFields;
