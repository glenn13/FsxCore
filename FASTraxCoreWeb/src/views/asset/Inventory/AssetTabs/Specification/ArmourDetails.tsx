import {FsxDrawer, FsxInput, FsxTable, FsxTextarea} from '../../../../../components/common';
import {
  addVehicleArmourDetail,
  removeVehicleArmourDetail,
  updateVehicleArmourDetail,
} from '@app/store/asset/inventory/vehicleArmourDetails.reducers';
import {useDispatch, useSelector} from 'react-redux';

import FsxTableActions from '../../../../../components/common/FsxTable/Actions';
import {GridColumn} from '../../../../../helpers/types';
import React, {useRef} from 'react';
import {RootState} from '../../../../../store/rootReducer';
import VehicleArmourDetail from '@app/entities/asset/inventory/VehicleArmourDetail';
import {emptyVehicleArmourDetail} from '../../../../../store/asset/inventory/vehicleArmourDetails.reducers';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';

export interface ArmourDetailsProps {}

const columns: GridColumn[] = [
  {field: 'companyName', title: 'Company Name'},
  {field: 'armouredArea', title: 'Armoured Area'},
  {field: 'description', title: 'Description'},
  {field: 'remarks', title: 'Remarks'},
];

const ArmourDetails: React.FC<ArmourDetailsProps> = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<VehicleArmourDetail>();
  const [armourDetail, setArmorDetail] = React.useState(emptyVehicleArmourDetail());
  const armourDetails = useSelector((state: RootState) => state.vehicleArmourDetails);
  const ids = React.useMemo(() => armourDetails.map(wd => wd.id), [armourDetails]);
  const {id, companyName, armouredArea, description, remarks} = armourDetail;

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleSubmit = () => {
    const action = ids.indexOf(id) === -1 ? addVehicleArmourDetail : updateVehicleArmourDetail;

    dispatch(action(armourDetail));

    setIsOpen(false);
  };

  const handleAdd = () => {
    setArmorDetail(emptyVehicleArmourDetail(ids));
    setIsOpen(true);
  };

  const handleEdit = () => {
    if (!selected) return;

    setArmorDetail(selected);
    setIsOpen(true);
  };

  const handleDelete = () => {
    if (!selected) return;

    dispatch(removeVehicleArmourDetail(selected.id));
    setSelected(undefined);
  };

  const handleClose = () => {
    setArmorDetail(emptyVehicleArmourDetail(ids));
    setIsOpen(false);
  };

  const handleInputChange = (val: string | Date, key: keyof VehicleArmourDetail) => {
    setArmorDetail({
      ...armourDetail,
      [key]: val,
    });
  };

  React.useEffect(() => {
    setArmorDetail(emptyVehicleArmourDetail(ids));
  }, [ids]);

  return (
    <div className="flex flex-1 flex-col py-2 mt-5 px-8">
      <h1 className="px-5">Armoured Asset?</h1>
      <FsxDrawer
        title="Armour Details"
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}>
        <div className="flex flex-1 flex-col w-full py-4 px-8">
          <FsxInput
            onChange={e => handleInputChange(e.value, 'companyName')}
            value={companyName}
            label="Armour Company Name"
          />
          <FsxInput
            onChange={e => handleInputChange(e.value, 'armouredArea')}
            label="Armoured Area"
            value={armouredArea}
          />
          <FsxTextarea
            onChange={e => handleInputChange(e.currentTarget.value, 'description')}
            label="Description"
            value={description}
          />
          <FsxTextarea
            onChange={e => handleInputChange(e.currentTarget.value, 'remarks')}
            label="Remarks"
            value={remarks}
          />
        </div>
      </FsxDrawer>
      <FsxExcelExport
        fileName={`Inventory_ArmourDetails_${moment().format('YYYYMMDDHHmm')}`}
        data={armourDetails}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable data={armourDetails} columns={columns} onRowClick={e => setSelected(e.dataItem)}>
          <FsxTableActions
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onExport={exportToExcel}
          />
        </FsxTable>
      </FsxExcelExport>
    </div>
  );
};

export default React.memo(ArmourDetails);
