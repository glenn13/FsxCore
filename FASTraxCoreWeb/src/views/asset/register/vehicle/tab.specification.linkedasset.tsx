import React from 'react';
import _ from 'lodash'
import { RootState } from '@app/store/rootReducer';
import {Formik, FormikProps, useFormikContext} from 'formik';
import {useDispatch, useSelector} from 'react-redux';

import { FsxDrawer, FsxTable } from '@app/components/common';
import { GridColumn } from '@app/helpers/types';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import AssetCategoryDropdown from '@app/views/asset/common/Dropdowns/AssetCategory';
import AssetToLinkedDropdown from '@app/views/asset/common/Dropdowns/AssetToLinked';

import { generateNegativeNumber } from '@app/helpers/randoms';
import { AssetCategoryEnum } from '@app/helpers/asset/enum';
import { newVehicleLinkedAsset } from '@app/entities/asset/register/vehicle/vehicle.schema';
import { addVehicleLinkedAsset, removeVehicleLinkedAsset, updateVehicleLinkedAsset } from '@app/store/asset/register/vehiclelinkedasset.reducers';

export interface LinkedAssetProps {
    isReadOnly: boolean;
}

const columns: GridColumn[] = [
    {field: 'assetRefId', title: 'Asset ID'},
    {field: 'vinSerialNo', title: 'VIN / Serial No.'},
    {field: 'maintenanceStatus', title: 'Maintenance Status'},
    {field: 'hireStatus', title: 'Hire Status'},
    {field: 'processedBy', title: 'Processed By'},
    {field: 'dateLinked', title: 'Date Linked', type: 'date'},
];

const LinkedAsset: React.FC<LinkedAssetProps> = ({isReadOnly}) => {
    const dispatch = useDispatch();
    const formikVehicle = useFormikContext<Vehicle>();

    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<VehicleLinkedAsset>();

    const [currentTempId, setCurrentTempId]= React.useState<number>();
    const [currentId, setCurrentId]= React.useState<number>(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [assetCategoryId, setAssetCategoryId]= React.useState<number>(Number(AssetCategoryEnum.GeneralAsset));
    const [assetLinked, setAssetLinked]= React.useState<AssetLinked>();
    const [parentVehicleId, setParentVehicleId] = React.useState<number>(0);
    
    const vehicleLinkedAssetReducer = useSelector((state: RootState) => state.vehicleLinkedAssetReducer);

     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     const tempIds = React.useMemo(() => vehicleLinkedAssetReducer.current?.map(x => x.tempId), [vehicleLinkedAssetReducer.current]);
     const [vehicleLinkedAsset, setVehicleLinkedAsset] = React.useState<VehicleLinkedAsset>(newVehicleLinkedAsset(tempIds));
    
     const formikRef = React.useRef<FormikProps<VehicleLinkedAsset>>(null);

    const defaultAssetLinked : AssetLinked = ({
        assetCategoryId: Number(AssetCategoryEnum.GeneralAsset),
        excludeAssetIds: [0]
    });

    const handleAdd = () => {
        setCurrentTempId(generateNegativeNumber({flat: tempIds}));
        setExistingLinkedAsset(assetCategoryId,0);
        setCurrentId(0);
        setIsOpen(true);
    };

    const handleAssetCategoryOnChange = (value: AssetCategory) => {
        setExistingLinkedAsset(value.id,0);
    }

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleDelete = () => {
        if (!selected) return;
        dispatch(removeVehicleLinkedAsset(selected));
        setSelected(undefined);
    };

    const handleDrawerSubmit = () => {
        formikRef.current?.handleSubmit();
    };

    const handleEdit = () => {
        if (!selected) return;
        let _selectedLinkedAssetId: number = 0;

        switch (selected.assetCategoryId || 0) {
            case Number(AssetCategoryEnum.GeneralAsset):
                _selectedLinkedAssetId = selected?.linkedGeneralAssetId;
                
                break;
            case Number (AssetCategoryEnum.Vehicle):
                _selectedLinkedAssetId = selected?.linkedVehicleId;
                break;
        }
        
        setExistingLinkedAsset(selected.assetCategoryId,_selectedLinkedAssetId);
        setVehicleLinkedAsset(selected);
        setCurrentTempId(selected.tempId);
        setCurrentId(selected.id);
        setIsOpen(true);
 
    };

    const handleFormikSubmit = (value: VehicleLinkedAsset) => {
        const _indx = tempIds?.findIndex(x => x == currentTempId);

        if(_indx !== undefined) {
            const action = _indx  >= 0 ? updateVehicleLinkedAsset : addVehicleLinkedAsset;
            dispatch(action(value));
        }

        formikRef.current?.setFieldValue('assetCategoryId',Number(AssetCategoryEnum.GeneralAsset));
        setIsOpen(false);
    };

    const handleAssetLinkedOnChange = (value: VehicleLinkedAsset) => {
        
        if(currentTempId !== undefined ) {
            value.tempId = currentTempId;
            value.id = currentId || 0;
            value.dateLinked = new Date();
            setVehicleLinkedAsset(value);
        }
    };

    const setExistingLinkedAsset = (assetCategoryId: number, selectedAssetId: number) => {
        let _excludeIds: number[] = [];
        let _assetLinked: AssetLinked = {
            assetCategoryId: assetCategoryId,
            excludeAssetIds: [selectedAssetId]
        };

        if(vehicleLinkedAssetReducer.current !== undefined) {
            if(assetCategoryId !== undefined) {
                let _filterResult: VehicleLinkedAsset[];
                switch(assetCategoryId) {
                    case AssetCategoryEnum.GeneralAsset:
                         _filterResult = vehicleLinkedAssetReducer.current.filter( x => x.assetCategoryId == assetCategoryId && x.linkedGeneralAssetId !== selectedAssetId);
                         _excludeIds = _filterResult?.map(x => x.linkedGeneralAssetId);
                        break;
                    case AssetCategoryEnum.Vehicle:
                        _filterResult = vehicleLinkedAssetReducer.current.filter( x => x.assetCategoryId == assetCategoryId && x.linkedVehicleId !== selectedAssetId);
                        _excludeIds = _filterResult?.map(x => x.linkedVehicleId);
                        _excludeIds.push(parentVehicleId);
                        break;
                };
      
                _assetLinked.excludeAssetIds = _excludeIds;
    
                setAssetLinked(_assetLinked);
            }
        } 

        setAssetLinked(_assetLinked);
    }

    React.useEffect(() => {
        setParentVehicleId(formikVehicle.values.id);
    },[formikVehicle.values.id]);

    React.useEffect(() => {
        if(selected !== undefined) {
            setCurrentTempId(selected.tempId);
        }
    },[selected]);

    React.useEffect(() => {
        if(formikRef.current?.values !==  undefined) {
            setAssetCategoryId(formikRef.current.values.assetCategoryId);
        }
    },[vehicleLinkedAssetReducer.current]);

    return (
        <>
            <div className="p-2">
            <FsxDrawer
                title="Linked Asset"
                isOpen={isOpen}
                onClose={handleClose}
                unMountChildren={true}
                onSubmit={handleDrawerSubmit}
                isReadOnly={isReadOnly}>
            <div className="flex flex-1 flex-col w-full py-4 px-8">
                <Formik
                enableReinitialize={true}
                initialValues={vehicleLinkedAsset}
                validateOnChange={false}
                onSubmit={handleFormikSubmit}
                innerRef={formikRef}>
                <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-2">
                    <AssetCategoryDropdown isFormik disabled={isReadOnly} excludeId={Number(AssetCategoryEnum.Component)} onChange={(e) => handleAssetCategoryOnChange(e.value)} />
                    <AssetToLinkedDropdown isFormik 
                        assetCategoryId={assetLinked?.assetCategoryId || Number(AssetCategoryEnum.GeneralAsset)} 
                        assetLinked={assetLinked || defaultAssetLinked}
                        onChange={(e) => handleAssetLinkedOnChange(e.value)} 
                        disabled={isReadOnly}/>
                </div>
                </Formik>
            </div>
            </FsxDrawer>

            <FsxTable data={vehicleLinkedAssetReducer.current}
                      columns={columns}
                      onRowClick={e => setSelected(e.dataItem)}
                      onRowDoubleClick={handleEdit}>
                <FsxTableActions 
                    onAdd={handleAdd} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
                    isReadOnly={isReadOnly}/>
            </FsxTable>
            </div>  
        </> 
    );
};

export default React.memo(LinkedAsset);