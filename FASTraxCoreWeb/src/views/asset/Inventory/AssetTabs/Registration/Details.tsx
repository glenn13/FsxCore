import {FsxDrawer} from '../../../../../components/common';
import {FsxFormikDatePicker, FsxFormikInput} from '@app/components/common/FsxFormik';
import {
  addRegistrationDetail,
  removeRegistrationDetail,
  updateRegistrationDetail,
} from '@app/store/asset/inventory/registrationDetails.reducers';
import {useDispatch, useSelector} from 'react-redux';

import EntityRegistrationDetail from '@app/entities/asset/inventory/EntityRegistrationDetail';
import FsxTable from '../../../../../components/common/FsxTable';
import FsxTableActions from '../../../../../components/common/FsxTable/Actions';
import {GridColumn} from '../../../../../helpers/types';
import React, {useRef} from 'react';
import RegistrationDetail from '@app/entities/asset/inventory/RegistrationDetail';
import {RootState} from '../../../../../store/rootReducer';
import {emptyIRegistrationDetail} from '@app/store/asset/inventory/registrationDetails.reducers';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';

export interface RegistrationDetailsProps {}

const columns: GridColumn[] = [
  {field: 'registrationDetail.referenceNo', title: 'Reference No'},
  {field: 'registrationDetail.registeredTo', title: 'Registered To'},
  {field: 'registrationDetail.licensePlateNo', title: 'License Plate No.'},
  {field: 'registrationDetail.placeOfRegistration', title: 'Place of Registration'},
  {
    field: 'registrationDetail.registrationDate',
    title: 'Registration Date',
    format: '{0:dd-MMM-yyyy}',
  },
  {field: 'registrationDetail.expiryDate', title: 'Expiry Date', format: '{0:dd-MMM-yyyy}'},
];

const RegistrationDetails: React.FC<RegistrationDetailsProps> = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<EntityRegistrationDetail>();
  const iRegistrationDetails = useSelector((state: RootState) => state.iRegistrationDetails);
  const ids = React.useMemo(() => iRegistrationDetails.map(ird => ird.id), [iRegistrationDetails]);
  const [iRegistration, setIRegistration] = React.useState<EntityRegistrationDetail>(
    emptyIRegistrationDetail(),
  );
  const {
    referenceNo,
    registeredTo,
    licensePlateNo,
    placeOfRegistration,
    registrationDate,
    expiryDate,
  } = iRegistration.registrationDetail;

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleSubmit = () => {
    const action =
      ids.indexOf(iRegistration.id) === -1 ? addRegistrationDetail : updateRegistrationDetail;

    dispatch(action(iRegistration));

    setIsOpen(false);
  };

  const handleAdd = () => {
    setIRegistration(emptyIRegistrationDetail(ids));
    setIsOpen(true);
  };

  const handleEdit = () => {
    if (!selected) return;

    setIRegistration(selected);
    setIsOpen(true);
  };

  const handleDelete = () => {
    if (!selected) return;

    dispatch(removeRegistrationDetail(selected.id));
    setSelected(undefined);
  };

  const handleClose = () => {
    setIRegistration(emptyIRegistrationDetail(ids));
    setIsOpen(false);
  };

  const handleInputChange = (val: string | Date | null, key: keyof RegistrationDetail) => {
    setIRegistration({
      ...iRegistration,
      registrationDetail: {...iRegistration.registrationDetail, [key]: val},
    });
  };

  React.useEffect(() => {
    setIRegistration(emptyIRegistrationDetail(ids));
  }, [iRegistrationDetails, ids]);

  return (
    <div className="flex flex-1 flex-col py-2 mt-5 px-8">
      <FsxDrawer
        title="Registration Details"
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}>
        <div className="flex flex-1 flex-col w-full py-4 px-8">
          <FsxFormikInput
            name="referenceNo"
            onChange={e => handleInputChange(e.value, 'referenceNo')}
            value={referenceNo}
            label="Reference No"
          />
          <FsxFormikInput
            name="registeredTo"
            onChange={e => handleInputChange(e.value, 'registeredTo')}
            label="Registered To"
            value={registeredTo}
          />
          <FsxFormikInput
            name="licensePlateNo"
            onChange={e => handleInputChange(e.value, 'licensePlateNo')}
            label="License Plate No"
            value={licensePlateNo}
          />
          <FsxFormikInput
            name="placeOfRegistration"
            onChange={e => handleInputChange(e.value, 'placeOfRegistration')}
            label="Place of Registration"
            value={placeOfRegistration}
          />
          <FsxFormikDatePicker
            name="registrationDate"
            onChange={event => handleInputChange(event.value, 'registrationDate')}
            label="Registration Date"
            value={registrationDate}
            className="mb-3"
          />
          <FsxFormikDatePicker
            name="expiryDate"
            onChange={event => handleInputChange(event.value, 'expiryDate')}
            label="Expiry Date"
            value={expiryDate}
            className="mb-3"
          />
        </div>
      </FsxDrawer>
      <FsxExcelExport
        fileName={`Inventory_RegistrationDetais_${moment().format('YYYYMMDDHHmm')}`}
        data={iRegistrationDetails}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={iRegistrationDetails}
          columns={columns}
          onRowClick={e => setSelected(e.dataItem)}>
          <FsxTableActions onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} onExport={exportToExcel} />
        </FsxTable>
      </FsxExcelExport>
    </div>
  );
};

export default React.memo(RegistrationDetails);
