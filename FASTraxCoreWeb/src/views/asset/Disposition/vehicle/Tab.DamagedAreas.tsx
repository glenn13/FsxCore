import React, {useRef} from 'react';
import {GridColumn} from '@app/helpers/types';
import {FsxDrawer, FsxTable} from '@app/components/common';
import {
  addDispositionVehicleDamagedArea,
  emptyDispositionVehicleDamagedArea,
  removeDispositionVehicleDamagedArea,
  updateDispositionVehicleDamagedArea,
} from '@app/store/asset/disposition/vehicle/dispositionVehicleDamagedArea.reducers';
import {FormikProps, Formik, useFormikContext} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {
  DispositionVehicleDamagedArea,
  dispositionVehicleDamagedAreaShape,
} from '@app/entities/asset/disposition/vehicle/DispositionVehicleDamagedArea';
import {RootState} from '@app/store/rootReducer';
import {FsxFormikCheckbox} from '@app/components/common/FsxFormik';
import DispositionDamagedAreasDropdown from '@app/views/asset/common/Dropdowns/DispositionDamagedAreas';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import moment from 'moment';
import DispositionVehicle from '@app/entities/asset/disposition/vehicle/DispositionVehicle';
import * as yup from 'yup';

export interface DispositionDamagedAreaProps {
  isReadOnly: boolean;
}

const columns: GridColumn[] = [
  {field: 'dispositionDamagedArea.name', title: 'Damaged Area'},
  {field: 'isDamagedArea', title: 'YES/NO', type: 'checkbox'},
];

const DispositionDamagedAreas: React.FC<DispositionDamagedAreaProps> = ({isReadOnly}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<DispositionVehicleDamagedArea>();
  const formik = useFormikContext<DispositionVehicle>();

  const [existingDamagedAreaId, setExistingDamagedAreaId] = React.useState<number[]>();

  const [
    varDispositionVehicleDamagedArea,
    varSetDispositionVehicleDamagedArea,
  ] = React.useState<DispositionVehicleDamagedArea>(emptyDispositionVehicleDamagedArea());

  const dispositionVehicleDamagedAreaReducer = useSelector(
    (state: RootState) => state.dispositionVehicleDamagedAreaReducer,
  );

  const ids = React.useMemo(
    () => dispositionVehicleDamagedAreaReducer.map((wovmr: any) => wovmr.tempId),
    [dispositionVehicleDamagedAreaReducer],
  );

  const formikRef = React.useRef<FormikProps<DispositionVehicleDamagedArea>>(null);

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    setExistingDamagedAreaId(
      dispositionVehicleDamagedAreaReducer.map(x => x.dispositionDamagedAreaId),
    );
    varSetDispositionVehicleDamagedArea(emptyDispositionVehicleDamagedArea(ids));
    setIsOpen(true);
  };

  const handleClose = () => {
    varSetDispositionVehicleDamagedArea(emptyDispositionVehicleDamagedArea(ids));
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (!selected) return;
    dispatch(removeDispositionVehicleDamagedArea(selected));
    setSelected(undefined);
  };

  const handleDrawerSubmit = () => {
    formikRef.current?.handleSubmit();
  };

  const handleEdit = () => {
    if (!selected) return;
    const _filterResult = dispositionVehicleDamagedAreaReducer.filter(
      x => x.dispositionDamagedAreaId !== selected.dispositionDamagedAreaId,
    );
    setExistingDamagedAreaId(_filterResult?.map(x => x.dispositionDamagedAreaId));
    varSetDispositionVehicleDamagedArea(selected);
    setIsOpen(true);
  };

  const handleOnSubmit = (value: DispositionVehicleDamagedArea) => {
    const action =
      ids?.indexOf(value.tempId) === -1
        ? addDispositionVehicleDamagedArea
        : updateDispositionVehicleDamagedArea;
    dispatch(action(value));

    setIsOpen(false);
  };

  const handleInputChange = (
    val: string | number | Date | boolean,
    key: keyof DispositionVehicleDamagedArea,
  ) => {
    varSetDispositionVehicleDamagedArea(currentState => ({
      ...currentState,
      [key]: val,
    }));
  };

  return (
    <div className="flex flex-1 flex-col mb-5">
      <FsxDrawer
        title="Damaged Area"
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleDrawerSubmit}>
        <div className="flex flex-1 flex-col w-full py-4 px-8">
          <Formik
            validationSchema={yup.object().shape(dispositionVehicleDamagedAreaShape)}
            enableReinitialize={true}
            initialValues={varDispositionVehicleDamagedArea}
            validateOnChange={false}
            onSubmit={handleOnSubmit}
            innerRef={formikRef}>
            <div className="w-full">
              <DispositionDamagedAreasDropdown
                isFormik
                onChange={e => {
                  handleInputChange(e.value, 'dispositionDamagedArea');
                  handleInputChange(e.value.id, 'dispositionDamagedAreaId');
                }}
                assetTypeId={formik.values.vehicle?.assetTypeId || 0}
                currentDamagedAreaId={existingDamagedAreaId}
              />
              <FsxFormikCheckbox
                name="isDamagedArea"
                label="Is Damaged Area?"
                onChange={e => handleInputChange(e.value, 'isDamagedArea')}
              />
            </div>
          </Formik>
        </div>
      </FsxDrawer>

      <FsxExcelExport
        fileName={`Disposition_Vehicle_DamagedAreas_${moment().format('YYYYMMDDHHmm')}`}
        data={dispositionVehicleDamagedAreaReducer}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={dispositionVehicleDamagedAreaReducer}
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

export default React.memo(DispositionDamagedAreas);
