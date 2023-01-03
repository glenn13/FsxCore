import React, {useRef} from 'react';
import {Formik, FormikProps, useFormikContext} from 'formik';
import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {FsxDrawer, FsxTable} from '@app/components/common';
import {GridColumn} from '@app/helpers/types';
import {RootState} from '@app/store/rootReducer';
import {newGeneralAssetLinkedAsset} from '@app/entities/asset/register/generalasset/generalasset.schema';
import {
  addGeneralAssetLinkedAsset,
  removeGeneralAssetLinkedAsset,
  updateGeneralAssetLinkedAsset,
} from '@app/store/asset/register/generalassetlinkedasset.reducers';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import FsxFormikDatePicker from '@app/components/common/FsxFormik/FsxFormikDatePicker';
import GeneralAssetToLinkedDropdown from '@app/views/asset/common/Dropdowns/GeneralAssetToLinked';
import {generateNegativeNumber} from '@app/helpers/randoms';
import {FSXDateFormat} from '@app/helpers/global/enum';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';

export interface LinkedAssetProps {
  isReadOnly: boolean;
}

const columns: GridColumn[] = [
  {field: 'assetRefId', title: 'Asset ID'},
  {field: 'serialNo', title: 'Serial No.'},
  {field: 'maintenanceStatus', title: 'Maintenance Status'},
  {field: 'hireStatus', title: 'Hire Status'},
  {field: 'processedBy', title: 'Processed By'},
  {field: 'dateLinked', title: 'Date Linked', type: 'date'},
];

const LinkedAsset: React.FC<LinkedAssetProps> = ({isReadOnly}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<GeneralAssetLinkedAsset>();
  const [existingLinkedGeneralAssetId, setExistingLinkedGeneralAssetId] = React.useState<
    number[]
  >();
  const [currentTempId, setCurrentTempId] = React.useState<number>();

  const formikGeneralAsset = useFormikContext<GeneralAsset>();

  const [parenGeneralAssetId, setParenGeneralAssetId] = React.useState<number>(0);

  const generalAssetLinkedAssetReducer = useSelector(
    (state: RootState) => state.generalAssetLinkedAssetReducer,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tempIds = React.useMemo(() => generalAssetLinkedAssetReducer.current?.map(x => x.tempId), [
    generalAssetLinkedAssetReducer.current,
  ]);
  const [
    generalAssetLinkedAsset,
    setGeneralAssetLinkedAsset,
  ] = React.useState<GeneralAssetLinkedAsset>(newGeneralAssetLinkedAsset(tempIds));

  const formikRef = React.useRef<FormikProps<GeneralAssetLinkedAsset>>(null);

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    setExistingLinkedGeneralAssetId(
      generalAssetLinkedAssetReducer.current?.map(x => x.linkedGeneralAssetId),
    );
    setCurrentTempId(generateNegativeNumber({flat: tempIds}));
    setGeneralAssetLinkedAsset(newGeneralAssetLinkedAsset([]));
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (!selected) return;
    dispatch(removeGeneralAssetLinkedAsset(selected));
    setSelected(undefined);
  };

  const handleDrawerSubmit = () => {
    formikRef.current?.handleSubmit();
  };

  const handleEdit = () => {
    if (!selected) return;
    const _filterResult = generalAssetLinkedAssetReducer.current?.filter(
      x => x.linkedGeneralAssetId !== selected.linkedGeneralAssetId,
    );
    setExistingLinkedGeneralAssetId(_filterResult?.map(x => x.linkedGeneralAssetId));
    setGeneralAssetLinkedAsset(selected);
    setIsOpen(true);
  };

  const handleFormikSubmit = (value: GeneralAssetLinkedAsset) => {
    const _indx = tempIds?.findIndex(x => x == currentTempId);
    if (_indx !== undefined) {
      const action = _indx >= 0 ? updateGeneralAssetLinkedAsset : addGeneralAssetLinkedAsset;
      dispatch(action(value));
    }

    setIsOpen(false);
  };

  const handleOnChange = (value: GeneralAssetLinkedAsset) => {
    if (currentTempId !== undefined) {
      value.tempId = currentTempId;
      setGeneralAssetLinkedAsset(value);
    }
  };

  React.useEffect(() => {
    setParenGeneralAssetId(formikGeneralAsset.values.id);
  }, [formikGeneralAsset.values.id]);

  React.useEffect(() => {
    if (selected !== undefined) {
      setCurrentTempId(selected.tempId);
    }
  }, [selected]);

  return (
    <>
      <div className="p-2">
        <FsxDrawer
          title="Linked Asset"
          isOpen={isOpen}
          onClose={handleClose}
          unMountChildren={true}
          onSubmit={handleDrawerSubmit}
          isReadOnly={isReadOnly}>
          <div className="flex flex-1 flex-col w-full py-4 px-8">
            <Formik
              enableReinitialize={true}
              initialValues={generalAssetLinkedAsset}
              validateOnChange={false}
              onSubmit={handleFormikSubmit}
              innerRef={formikRef}>
              <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-2">
                <GeneralAssetToLinkedDropdown
                  isFormik
                  parentGeneralAssetId={parenGeneralAssetId}
                  currentLinkedAssetId={existingLinkedGeneralAssetId}
                  onChange={e => handleOnChange(e.value)}
                  disabled={isReadOnly}
                />
                <FsxFormikInput label="Serial No.:" name="serialNo" type="text" disabled />
                <FsxFormikInput
                  label="Maintenance Status:"
                  name="maintenanceStatus"
                  type="text"
                  disabled
                />
                <FsxFormikInput label="Hire Status:" name="hireStatus" type="text" disabled />
                <FsxFormikInput label="Process By:" name="processedBy" type="text" disabled />
                <FsxFormikDatePicker
                  label="Date Linked:"
                  name={`dateLinked`}
                  format={FSXDateFormat.Default}
                  disabled
                />
              </div>
            </Formik>
          </div>
        </FsxDrawer>
        <FsxExcelExport
          fileName={`Register_GeneralAsset_LinkedAssets_${moment().format('YYYYMMDDHHmm')}`}
          data={generalAssetLinkedAssetReducer.current}
          ref={excelExportRef}
          columns={columns}>
          <FsxTable
            data={generalAssetLinkedAssetReducer.current}
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

export default React.memo(LinkedAsset);
