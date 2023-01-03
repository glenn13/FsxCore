import {FsxDrawer, FsxTable} from '@app/components/common';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';
import FsxFormikNumericTextBox from '@app/components/common/FsxFormik/FsxFormikNumericTextBox';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import WorkOrderGeneralAssetAdditionalCharge from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetAdditionalCharge';
import {GridColumn} from '@app/helpers/types';
import {
  addWorkOrderGeneralAssetAdditionalCharge,
  emptyWorkOrderGeneralAssetAdditionalCharge,
  removeWorkOrderGeneralAssetAdditionalCharge,
  updateWorkOrderGeneralAssetAdditionalCharge,
} from '@app/store/maintenance/workorder/generalAssetAdditionalCharge.reducers';
import ApprovalStatusDropdown from '@app/views/maintenance/common/Dropdowns/ApprovalStatus';
import {FormikProps, Formik} from 'formik';
import {RootState} from '@app/store/rootReducer';
import {NumericTextBoxChangeEvent} from '@progress/kendo-react-inputs';
import moment from 'moment';
import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export interface AdditionalChargeProps {}

const columns: GridColumn[] = [
  {field: 'description', title: 'Description'},
  {field: 'quantity', title: 'Qty'},
  //UOM not yet included on displaying in the grid
  {field: 'salesPrice', title: 'Sales Price'},
  {field: 'totalSalesPrice', title: 'Total Sales Price'},
  {field: 'remarks', title: 'Remarks'},
];

const AdditionalCharge: React.FC<AdditionalChargeProps> = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const formikRef = React.useRef<FormikProps<WorkOrderGeneralAssetAdditionalCharge>>(null);
  const [selected, setSelected] = React.useState<WorkOrderGeneralAssetAdditionalCharge>();
  const [
    varWorkOrderGeneralAssetAdditionalCharge,
    varSetWorkOrderGeneralAssetAdditionalCharge,
  ] = React.useState<WorkOrderGeneralAssetAdditionalCharge>(
    emptyWorkOrderGeneralAssetAdditionalCharge(),
  );
  const workOrderGeneralAssetAdditionalChargeReducer = useSelector(
    (state: RootState) => state.workOrderGeneralAssetAdditionalChargeReducer,
  );
  const ids = React.useMemo(
    () => workOrderGeneralAssetAdditionalChargeReducer.map((wovacr: any) => wovacr.tempId),
    [workOrderGeneralAssetAdditionalChargeReducer],
  );

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    varSetWorkOrderGeneralAssetAdditionalCharge(emptyWorkOrderGeneralAssetAdditionalCharge(ids));
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDrawerSubmit = () => {
    formikRef.current?.handleSubmit();
  };

  const handleDelete = () => {
    if (!selected) return;
    dispatch(removeWorkOrderGeneralAssetAdditionalCharge(selected));
    setSelected(undefined);
  };

  const handleEdit = () => {
    if (!selected) return;
    varSetWorkOrderGeneralAssetAdditionalCharge(selected);
    setIsOpen(true);
  };

  const handleOnSubmit = (value: WorkOrderGeneralAssetAdditionalCharge) => {
    const action =
      ids.indexOf(value.tempId) === -1
        ? addWorkOrderGeneralAssetAdditionalCharge
        : updateWorkOrderGeneralAssetAdditionalCharge;

    dispatch(action(value));

    setIsOpen(false);
  };

  const handleSalesPrice = (e: NumericTextBoxChangeEvent) => {
    if (e.value !== null) {
      var _totalSalesPrice = (formikRef.current?.values.quantity || 0) * e.value;
      formikRef.current?.setFieldValue('totalSalesPrice', _totalSalesPrice);
    }
  };

  const handQty = (e: NumericTextBoxChangeEvent) => {
    if (e.value !== null) {
      var _totalSalesPrice = (formikRef.current?.values.salesPrice || 0) * e.value;
      formikRef.current?.setFieldValue('totalSalesPrice', _totalSalesPrice);
    }
  };

  return (
    <div className="flex">
      <FsxDrawer
        title="Additional Charge"
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleDrawerSubmit}>
        <div className="flex flex-1 flex-col w-full py-4 px-8">
          <Formik
            enableReinitialize={true}
            initialValues={varWorkOrderGeneralAssetAdditionalCharge}
            validateOnChange={false}
            onSubmit={handleOnSubmit}
            innerRef={formikRef}>
            <div>
              <div className="w-full">
                <FsxFormikInput name="description" label="Description :" type="text" />
              </div>
              <div className="w-full">
                <FsxFormikNumericTextBox name="quantity" onChange={handQty} label="Qty :" />
              </div>
              <div className="w-full">{/**  <UnitTypesDropdown isFormik /> **/}</div>
              <div className="w-full">
                <FsxFormikNumericTextBox
                  name={`salesPrice`}
                  onChange={handleSalesPrice}
                  label="Sales Price :"
                />
              </div>
              <div className="w-full">
                <FsxFormikNumericTextBox
                  name={`totalSalesPrice`}
                  label="Total Sales Price :"
                  disabled
                />
              </div>
              <div className="w-full">
                <ApprovalStatusDropdown isFormik />
              </div>
              <div className="w-full">
                <FsxFormikInput name="remarks" label="Remarks :" type="text" />
              </div>
            </div>
          </Formik>
        </div>
      </FsxDrawer>

      <FsxExcelExport
        fileName={`WorkOrder_GeneralAsset_RequiredService&Repair_${moment().format(
          'YYYYMMDDHHmm',
        )}`}
        data={workOrderGeneralAssetAdditionalChargeReducer}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={workOrderGeneralAssetAdditionalChargeReducer}
          columns={columns}
          onRowClick={(e: any) => setSelected(e.dataItem)}
          onRowDoubleClick={handleEdit}>
          <FsxTableActions
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onExport={exportToExcel}
          />
        </FsxTable>
      </FsxExcelExport>
    </div>
  );
};

export default React.memo(AdditionalCharge);
