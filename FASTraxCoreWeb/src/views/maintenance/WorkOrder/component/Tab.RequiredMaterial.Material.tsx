import {Checkbox, FsxDrawer, FsxTable} from '@app/components/common';
import FsxFormikDatePicker from '@app/components/common/FsxFormik/FsxFormikDatePicker';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';
import FsxFormikNumericTextBox from '@app/components/common/FsxFormik/FsxFormikNumericTextBox';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import WorkOrderComponentMaterial from '@app/entities/maintenance/workorder/WorkOrderComponentMaterial';
import {GridColumn} from '@app/helpers/types';
import {
  addWorkOrderComponentMaterial,
  emptyWorkOrderComponentMaterial,
  removeWorkOrderComponentMaterial,
  updateWorkOrderComponentMaterial,
} from '@app/store/maintenance/workorder/componentMaterial.reducers';
import {RootState} from '@app/store/rootReducer';
import MaintenanceDepartmentDropdown from '@app/views/maintenance/common/Dropdowns/MaintenanceDepartment';
import MaintenanceLocationDropdown from '@app/views/maintenance/common/Dropdowns/MaintenanceLocation';
import {NumericTextBoxChangeEvent} from '@progress/kendo-react-inputs';
import {Formik, FormikProps} from 'formik';
import moment from 'moment';
import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FsxExcelExport from '@app/components/common/FsxExcelExport';

export interface MaterialProps {}

const columns: GridColumn[] = [
  //Maintenance Department not yet included,
  {field: 'partNo', title: 'Part No.'},
  {field: 'description', title: 'Description'},
  //Unit  Type not yet included,
  {field: 'salesPrice', title: 'Sales Price'},
  {field: 'quantity', title: 'Qty'},
  {field: 'reservedQuantity', title: 'Reserved Qty'},
  {field: 'total', title: 'Total'},
  //Maintenance Location not yet included,
  {field: 'isIssued', title: 'Issued'},
  {field: 'dateIssued', title: 'Issuance Date', format: '{0:dd-MMM-yyyy}'},
  // Issued By not yet included
  {field: 'isOldPartReturned', title: 'Old Part Returned'},
  {field: 'remarks', title: 'Remarks'},
  {field: 'isApproved', title: 'Approved'},
  {field: 'isChargeable', title: 'Chargeable'},
  {field: 'priceGroup', title: 'Price Group'},
  {field: 'etd', title: 'ETD'},
  {field: 'referenceSSRNumber', title: 'Reference SSR No.'},
  {field: 'referencePONumber', title: 'Reference PO No.'},
];

const Material: React.FC<MaterialProps> = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const [varIsIssued, setIsIssued] = React.useState(false);
  const [varIsOldPartReturned, setIsOldPartReturned] = React.useState(false);
  const [varIsApproved, setIsApproved] = React.useState(false);
  const [varIsChargeable, setIsChargeable] = React.useState(false);
  const [selected, setSelected] = React.useState<WorkOrderComponentMaterial>();
  const [
    varWorkOrderComponentMaterial,
    varSetWorkOrderComponentMaterial,
  ] = React.useState<WorkOrderComponentMaterial>(emptyWorkOrderComponentMaterial());

  const workOrderComponentMaterialReducer = useSelector(
    (state: RootState) => state.workOrderComponentMaterialReducer,
  );

  const ids = React.useMemo(
    () => workOrderComponentMaterialReducer.map((wovmr: any) => wovmr.tempId),
    [workOrderComponentMaterialReducer],
  );

  const formikRef = React.useRef<FormikProps<WorkOrderComponentMaterial>>(null);

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    varSetWorkOrderComponentMaterial(emptyWorkOrderComponentMaterial(ids));
    setIsOpen(true);
  };
  const handleClose = () => {
    varSetWorkOrderComponentMaterial(emptyWorkOrderComponentMaterial(ids));
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (!selected) return;
    dispatch(removeWorkOrderComponentMaterial(selected));
    setSelected(undefined);
  };

  const handleDrawerSubmit = () => {
    formikRef.current?.handleSubmit();
  };

  const handleEdit = () => {
    if (!selected) return;
    varSetWorkOrderComponentMaterial(selected);
    setIsOpen(true);
  };

  const handleFormikSubmit = (value: WorkOrderComponentMaterial) => {
    const action =
      ids.indexOf(value.tempId) === -1
        ? addWorkOrderComponentMaterial
        : updateWorkOrderComponentMaterial;

    dispatch(action(value));

    setIsOpen(false);
  };

  const handleInputChange = (
    val: string | number | Date | boolean,
    key: keyof WorkOrderComponentMaterial,
  ) => {
    varSetWorkOrderComponentMaterial(currentState => ({
      ...currentState,
      [key]: val,
    }));
  };

  const handleIsApproved = () => {
    setIsApproved(!varIsApproved);
    handleInputChange(!varIsApproved, 'isApproved');
  };

  const handleIsIssued = () => {
    setIsIssued(!varIsIssued);
    handleInputChange(!varIsIssued, 'isIssued');
  };

  const handleIsChargeable = () => {
    setIsChargeable(!varIsChargeable);
    handleInputChange(!varIsChargeable, 'isChargeable');
  };

  const handleIsOldPartReturned = () => {
    setIsOldPartReturned(!varIsOldPartReturned);
    handleInputChange(!varIsOldPartReturned, 'isOldPartReturned');
  };

  const handleSalesPrice = (e: NumericTextBoxChangeEvent) => {
    if (e.value !== null) {
      var _totalSalesPrice = (formikRef.current?.values.quantity || 0) * e.value;
      formikRef.current?.setFieldValue('total', _totalSalesPrice);
    }
  };

  const handQty = (e: NumericTextBoxChangeEvent) => {
    if (e.value !== null) {
      var _totalSalesPrice = (formikRef.current?.values.salesPrice || 0) * e.value;
      formikRef.current?.setFieldValue('total', _totalSalesPrice);
    }
  };

  return (
    <>
      <FsxDrawer
        title="Material"
        isOpen={isOpen}
        onClose={handleClose}
        unMountChildren={true}
        onSubmit={handleDrawerSubmit}>
        <div className="flex flex-1 flex-col w-full py-4 px-8">
          <Formik
            enableReinitialize={true}
            initialValues={varWorkOrderComponentMaterial}
            validateOnChange={false}
            onSubmit={handleFormikSubmit}
            innerRef={formikRef}>
            <div>
              <div className="flex">
                <div className="w-3/3 px-2">
                  <Checkbox checked={varIsIssued} text="Issued" onChange={handleIsIssued} />
                </div>
                <div className="w-3/3 px-2">
                  <Checkbox
                    checked={varIsOldPartReturned}
                    text="Old Part Returned"
                    onChange={handleIsOldPartReturned}
                  />
                </div>
                <div className="w-3/3 px-2">
                  <Checkbox checked={varIsApproved} text="Approved" onChange={handleIsApproved} />
                </div>
                <div className="w-3/3 px-2">
                  <Checkbox
                    checked={varIsChargeable}
                    text="Chargeable"
                    onChange={handleIsChargeable}
                  />
                </div>
              </div>
              <div className="w-full">
                <MaintenanceDepartmentDropdown isFormik />
              </div>
              <div className="w-full">
                <FsxFormikInput name="partNo" label="Part No. :" type="text" />
              </div>
              <div className="w-full">
                <FsxFormikInput name="description" label="Description :" type="text" />
              </div>
              <div className="w-full">{/**  <UnitTypesDropdown isFormik /> **/}</div>
              <div className="w-full">
                <FsxFormikNumericTextBox name={`quantity`} onChange={handQty} label="Qty :" />
              </div>
              <div className="w-full">
                <FsxFormikNumericTextBox name={`costPrice`} label="Cost Price :" />
              </div>
              <div className="w-full">
                <FsxFormikNumericTextBox name={`markUp`} label="Markup % :" />
              </div>
              <div className="w-full">
                <FsxFormikNumericTextBox
                  name={`salesPrice`}
                  onChange={handleSalesPrice}
                  label="Sales Price :"
                />
              </div>
              <div className="w-full">
                <FsxFormikNumericTextBox name={`reservedQuantity`} label="Reserved Qty :" />
              </div>
              <div className="w-full">
                <FsxFormikNumericTextBox name={`total`} label="Total :" disabled />
              </div>
              <div className="w-full">
                <MaintenanceLocationDropdown isFormik />
              </div>
              <div className="w-full">
                <FsxFormikDatePicker name={`dateIssued`} label="Issuance Date :" />
              </div>
              <div className="w-full">
                <FsxFormikInput name="remarks" label="Remarks :" type="text" />
              </div>
              <div className="w-full">
                <FsxFormikDatePicker name={`etd`} label="ETD :" />
              </div>
              <div className="w-full">
                <FsxFormikInput name="referenceSSRNumber" label="Reference SSR No. :" type="text" />
              </div>
              <div className="w-full">
                <FsxFormikInput name="referencePONumber" label="Reference PO No. :" type="text" />
              </div>
              <div className="w-full"></div>
            </div>
          </Formik>
        </div>
      </FsxDrawer>

      <FsxExcelExport
        fileName={`WorkOrder_Component_RequiredMaterial_${moment().format('YYYYMMDDHHmm')}`}
        data={workOrderComponentMaterialReducer}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={workOrderComponentMaterialReducer}
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
    </>
  );
};

export default React.memo(Material);
