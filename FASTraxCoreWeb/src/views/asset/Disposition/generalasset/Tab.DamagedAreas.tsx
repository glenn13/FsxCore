import React, {useRef} from 'react';
import {useFormikContext} from 'formik';
import {GridColumn} from '@app/helpers/types';
import {FsxDrawer, FsxTable} from '@app/components/common';
import {
  addDispositionGeneralAssetDamagedArea,
  emptyDispositionGeneralAssetDamagedArea,
  removeDispositionGeneralAssetDamagedArea,
  updateDispositionGeneralAssetDamagedArea,
} from '@app/store/asset/disposition/generalasset/dispositionGeneralAssetDamagedArea.reducers';
import {FormikProps, Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {
  DispositionGeneralAssetDamagedArea,
  dispositionGeneralAssetDamagedAreaShape,
} from '@app/entities/asset/disposition/generalasset/DispositionGeneralAssetDamagedArea';
import {RootState} from '@app/store/rootReducer';
import {FsxFormikCheckbox} from '@app/components/common/FsxFormik';
import DispositionDamagedAreasDropdown from '@app/views/asset/common/Dropdowns/DispositionDamagedAreas';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import moment from 'moment';
import DispositionGeneralAsset from '@app/entities/asset/disposition/generalasset/DispositionGeneralAsset';
import * as yup from 'yup';

export interface DispositionDamagedAreaProps {
  isReadOnly: boolean
}

const columns: GridColumn[] = [
  {field: 'dispositionDamagedArea.name', title: 'Damaged Area'},
  {field: 'isDamagedArea', title: 'YES/NO', type: 'checkbox'},
];

const DispositionDamagedAreas: React.FC<DispositionDamagedAreaProps> = ({isReadOnly}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<DispositionGeneralAssetDamagedArea>();
  const formik = useFormikContext<DispositionGeneralAsset>();

  const [existingDamagedAreaId, setExistingDamagedAreaId] = React.useState<number[]>();

  const [
    varDispositionGeneralAssetDamagedArea,
    varSetDispositionGeneralAssetDamagedArea,
  ] = React.useState<DispositionGeneralAssetDamagedArea>(emptyDispositionGeneralAssetDamagedArea());

  const dispositionGeneralAssetDamagedAreaReducer = useSelector(
    (state: RootState) => state.dispositionGeneralAssetDamagedAreaReducer,
  );

  const ids = React.useMemo(
    () => dispositionGeneralAssetDamagedAreaReducer.map((wovmr: any) => wovmr.tempId),
    [dispositionGeneralAssetDamagedAreaReducer],
  );

  const formikRef = React.useRef<FormikProps<DispositionGeneralAssetDamagedArea>>(null);

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    setExistingDamagedAreaId(
      dispositionGeneralAssetDamagedAreaReducer.map(x => x.dispositionDamagedAreaId),
    );
    varSetDispositionGeneralAssetDamagedArea(emptyDispositionGeneralAssetDamagedArea(ids));
    setIsOpen(true);
  };

  const handleClose = () => {
    varSetDispositionGeneralAssetDamagedArea(emptyDispositionGeneralAssetDamagedArea(ids));
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (!selected) return;
    dispatch(removeDispositionGeneralAssetDamagedArea(selected));
    setSelected(undefined);
  };

  const handleDrawerSubmit = () => {
    formikRef.current?.handleSubmit();
  };

  const handleEdit = () => {
    if (!selected) return;
    const _filterResult = dispositionGeneralAssetDamagedAreaReducer.filter(
      x => x.dispositionDamagedAreaId !== selected.dispositionDamagedAreaId,
    );
    setExistingDamagedAreaId(_filterResult?.map(x => x.dispositionDamagedAreaId));
    varSetDispositionGeneralAssetDamagedArea(selected);
    setIsOpen(true);
  };

  const handleOnSubmit = (value: DispositionGeneralAssetDamagedArea) => {
    const action =
      ids?.indexOf(value.tempId) === -1
        ? addDispositionGeneralAssetDamagedArea
        : updateDispositionGeneralAssetDamagedArea;
    dispatch(action(value));

    setIsOpen(false);
  };

  const handleInputChange = (
    val: string | number | Date | boolean,
    key: keyof DispositionGeneralAssetDamagedArea,
  ) => {
    varSetDispositionGeneralAssetDamagedArea(currentState => ({
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
        onSubmit={handleDrawerSubmit}
        isReadOnly={isReadOnly}>
        <div className="flex flex-1 flex-col w-full py-4 px-8">
          <Formik
            validationSchema={yup.object().shape(dispositionGeneralAssetDamagedAreaShape)}
            enableReinitialize={true}
            initialValues={varDispositionGeneralAssetDamagedArea}
            validateOnChange={false}
            onSubmit={handleOnSubmit}
            innerRef={formikRef}
            isReadOnly={isReadOnly}>
            <div className="w-full">
              <DispositionDamagedAreasDropdown
                isFormik
                onChange={e => {
                  handleInputChange(e.value, 'dispositionDamagedArea');
                  handleInputChange(e.value.id, 'dispositionDamagedAreaId');
                }}
                assetTypeId={formik.values.generalAsset?.assetTypeId || 0}
                currentDamagedAreaId={existingDamagedAreaId}
                disabled={isReadOnly}
              />
              <FsxFormikCheckbox
                name="isDamagedArea"
                label="Is Damaged Area?"
                onChange={e => handleInputChange(e.value, 'isDamagedArea')}
                disabled={isReadOnly}
              />
            </div>
          </Formik>
        </div>
      </FsxDrawer>

      <FsxExcelExport
        fileName={`Disposition_GeneralAsset_DamagedAreas_${moment().format('YYYYMMDDHHmm')}`}
        data={dispositionGeneralAssetDamagedAreaReducer}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={dispositionGeneralAssetDamagedAreaReducer}
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
