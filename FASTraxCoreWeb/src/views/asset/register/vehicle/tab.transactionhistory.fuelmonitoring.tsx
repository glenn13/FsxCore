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
  addVehicleFuelMonitoring,
  removeVehicleFuelMonitoring,
  updateVehicleFuelMonitoring,
} from '@app/store/asset/register/vehiclefuelmonitoring.reducers';

import {newVehicleFuelMonitoring} from '@app/entities/asset/register/vehicle/vehicle.schema';
import {FSXDateFormat} from '@app/helpers/global/enum';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';

export interface FuelMonitoringProps {
  isReadOnly: boolean;
}

const columns: GridColumn[] = [
  {field: 'lastRefuelDate', title: 'Last Refuel Date', type: 'date'},
  {field: 'odometerReadingPrevious', title: 'Odometer Reading (Prev)'},
  {field: 'totalLitersLoadedPrevious', title: 'Total Liters Loaded (Prev)'},
  {field: 'odometerReadingCurrent', title: 'Odometer Reading (Current)'},
  {field: 'totalLitersLoaded', title: 'Total Liters Loaded'},
  {field: 'fuelCost', title: 'Fuel Cost'},
  {field: 'totalDistanceTravelled', title: 'Total Distance Travelled (Km)'},
  {field: 'totalFuelCost', title: 'Total Fuel Cost'},
  {field: 'averageConsumption', title: 'Average Consumption (Km/L)'},
];

const FuelMonitoring: React.FC<FuelMonitoringProps> = ({isReadOnly}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<VehicleFuelMonitoring>();

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const [vehicleFuelMonitoring, setVehicleFuelMonitoring] = React.useState<VehicleFuelMonitoring>(
    newVehicleFuelMonitoring(),
  );

  const vehicleFuelMonitoringReducer = useSelector(
    (state: RootState) => state.vehicleFuelMonitoringReducer,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tempIds = React.useMemo(() => vehicleFuelMonitoringReducer.current?.map(x => x.tempId), [
    vehicleFuelMonitoringReducer.current,
  ]);

  const formikRef = React.useRef<FormikProps<VehicleFuelMonitoring>>(null);

  const handleAdd = () => {
    setVehicleFuelMonitoring(newVehicleFuelMonitoring(tempIds));
    setIsOpen(true);
  };

  const handleClose = () => {
    setVehicleFuelMonitoring(newVehicleFuelMonitoring(tempIds));
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (!selected) return;
    dispatch(removeVehicleFuelMonitoring(selected));
    setSelected(undefined);
  };

  const handleDrawerSubmit = () => {
    formikRef.current?.handleSubmit();
  };

  const handleEdit = () => {
    if (!selected) return;
    setVehicleFuelMonitoring(selected);
    setIsOpen(true);
  };

  const handleFormikSubmit = (value: VehicleFuelMonitoring) => {
    const action =
      tempIds?.indexOf(value.tempId) === -1
        ? addVehicleFuelMonitoring
        : updateVehicleFuelMonitoring;

    dispatch(action(value));

    setIsOpen(false);
  };

  return (
    <>
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
              initialValues={vehicleFuelMonitoring}
              validateOnChange={false}
              onSubmit={handleFormikSubmit}
              innerRef={formikRef}>
              <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-2">
                <FsxFormikDatePicker
                  label="Last Refuel Date:"
                  name={`lastRefuelDate`}
                  format={FSXDateFormat.Default}
                  disabled={isReadOnly}
                />
                <FsxFormikNumericTextBox
                  name={`odometerReadingPrevious`}
                  label="Odometer Reading (Prev):"
                  min={0}
                  disabled={isReadOnly}
                />
                <FsxFormikNumericTextBox
                  name={`totalLitersLoadedPrevious`}
                  label="Total Liters Loaded (Prev):"
                  min={0}
                  disabled={isReadOnly}
                />
                <FsxFormikNumericTextBox
                  name={`odometerReadingCurrent`}
                  label="Odometer Reading (Current):"
                  min={0}
                  disabled={isReadOnly}
                />
                <FsxFormikNumericTextBox
                  name={`totalLitersLoaded`}
                  label="Total Liters Loaded:"
                  min={0}
                  disabled={isReadOnly}
                />
                <FsxFormikNumericTextBox name={`fuelCost`} label="Fuel Cost:" min={0} disabled={isReadOnly}/>
                <FsxFormikNumericTextBox
                  name={`totalDistanceTravelled`}
                  label="Total Distance Travelled (Km):"
                  min={0}
                  disabled={isReadOnly}
                />
                <FsxFormikNumericTextBox name={`totalFuelCost`} label="Total Fuel Cost:" min={0} disabled={isReadOnly}/>
                <FsxFormikNumericTextBox
                  name={`averageConsumption`}
                  label="Average Consumption (Km/L):"
                  min={0}
                  disabled={isReadOnly}
                />
              </div>
            </Formik>
          </div>
        </FsxDrawer>

        <FsxExcelExport
          fileName={`Register_Vehicle_FuelMonitoring_${moment().format('YYYYMMDDHHmm')}`}
          data={vehicleFuelMonitoringReducer.current}
          ref={excelExportRef}
          columns={columns}>
          <FsxTable
            data={vehicleFuelMonitoringReducer.current}
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

export default React.memo(FuelMonitoring);
