import React, {useRef} from 'react';
import {Formik, FormikProps} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {FsxDrawer, FsxTable} from '@app/components/common';
import {GridColumn} from '@app/helpers/types';
import {RootState} from '@app/store/rootReducer';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import FsxFormikDatePicker from '@app/components/common/FsxFormik/FsxFormikDatePicker';
import FsxFormikNumericTextBox from '@app/components/common/FsxFormik/FsxFormikNumericTextBox';

import {
  addVehicleOdometerHistory,
  removeVehicleOdometerHistory,
  updateVehicleOdometerHistory,
} from '@app/store/asset/register/vehicleodometerhistory.reducers';

import {newVehicleOdometerHistory} from '@app/entities/asset/register/vehicle/vehicle.schema';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';
import {FSXDateFormat} from '@app/helpers/global/enum';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';

export interface OdometerHistoryProps {
  isReadOnly: boolean;
}

const columns: GridColumn[] = [
  {field: 'from', title: 'From'},
  {field: 'to', title: 'To'},
  {field: 'remarks', title: 'Remarks'},
  {field: 'dateCreated', title: 'Date Created', type: 'date'},
  {field: 'createdBy', title: 'Created By'},
];

const OdometerHistory: React.FC<OdometerHistoryProps> = ({isReadOnly}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<VehicleOdometerHistory>();

  const [
    vehicleOdometerHistory,
    setVehicleOdometerHistory,
  ] = React.useState<VehicleOdometerHistory>(newVehicleOdometerHistory());

  const vehicleOdometerHistoryReducer = useSelector(
    (state: RootState) => state.vehicleOdometerHistoryReducer,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tempIds = React.useMemo(() => vehicleOdometerHistoryReducer.current?.map(x => x.tempId), [
    vehicleOdometerHistoryReducer.current,
  ]);

  const formikRef = React.useRef<FormikProps<VehicleOdometerHistory>>(null);

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    setVehicleOdometerHistory(newVehicleOdometerHistory(tempIds));
    setIsOpen(true);
  };

  const handleClose = () => {
    setVehicleOdometerHistory(newVehicleOdometerHistory(tempIds));
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (!selected) return;
    dispatch(removeVehicleOdometerHistory(selected));
    setSelected(undefined);
  };

  const handleDrawerSubmit = () => {
    formikRef.current?.handleSubmit();
  };

  const handleEdit = () => {
    if (!selected) return;
    setVehicleOdometerHistory(selected);
    setIsOpen(true);
  };

  const handleFormikSubmit = (value: VehicleOdometerHistory) => {
    const action =
      tempIds?.indexOf(value.tempId) === -1
        ? addVehicleOdometerHistory
        : updateVehicleOdometerHistory;

    dispatch(action(value));

    setIsOpen(false);
  };

  return (
    <>
      <div className="p-2">
        <FsxDrawer
          title="Odometer History"
          isOpen={isOpen}
          onClose={handleClose}
          unMountChildren={true}
          onSubmit={handleDrawerSubmit}
          isReadOnly={isReadOnly}>
          <div className="flex flex-1 flex-col w-full py-4 px-8">
            <Formik
              enableReinitialize={true}
              initialValues={vehicleOdometerHistory}
              validateOnChange={false}
              onSubmit={handleFormikSubmit}
              innerRef={formikRef}>
              <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-2">
                <FsxFormikNumericTextBox name={`from`} label="From:" min={0} disabled={isReadOnly}/>
                <FsxFormikNumericTextBox name={`to`} label="To:" min={0} disabled={isReadOnly}/>
                <FsxFormikInput name="remarks" label="Remarks:" type="text" disabled={isReadOnly}/>
                <FsxFormikDatePicker
                  name={`dateCreated`}
                  label="Date Created:"
                  format={FSXDateFormat.Default}
                  disabled={isReadOnly}
                />
                <FsxFormikInput name="createdBy" label="Created By:" type="text" disabled />
              </div>
            </Formik>
          </div>
        </FsxDrawer>

        <FsxExcelExport
          fileName={`Register_Vehicle_Odometer_${moment().format('YYYYMMDDHHmm')}`}
          data={vehicleOdometerHistoryReducer.current}
          ref={excelExportRef}
          columns={columns}>
          <FsxTable
            data={vehicleOdometerHistoryReducer.current}
            columns={columns}
            onRowClick={e => setSelected(e.dataItem)}
            onRowDoubleClick={handleEdit}>
            <FsxTableActions
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onExport={exportToExcel}
              isReadOnly={isReadOnly}
            />
          </FsxTable>
        </FsxExcelExport>
      </div>
    </>
  );
};

export default React.memo(OdometerHistory);
