import {Checkbox, FsxDrawer, FsxTable} from '@app/components/common';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import FsxFormikDatePicker from '@app/components/common/FsxFormik/FsxFormikDatePicker';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';
import FsxFormikNumericTextBox from '@app/components/common/FsxFormik/FsxFormikNumericTextBox';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import EstimateVehicleMaterial from '@app/entities/maintenance/estimate/EstimateVehicleMaterial';
import {GridColumn} from '@app/helpers/types';
import {
  addEstimateVehicleMaterial,
  emptyEstimateVehicleMaterial,
  removeEstimateVehicleMaterial,
  updateEstimateVehicleMaterial,
} from '@app/store/maintenance/estimate/vehicleMaterial.reducers';
import {RootState} from '@app/store/rootReducer';
import MaintenanceDepartmentDropdown from '@app/views/maintenance/common/Dropdowns/MaintenanceDepartment';
import MaintenanceLocationDropdown from '@app/views/maintenance/common/Dropdowns/MaintenanceLocation';
import {NumericTextBoxChangeEvent} from '@progress/kendo-react-inputs';
import {Formik, FormikProps} from 'formik';
import moment from 'moment';
import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

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
  const [selected, setSelected] = React.useState<EstimateVehicleMaterial>();
  const [
    varEstimateVehicleMaterial,
    varSetEstimateVehicleMaterial,
  ] = React.useState<EstimateVehicleMaterial>(emptyEstimateVehicleMaterial());

  const estimateVehicleMaterialReducer = useSelector(
    (state: RootState) => state.estimateVehicleMaterialReducer,
  );

  const ids = React.useMemo(
    () => estimateVehicleMaterialReducer.map((wovmr: any) => wovmr.tempId),
    [estimateVehicleMaterialReducer],
  );

  const formikRef = React.useRef<FormikProps<EstimateVehicleMaterial>>(null);

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    varSetEstimateVehicleMaterial(emptyEstimateVehicleMaterial(ids));
    setIsOpen(true);
  };
  const handleClose = () => {
    varSetEstimateVehicleMaterial(emptyEstimateVehicleMaterial(ids));
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (!selected) return;
    dispatch(removeEstimateVehicleMaterial(selected));
    setSelected(undefined);
  };

  const handleDrawerSubmit = () => {
    formikRef.current?.handleSubmit();
  };

  const handleEdit = () => {
    if (!selected) return;
    varSetEstimateVehicleMaterial(selected);
    setIsOpen(true);
  };

  const handleFormikSubmit = (value: EstimateVehicleMaterial) => {
    const action =
      ids.indexOf(value.tempId) === -1 ? addEstimateVehicleMaterial : updateEstimateVehicleMaterial;

    dispatch(action(value));

    setIsOpen(false);
  };

  const handleInputChange = (
    val: string | number | Date | boolean,
    key: keyof EstimateVehicleMaterial,
  ) => {
    varSetEstimateVehicleMaterial(currentState => ({
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
    <div className="p-2">
      <FsxDrawer
        title="Material"
        isOpen={isOpen}
        onClose={handleClose}
        unMountChildren={true}
        onSubmit={handleDrawerSubmit}>
        <div className="flex flex-1 flex-col w-full py-4 px-8">
          <Formik
            enableReinitialize={true}
            initialValues={varEstimateVehicleMaterial}
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
        fileName={`WorkEstimate_Vehicle_RequiredMaterial_${moment().format('YYYYMMDDHHmm')}`}
        data={estimateVehicleMaterialReducer}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={estimateVehicleMaterialReducer}
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

export default React.memo(Material);
