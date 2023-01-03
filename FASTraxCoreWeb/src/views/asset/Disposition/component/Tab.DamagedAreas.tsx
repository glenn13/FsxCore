import React, {useRef} from 'react';
import {GridColumn} from '@app/helpers/types';
import {FsxDrawer, FsxTable} from '@app/components/common';
import {
  addDispositionComponentDamagedArea,
  emptyDispositionComponentDamagedArea,
  removeDispositionComponentDamagedArea,
  updateDispositionComponentDamagedArea,
} from '@app/store/asset/disposition/component/dispositionComponentDamagedArea.reducers';
import {FormikProps, Formik, useFormikContext} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {
  DispositionComponentDamagedArea,
  dispositionComponentDamagedAreaShape,
} from '@app/entities/asset/disposition/component/DispositionComponentDamagedArea';
import {RootState} from '@app/store/rootReducer';
import {FsxFormikCheckbox} from '@app/components/common/FsxFormik';
import DispositionDamagedAreasDropdown from '@app/views/asset/common/Dropdowns/DispositionDamagedAreas';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import moment from 'moment';
import DispositionComponent from '@app/entities/asset/disposition/component/DispositionComponent';
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
  const [selected, setSelected] = React.useState<DispositionComponentDamagedArea>();
  const formik = useFormikContext<DispositionComponent>();

  const [existingDamagedAreaId, setExistingDamagedAreaId] = React.useState<number[]>();

  const [
    varDispositionComponentDamagedArea,
    varSetDispositionComponentDamagedArea,
  ] = React.useState<DispositionComponentDamagedArea>(emptyDispositionComponentDamagedArea());

  const dispositionComponentDamagedAreaReducer = useSelector(
    (state: RootState) => state.dispositionComponentDamagedAreaReducer,
  );

  const ids = React.useMemo(
    () => dispositionComponentDamagedAreaReducer.map((wovmr: any) => wovmr.tempId),
    [dispositionComponentDamagedAreaReducer],
  );

  const formikRef = React.useRef<FormikProps<DispositionComponentDamagedArea>>(null);

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    setExistingDamagedAreaId(
      dispositionComponentDamagedAreaReducer.map(x => x.dispositionDamagedAreaId),
    );
    varSetDispositionComponentDamagedArea(emptyDispositionComponentDamagedArea(ids));
    setIsOpen(true);
  };

  const handleClose = () => {
    varSetDispositionComponentDamagedArea(emptyDispositionComponentDamagedArea(ids));
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (!selected) return;
    dispatch(removeDispositionComponentDamagedArea(selected));
    setSelected(undefined);
  };

  const handleDrawerSubmit = () => {
    formikRef.current?.handleSubmit();
  };

  const handleEdit = () => {
    if (!selected) return;
    const _filterResult = dispositionComponentDamagedAreaReducer.filter(
      x => x.dispositionDamagedAreaId !== selected.dispositionDamagedAreaId,
    );
    setExistingDamagedAreaId(_filterResult?.map(x => x.dispositionDamagedAreaId));
    varSetDispositionComponentDamagedArea(selected);
    setIsOpen(true);
  };

  const handleOnSubmit = (value: DispositionComponentDamagedArea) => {
    const action =
      ids?.indexOf(value.tempId) === -1
        ? addDispositionComponentDamagedArea
        : updateDispositionComponentDamagedArea;
    dispatch(action(value));

    setIsOpen(false);
  };

  const handleInputChange = (
    val: string | number | Date | boolean,
    key: keyof DispositionComponentDamagedArea,
  ) => {
    varSetDispositionComponentDamagedArea(currentState => ({
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
            validationSchema={yup.object().shape(dispositionComponentDamagedAreaShape)}
            enableReinitialize={true}
            initialValues={varDispositionComponentDamagedArea}
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
                assetTypeId={formik.values.component?.assetTypeId || 0}
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
        fileName={`Disposition_Component_DamagedAreas_${moment().format('YYYYMMDDHHmm')}`}
        data={dispositionComponentDamagedAreaReducer}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={dispositionComponentDamagedAreaReducer}
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
