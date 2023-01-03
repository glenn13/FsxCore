import React, {useRef} from 'react';
import {GridColumn} from '@app/helpers/types';
import {FsxDrawer, FsxTable} from '@app/components/common';
import {
  addDispositionGeneralAssetRequiredRepair,
  emptyDispositionGeneralAssetRequiredRepair,
  removeDispositionGeneralAssetRequiredRepair,
  updateDispositionGeneralAssetRequiredRepair,
} from '@app/store/asset/disposition/generalasset/dispositionGeneralAssetRequiredRepair.reducers';
import {FormikProps, Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {
  DispositionGeneralAssetRequiredRepair,
  dispositionGeneralAssetRequiredRepairShape,
} from '@app/entities/asset/disposition/generalasset/DispositionGeneralAssetRequiredRepair';
import {RootState} from '@app/store/rootReducer';
import {FsxFormikCheckbox} from '@app/components/common/FsxFormik';
import DispositionRequiredRepairsDropdown from '@app/views/asset/common/Dropdowns/DispositionRequiredRepairs';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import moment from 'moment';
import * as yup from 'yup';
import FsxCustomField from '@app/components/common/FsxCustomField';

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
  const [selected, setSelected] = React.useState<DispositionGeneralAssetRequiredRepair>();

  const [existingRequiredRepairId, setExistingRequiredRepairId] = React.useState<number[]>();

  const [
    varDispositionGeneralAssetRequiredRepair,
    varSetDispositionGeneralAssetRequiredRepair,
  ] = React.useState<DispositionGeneralAssetRequiredRepair>(
    emptyDispositionGeneralAssetRequiredRepair(),
  );

  const dispositionGeneralAssetRequiredRepairReducer = useSelector(
    (state: RootState) => state.dispositionGeneralAssetRequiredRepairReducer,
  );

  const ids = React.useMemo(
    () => dispositionGeneralAssetRequiredRepairReducer.map((wovmr: any) => wovmr.tempId),
    [dispositionGeneralAssetRequiredRepairReducer],
  );

  const formikRef = React.useRef<FormikProps<DispositionGeneralAssetRequiredRepair>>(null);

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    setExistingRequiredRepairId(
      dispositionGeneralAssetRequiredRepairReducer.map(x => x.dispositionRequiredRepairId),
    );
    varSetDispositionGeneralAssetRequiredRepair(emptyDispositionGeneralAssetRequiredRepair(ids));
    setIsOpen(true);
  };

  const handleClose = () => {
    varSetDispositionGeneralAssetRequiredRepair(emptyDispositionGeneralAssetRequiredRepair(ids));
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (!selected) return;
    dispatch(removeDispositionGeneralAssetRequiredRepair(selected));
    setSelected(undefined);
  };

  const handleDrawerSubmit = () => {
    formikRef.current?.handleSubmit();
  };

  const handleEdit = () => {
    if (!selected) return;
    const _filterResult = dispositionGeneralAssetRequiredRepairReducer.filter(
      x => x.dispositionRequiredRepairId !== selected.dispositionRequiredRepairId,
    );
    setExistingRequiredRepairId(_filterResult?.map(x => x.dispositionRequiredRepairId));
    varSetDispositionGeneralAssetRequiredRepair(selected);
    setIsOpen(true);
  };

  const handleOnSubmit = (value: DispositionGeneralAssetRequiredRepair) => {
    const action =
      ids?.indexOf(value.tempId) === -1
        ? addDispositionGeneralAssetRequiredRepair
        : updateDispositionGeneralAssetRequiredRepair;
    dispatch(action(value));

    setIsOpen(false);
  };

  const handleInputChange = (
    val: string | number | Date | boolean,
    key: keyof DispositionGeneralAssetRequiredRepair,
  ) => {
    varSetDispositionGeneralAssetRequiredRepair(currentState => ({
      ...currentState,
      [key]: val,
    }));
  };

  return (
    <div className="flex flex-1 flex-col mb-5">
      <FsxDrawer
        title="Required Repair"
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleDrawerSubmit}
        isReadOnly={isReadOnly}>
        <div className="flex flex-1 flex-col w-full py-4 px-8">
          <Formik
            validationSchema={yup.object().shape(dispositionGeneralAssetRequiredRepairShape)}
            enableReinitialize={true}
            initialValues={varDispositionGeneralAssetRequiredRepair}
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
        fileName={`Disposition_GeneralAsset_RequiredRepairs_${moment().format('YYYYMMDDHHmm')}`}
        data={dispositionGeneralAssetRequiredRepairReducer}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={dispositionGeneralAssetRequiredRepairReducer}
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
