import React from 'react';
import {FsxFormikDropDownList} from '@app/components/common/FsxFormik';
import FsxDropdown, {FsxDropdownProps} from '@app/components/common/Dropdown';
import {StoreDispatch} from '@app/store/rootReducer';
import {useDispatch} from 'react-redux';

import { AssetCategoryEnum } from '@app/helpers/asset/enum';
import { submitVehicleAssetLinked } from '@app/store/asset/register/vehicle.actions';
import { useAssetToLinked } from '@app/services/asset/register/vehicle.service';
import { trackPromise } from 'react-promise-tracker';

export type AssetToLinkedDropdownProps = FsxDropdownProps & {
    isFormik?: boolean;
    assetCategoryId: number;
    assetLinked?: AssetLinked;
};



const AssetToLinkedDropdown: React.FC<AssetToLinkedDropdownProps> = ({
  name,
  label,
  isFormik,
  textField,
  assetCategoryId,
  assetLinked,
  ...rest
}) => {
    const dispatch: StoreDispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const _defaultProps = {...rest,
        name: name || 'linkedGeneralAssetId',
        label: label || 'Asset ID :',
        dataItemKey: 'linkedGeneralAssetId',
        textField: 'assetRefId',
        data: [],
        }

    const [props, setProps] = React.useState<any>(_defaultProps);

    let _nameDataKey: string;
        _nameDataKey = '';

    React.useEffect(() => {
        const fetchAssetLink = async () => {
            let _assetLinkedData: VehicleLinkedAsset[] = [];
            if(assetLinked !== undefined) {
                setIsLoading(true);
                switch(assetLinked?.assetCategoryId || 0) {
                    case AssetCategoryEnum.Vehicle:
                        _nameDataKey = 'linkedVehicleId';
                        break;
                    default:
                        _nameDataKey = 'linkedGeneralAssetId';
                        break;
                }
                await dispatch(submitVehicleAssetLinked(assetLinked))
                    .then(response => {_assetLinkedData = response.data; })
                    .catch((e) => {console.log(e)})
                    .finally(() => {
                        setProps({ ...rest,
                            name: _nameDataKey,
                            label: label || 'Asset ID :',
                            dataItemKey: _nameDataKey,
                            textField: 'assetRefId',
                            data: _assetLinkedData,});
                    });
            } else {
                setProps({ ...rest,
                name: name || 'linkedGeneralAssetId',
                label: label || 'Asset ID :',
                dataItemKey: 'linkedGeneralAssetId',
                textField: 'assetRefId',
                data: _assetLinkedData,});
            }
        };

        trackPromise(fetchAssetLink()).then(() => {setIsLoading(false);});

    },[assetCategoryId]);

    if (isFormik) return <FsxFormikDropDownList loading={isLoading} {...props}  />;

    return <FsxDropdown {...props} />;
};

export default React.memo(AssetToLinkedDropdown);
