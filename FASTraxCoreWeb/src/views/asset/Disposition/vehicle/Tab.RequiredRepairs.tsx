import React, {useRef} from 'react';
import {GridColumn} from '@app/helpers/types';
import {FsxDrawer, FsxTable} from '@app/components/common';
import {
  addDispositionVehicleRequiredRepair,
  emptyDispositionVehicleRequiredRepair,
  removeDispositionVehicleRequiredRepair,
  updateDispositionVehicleRequiredRepair,
} from '@app/store/asset/disposition/vehicle/dispositionVehicleRequiredRepair.reducers';
import {FormikProps, Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {
  DispositionVehicleRequiredRepair,
  dispositionVehicleRequiredRepairShape,
} from '@app/entities/asset/disposition/vehicle/DispositionVehicleRequiredRepair';
import {RootState} from '@app/store/rootReducer';
import {FsxFormikCheckbox} from '@app/components/common/FsxFormik';
import DispositionRequiredRepairsDropdown from '@app/views/asset/common/Dropdowns/DispositionRequiredRepairs';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import moment from 'moment';
import * as yup from 'yup';

export interface DispositionRequiredRepairProps {
  isReadOnly: boolean;
}

const columns: GridColumn[] = [
  {field: 'dispositionRequiredRepair.name', title: 'Required Repair'},
  {field: 'isRequiredRepair', title: 'YES/NO', type: 'checkbox'},
];

const DispositionRequiredRepairs: React.FC<DispositionRequiredRepairProps> = ({isReadOnly}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<DispositionVehicleRequiredRepair>();

  const [existingRequiredRepairId, setExistingRequiredRepairId] = React.useState<number[]>();

  const [
    varDispositionVehicleRequiredRepair,
    varSetDispositionVehicleRequiredRepair,
  ] = React.useState<DispositionVehicleRequiredRepair>(emptyDispositionVehicleRequiredRepair());

  const dispositionVehicleRequiredRepairReducer = useSelector(
    (state: RootState) => state.dispositionVehicleRequiredRepairReducer,
  );

  const ids = React.useMemo(
    () => dispositionVehicleRequiredRepairReducer.map((wovmr: any) => wovmr.tempId),
    [dispositionVehicleRequiredRepairReducer],
  );

  const formikRef = React.useRef<FormikProps<DispositionVehicleRequiredRepair>>(null);

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    setExistingRequiredRepairId(
      dispositionVehicleRequiredRepairReducer.map(x => x.dispositionRequiredRepairId),
    );
    varSetDispositionVehicleRequiredRepair(emptyDispositionVehicleRequiredRepair(ids));
    setIsOpen(true);
  };

  const handleClose = () => {
    varSetDispositionVehicleRequiredRepair(emptyDispositionVehicleRequiredRepair(ids));
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (!selected) return;
    dispatch(removeDispositionVehicleRequiredRepair(selected));
    setSelected(undefined);
  };

  const handleDrawerSubmit = () => {
    formikRef.current?.handleSubmit();
  };

  const handleEdit = () => {
    if (!selected) return;
    const _filterResult = dispositionVehicleRequiredRepairReducer.filter(
      x => x.dispositionRequiredRepairId !== selected.dispositionRequiredRepairId,
    );
    setExistingRequiredRepairId(_filterResult?.map(x => x.dispositionRequiredRepairId));
    varSetDispositionVehicleRequiredRepair(selected);
    setIsOpen(true);
  };

  const handleOnSubmit = (value: DispositionVehicleRequiredRepair) => {
    const action =
      ids?.indexOf(value.tempId) === -1
        ? addDispositionVehicleRequiredRepair
        : updateDispositionVehicleRequiredRepair;
    dispatch(action(value));

    setIsOpen(false);
  };

  const handleInputChange = (
    val: string | number | Date | boolean,
    key: keyof DispositionVehicleRequiredRepair,
  ) => {
    varSetDispositionVehicleRequiredRepair(currentState => ({
      ...currentState,
      [key]: val,
    }));
  };

  return (
    <div className="fflex flex-1 flex-col mb-5">
      <FsxDrawer
        title="Required Repair"
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleDrawerSubmit}
        isReadOnly={isReadOnly}>
        <div className="flex flex-1 flex-col w-full py-4 px-8">
          <Formik
            validationSchema={yup.object().shape(dispositionVehicleRequiredRepairShape)}
            enableReinitialize={true}
            initialValues={varDispositionVehicleRequiredRepair}
            validateOnChange={false}
            onSubmit={handleOnSubmit}
            innerRef={formikRef}
            isReadOnly={isReadOnly}>
            <div className="w-full">
              <DispositionRequiredRepairsDropdown
                isFormik
                onChange={e => {
                  handleInputChange(e.value, 'dispositionRequiredRepair');
                  handleInputChange(e.value.id, 'dispositionRequiredRepairId');
                }}
                currentRequiredRepairId={existingRequiredRepairId}
                disabled={isReadOnly}
              />
              <FsxFormikCheckbox
                name="isRequiredRepair"
                label="Is Required?"
                onChange={e => handleInputChange(e.value, 'isRequiredRepair')}
                disabled={isReadOnly}
              />
            </div>
          </Formik>
        </div>
      </FsxDrawer>

      <FsxExcelExport
        fileName={`Disposition_Vehicle_RequiredRepairs_${moment().format('YYYYMMDDHHmm')}`}
        data={dispositionVehicleRequiredRepairReducer}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={dispositionVehicleRequiredRepairReducer}
          columns={columns}
          onRowClick={(e: any) => setSelected(e.dataItem)}
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
  );
};

export default React.memo(DispositionRequiredRepairs);
