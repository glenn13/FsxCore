import {FsxDrawer} from '../../../../../components/common';
import {FsxFormikInput as FsxInput, FsxFormikDatePicker} from '@app/components/common/FsxFormik';
import {
  addWarrantyDetails,
  removeWarrantyDetails,
  updateWarrantyDetails,
} from '@app/store/asset/inventory/warrantyDetails.reducers';
import {useDispatch, useSelector} from 'react-redux';

import EntityWarrantyDetail from '@app/entities/asset/inventory/EntityWarrantyDetail';
import FsxTable from '../../../../../components/common/FsxTable';
import FsxTableActions from '../../../../../components/common/FsxTable/Actions';
import {GridColumn} from '../../../../../helpers/types';
import React, {useRef} from 'react';
import {RootState} from '../../../../../store/rootReducer';
import WarrantyDetail from '@app/entities/asset/inventory/WarrantyDetail';
import {emptyIWarrantyDetail} from '../../../../../store/asset/inventory/warrantyDetails.reducers';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';

export interface WarrantyDetailsProps {}

const columns: GridColumn[] = [
  {field: 'warrantyDetail.referenceNo', title: 'Reference No'},
  {field: 'warrantyDetail.registeredTo', title: 'Registered To'},
  {field: 'warrantyDetail.warrantyProvider', title: 'Warranty Provider'},
  {field: 'warrantyDetail.startDate', title: 'Start Date', format: '{0:dd-MMM-yyyy}'},
  {field: 'warrantyDetail.expiryDate', title: 'Expiry Date', format: '{0:dd-MMM-yyyy}'},
];

const WarrantyDetails: React.FC<WarrantyDetailsProps> = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<EntityWarrantyDetail>();
  const iWarrantyDetails = useSelector((state: RootState) => state.iWarrantyDetails);
  const ids = React.useMemo(() => iWarrantyDetails.map(wd => wd.id), [iWarrantyDetails]);
  const [iWarranty, setIWarranty] = React.useState<EntityWarrantyDetail>(emptyIWarrantyDetail());
  const {
    id,
    warrantyDetail: {referenceNo, registeredTo, startDate, expiryDate, warrantyProvider},
  } = iWarranty;

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleSubmit = () => {
    const action = ids.indexOf(id) === -1 ? addWarrantyDetails : updateWarrantyDetails;

    dispatch(action(iWarranty));

    setIsOpen(false);
  };

  const handleAdd = () => {
    setIWarranty(emptyIWarrantyDetail(ids));
    setIsOpen(true);
  };

  const handleEdit = () => {
    if (!selected) return;

    setIWarranty(selected);
    setIsOpen(true);
  };

  const handleDelete = () => {
    if (!selected) return;

    dispatch(removeWarrantyDetails(selected.id));
    setSelected(undefined);
  };

  const handleClose = () => {
    setIWarranty(emptyIWarrantyDetail(ids));
    setIsOpen(false);
  };

  const handleInputChange = (val: string | Date | null, key: keyof WarrantyDetail) => {
    setIWarranty({
      ...iWarranty,
      warrantyDetail: {...iWarranty.warrantyDetail, [key]: val},
    });
  };

  React.useEffect(() => {
    setIWarranty(emptyIWarrantyDetail(ids));
  }, [iWarrantyDetails, ids]);

  return (
    <div className="flex flex-1 flex-col py-2 mt-5 px-8">
      <FsxDrawer
        title="Warranty Details"
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}>
        <div className="flex flex-1 flex-col w-full py-4 px-8">
          <FsxInput
            name="referenceNo"
            onChange={e => handleInputChange(e.value, 'referenceNo')}
            value={referenceNo}
            label="Reference No"
          />
          <FsxInput
            name="registeredTo"
            onChange={e => handleInputChange(e.value, 'registeredTo')}
            label="Registered To"
            value={registeredTo}
          />
          <FsxFormikDatePicker
            name="startDate"
            onChange={val => handleInputChange(val.value, 'startDate')}
            label="Start Date"
            value={startDate}
            className="mb-3"
          />
          <FsxFormikDatePicker
            name="expiryDate"
            onChange={val => handleInputChange(val.value, 'expiryDate')}
            label="Expiry Date"
            value={expiryDate}
            className="mb-3"
          />
          <FsxInput
            name="warrantyProvider"
            onChange={e => handleInputChange(e.value, 'warrantyProvider')}
            label="Warranty Provider"
            value={warrantyProvider}
            className="mb-3"
          />
        </div>
      </FsxDrawer>
      <FsxExcelExport
        fileName={`Inventory_WarrantyDetails_${moment().format('YYYYMMDDHHmm')}`}
        data={iWarrantyDetails}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={iWarrantyDetails}
          columns={columns}
          onRowClick={e => setSelected(e.dataItem)}>
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

export default React.memo(WarrantyDetails);
