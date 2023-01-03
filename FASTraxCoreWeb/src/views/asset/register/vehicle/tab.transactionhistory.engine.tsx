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
  addVehicleEngineHistory,
  removeVehicleEngineHistory,
  updateVehicleEngineHistory,
} from '@app/store/asset/register/vehicleenginehistory.reducers';

import {newVehicleEngineHistory} from '@app/entities/asset/register/vehicle/vehicle.schema';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';
import {FSXDateFormat} from '@app/helpers/global/enum';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';

export interface EngineHistoryProps {
  isReadOnly: boolean;
}

const columns: GridColumn[] = [
  {field: 'from', title: 'From'},
  {field: 'to', title: 'To'},
  {field: 'remarks', title: 'Remarks'},
  {field: 'dateCreated', title: 'Date Created', type: 'date'},
  {field: 'createdBy', title: 'Created By'},
];

const EngineHistory: React.FC<EngineHistoryProps> = ({isReadOnly}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<VehicleEngineHistory>();

  const [vehicleEngineHistory, setVehicleEngineHistory] = React.useState<VehicleEngineHistory>(
    newVehicleEngineHistory(),
  );

  const vehicleEngineHistoryReducer = useSelector(
    (state: RootState) => state.vehicleEngineHistoryReducer,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tempIds = React.useMemo(() => vehicleEngineHistoryReducer.current?.map(x => x.tempId), [
    vehicleEngineHistoryReducer.current,
  ]);

  const formikRef = React.useRef<FormikProps<VehicleEngineHistory>>(null);

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    setVehicleEngineHistory(newVehicleEngineHistory(tempIds));
    setIsOpen(true);
  };

  const handleClose = () => {
    setVehicleEngineHistory(newVehicleEngineHistory(tempIds));
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (!selected) return;
    dispatch(removeVehicleEngineHistory(selected));
    setSelected(undefined);
  };

  const handleDrawerSubmit = () => {
    formikRef.current?.handleSubmit();
  };

  const handleEdit = () => {
    if (!selected) return;
    setVehicleEngineHistory(selected);
    setIsOpen(true);
  };

  const handleFormikSubmit = (value: VehicleEngineHistory) => {
    const action =
      tempIds?.indexOf(value.tempId) === -1 ? addVehicleEngineHistory : updateVehicleEngineHistory;

    dispatch(action(value));

    setIsOpen(false);
  };

  return (
    <div>
      <div className="p-2">
        <FsxDrawer
          title="Fuel Monitoring"
          isOpen={isOpen}
          onClose={handleClose}
          unMountChildren={true}
          onSubmit={handleDrawerSubmit}
          isReadOnly={isReadOnly}>
          <div className="flex flex-1 flex-col w-full py-4 px-8">
            <Formik
              enableReinitialize={true}
              initialValues={vehicleEngineHistory}
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
          fileName={`Register_Vehicle_TransactionHistory_${moment().format('YYYYMMDDHHmm')}`}
          data={vehicleEngineHistoryReducer.current}
          ref={excelExportRef}
          columns={columns}>
          <FsxTable
            data={vehicleEngineHistoryReducer.current}
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
    </div>
  );
};

export default React.memo(EngineHistory);
