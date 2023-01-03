import React, {useRef} from 'react';
import {Formik, FormikProps} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {Checkbox, FsxDrawer, FsxTable} from '@app/components/common';
import {GridColumn} from '@app/helpers/types';
import {RootState} from '@app/store/rootReducer';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';
import FsxTableActions from '@app/components/common/FsxTable/Actions';

import {
  addVehicleArmourDetail,
  removeVehicleArmourDetail,
  updateVehicleArmourDetail,
} from '@app/store/asset/register/vehiclearmourdetail.reducers';
import {newVehicleArmourDetail} from '@app/entities/asset/register/vehicle/vehicle.schema';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';

export interface ArmourDetailProps {
  isReadOnly: boolean;
}

const columns: GridColumn[] = [
  {field: 'armourCompanyName', title: 'Armour Company'},
  {field: 'armouredArea', title: 'Armoured Area'},
  {field: 'description', title: 'Description'},
  {field: 'remarks', title: 'Remarks'},
];

const ArmourDetail: React.FC<ArmourDetailProps> = ({isReadOnly}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<VehicleArmourDetail>();
  const [isArmouredAsset, setIsArmouredAsset] = React.useState(false);

  const [vehicleArmourDetail, setVehicleArmourDetail] = React.useState<VehicleArmourDetail>(
    newVehicleArmourDetail(),
  );

  const vehicleArmourDetailReducer = useSelector(
    (state: RootState) => state.vehicleArmourDetailReducer,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tempIds = React.useMemo(() => vehicleArmourDetailReducer.current?.map(x => x.tempId), [
    vehicleArmourDetailReducer.current,
  ]);

  const formikRef = React.useRef<FormikProps<VehicleArmourDetail>>(null);

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    setVehicleArmourDetail(newVehicleArmourDetail(tempIds));
    setIsOpen(true);
  };

  const handleClose = () => {
    setVehicleArmourDetail(newVehicleArmourDetail(tempIds));
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (!selected) return;
    dispatch(removeVehicleArmourDetail(selected));
    setSelected(undefined);
  };

  const handleDrawerSubmit = () => {
    formikRef.current?.handleSubmit();
  };

  const handleEdit = () => {
    if (!selected) return;
    setVehicleArmourDetail(selected);
    setIsOpen(true);
  };

  const handleFormikSubmit = (value: VehicleArmourDetail) => {
    const action =
      tempIds?.indexOf(value.tempId) === -1 ? addVehicleArmourDetail : updateVehicleArmourDetail;

    dispatch(action(value));

    setIsOpen(false);
  };

  React.useEffect(() => {
    if (vehicleArmourDetailReducer.current !== undefined) {
      setIsArmouredAsset(vehicleArmourDetailReducer.current.length > 0);
    }
  }, [vehicleArmourDetailReducer.current]);

  return (
    <>
      <div className="p-2">
        <FsxDrawer
          title="Armour Detail"
          isOpen={isOpen}
          onClose={handleClose}
          unMountChildren={true}
          onSubmit={handleDrawerSubmit}
          isReadOnly={isReadOnly}>
          <div className="flex flex-1 flex-col w-full py-4 px-8">
            <Formik
              enableReinitialize={true}
              initialValues={vehicleArmourDetail}
              validateOnChange={false}
              onSubmit={handleFormikSubmit}
              innerRef={formikRef}>
              <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-2">
                <FsxFormikInput label="Armour Company Name:" name="armourCompanyName" type="text" disabled={isReadOnly}/>
                <FsxFormikInput label="Armoured Area:" name="armouredArea" type="text" disabled={isReadOnly}/>
                <FsxFormikInput label="Description:" name="description" type="text" disabled={isReadOnly}/>
                <FsxFormikInput label="Remarks:" name="remarks" type="text" disabled={isReadOnly}/>
              </div>
            </Formik>
          </div>
        </FsxDrawer>

        <Checkbox checked={isArmouredAsset} text="Armoured Asset?" disabled={isReadOnly}/>
        <FsxExcelExport
          fileName={`Register_Vehicle_ArmourDetails_${moment().format('YYYYMMDDHHmm')}`}
          data={vehicleArmourDetailReducer.current}
          ref={excelExportRef}
          columns={columns}>
          <FsxTable
            data={vehicleArmourDetailReducer.current}
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

export default React.memo(ArmourDetail);
