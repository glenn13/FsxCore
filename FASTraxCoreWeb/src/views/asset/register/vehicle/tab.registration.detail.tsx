import React, {useRef} from 'react';
import {Formik, FormikProps} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {FsxDrawer, FsxTable} from '@app/components/common';
import {GridColumn} from '@app/helpers/types';
import {RootState} from '@app/store/rootReducer';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import FsxFormikDatePicker from '@app/components/common/FsxFormik/FsxFormikDatePicker';

import {
  addVehicleRegistrationDetail,
  removeVehicleRegistrationDetail,
  updateVehicleRegistrationDetail,
} from '@app/store/asset/register/vehicleregistrationdetail.reducers';

import {newVehicleRegistrationDetail} from '@app/entities/asset/register/vehicle/vehicle.schema';
import {FSXDateFormat} from '@app/helpers/global/enum';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';

export interface RegistrationDetailProps {
  isReadOnly: boolean;
}

const columns: GridColumn[] = [
  {field: 'referenceNo', title: 'Reference No.'},
  {field: 'registeredTo', title: 'Registered To'},
  {field: 'placeOfRegistration', title: 'Place of Registration'},
  {field: 'registrationDate', title: 'Registration Date', type: 'date'},
  {field: 'expiryDate', title: 'Expiry Date', type: 'date'},
];

const RegistrationDetail: React.FC<RegistrationDetailProps> = ({isReadOnly}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<VehicleRegistrationDetail>();

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const [
    vehicleRegistrationDetail,
    setVehicleRegistrationDetail,
  ] = React.useState<VehicleRegistrationDetail>(newVehicleRegistrationDetail());

  const vehicleRegistrationDetailReducer = useSelector(
    (state: RootState) => state.vehicleRegistrationDetailReducer,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tempIds = React.useMemo(
    () => vehicleRegistrationDetailReducer.current?.map(x => x.tempId),
    [vehicleRegistrationDetailReducer.current],
  );

  const formikRef = React.useRef<FormikProps<VehicleRegistrationDetail>>(null);

  const handleAdd = () => {
    setVehicleRegistrationDetail(newVehicleRegistrationDetail(tempIds));
    setIsOpen(true);
  };

  const handleClose = () => {
    setVehicleRegistrationDetail(newVehicleRegistrationDetail(tempIds));
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (!selected) return;
    dispatch(removeVehicleRegistrationDetail(selected));
    setSelected(undefined);
  };

  const handleDrawerSubmit = () => {
    formikRef.current?.handleSubmit();
  };

  const handleEdit = () => {
    if (!selected) return;
    setVehicleRegistrationDetail(selected);
    setIsOpen(true);
  };

  const handleFormikSubmit = (value: VehicleRegistrationDetail) => {
    const action =
      tempIds?.indexOf(value.tempId) === -1
        ? addVehicleRegistrationDetail
        : updateVehicleRegistrationDetail;

    dispatch(action(value));

    setIsOpen(false);
  };

  return (
    <>
      <div className="p-2">
        <FsxDrawer
          title="Registration Detail"
          isOpen={isOpen}
          onClose={handleClose}
          unMountChildren={true}
          onSubmit={handleDrawerSubmit}
          isReadOnly={isReadOnly}>
          <div className="flex flex-1 flex-col w-full py-4 px-8">
            <Formik
              enableReinitialize={true}
              initialValues={vehicleRegistrationDetail}
              validateOnChange={false}
              onSubmit={handleFormikSubmit}
              innerRef={formikRef}>
              <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-2">
                <FsxFormikInput label="Reference No.:" name="referenceNo" type="text" disabled={isReadOnly}/>
                <FsxFormikInput label="Registered To:" name="registeredTo" type="text" disabled={isReadOnly}/>
                <FsxFormikInput
                  label="Place of Registration:"
                  name="placeOfRegistration"
                  type="text"
                  disabled={isReadOnly}
                />
                <FsxFormikDatePicker
                  label="Registration Date:"
                  name={`registrationDate`}
                  format={FSXDateFormat.Default}
                  disabled={isReadOnly}
                />
                <FsxFormikDatePicker
                  label="Expiry Date:"
                  name={`expiryDate`}
                  format={FSXDateFormat.Default}
                  disabled={isReadOnly}
                />
              </div>
            </Formik>
          </div>
        </FsxDrawer>

        <FsxExcelExport
          fileName={`Register_Vehicle_RegistrationDetails_${moment().format('YYYYMMDDHHmm')}`}
          data={vehicleRegistrationDetailReducer.current}
          ref={excelExportRef}
          columns={columns}>
          <FsxTable
            data={vehicleRegistrationDetailReducer.current}
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

export default React.memo(RegistrationDetail);
