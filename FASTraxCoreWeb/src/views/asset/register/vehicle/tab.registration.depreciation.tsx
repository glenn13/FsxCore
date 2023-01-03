import React, {useRef} from 'react';
import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {NumericTextBoxChangeEvent} from '@progress/kendo-react-inputs';

import {RootState, StoreDispatch} from '@app/store/rootReducer';
import {FsxDrawer, FsxNumericTextBox, FsxTable} from '@app/components/common';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import {GridColumn} from '@app/helpers/types';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';
import FsxFormikNumericTextBox from '@app/components/common/FsxFormik/FsxFormikNumericTextBox';

import {setVehicleDepreciationDetail} from '@app/store/asset/register/vehicledepreciationdetail.reducers';
import FsxTableAction from '@app/components/common/FsxTable/Action';
import DepreciationPeriodTypeDropdown from '@app/views/finance/common/Dropdowns/DepreciationPeriodType';
import {Formik, FormikProps, useFormikContext} from 'formik';
import {newStraightLineEntity} from '@app/entities/finance/depreciation/straightline.schema';
import {
  CalculateDepreciationRate,
  CalculateDepreciationValue,
} from '@app/services/finance/global/depreciationmethod.service';
import {submitStraightLinePayload} from '@app/store/finance/global/depreciationmethod.actions';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import moment from 'moment';

export interface DepreciationProps {
  isReadOnly: boolean;
}

const columns: GridColumn[] = [
  {field: 'residualCost', title: 'Residual Cost'},
  {field: 'usefulLife', title: 'Useful Life(Month)'},
  {field: 'depreciationRate', title: 'Depreciation Rate (% per Month)', format: '{0:N2}'},
  {field: 'depreciationAmount', title: 'Depreciation Amount'},
];

const Depreciation: React.FC<DepreciationProps> = ({isReadOnly}) => {
  const dispatch: StoreDispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);

  const formik = useFormikContext<Vehicle>();

  let _straightLineEntity: StraightLineEntity = newStraightLineEntity();
  let _depreciationValue: number;
  let _depreciationRate: number;

  const [straightLineEntity, setStraightLineEntity] = React.useState<StraightLineEntity>(
    newStraightLineEntity(),
  );

  const [straightLineDetails, setStraightLineDetails] = React.useState<StraightLineDetail[]>([]);

  const vehicleDepreciationDetailReducer = useSelector(
    (state: RootState) => state.vehicleDepreciationDetailReducer,
  );

  const formikRef = React.useRef<FormikProps<StraightLineEntity>>(null);

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleGenerate = () => {
    if (straightLineDetails.length > 0) {
      setStraightLineDetails([]);
    }
    setIsOpen(true);
  };

  const handleClear = () => {
    dispatch(setVehicleDepreciationDetail([]));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDrawerSubmit = () => {
    formikRef.current?.handleSubmit();
  };

  const handleFormikSubmit = () => {
    dispatch(
      setVehicleDepreciationDetail(
        _.map(straightLineDetails, ps => ({
          ...ps,
          tempId: 0,
          id: 0,
          vehicleDepreciationId: 0,
        })),
      ),
    );

    setIsOpen(false);
  };

  const handleResidualCost = (e: NumericTextBoxChangeEvent) => {
    if (e.value !== null) {
      handleDepreciationCalulation(
        formikRef.current?.values.straightLineVariable.purchaseCost || 0,
        e.value || 0,
        formikRef.current?.values.straightLineVariable.usefulLife || 0,
      );
    }
  };

  const handleUsefulLife = (e: NumericTextBoxChangeEvent) => {
    if (e.value !== null) {
      handleDepreciationCalulation(
        formikRef.current?.values.straightLineVariable.purchaseCost || 0,
        formikRef.current?.values.straightLineVariable.residualCost || 0,
        e.value || 0,
      );
    }
  };

  const handleDepreciationCalulation = (
    purchaseCost: number,
    residualCost: number,
    usefulLife: number,
  ) => {
    _depreciationValue = CalculateDepreciationValue(purchaseCost, residualCost, usefulLife);
    _depreciationRate = CalculateDepreciationRate(_depreciationValue, purchaseCost);

    formikRef.current?.setFieldValue('straightLineVariable.residualCost', residualCost);
    formikRef.current?.setFieldValue('straightLineVariable.depreciationValue', _depreciationValue);
    formikRef.current?.setFieldValue('straightLineVariable.depreciationRate', _depreciationRate);
    formikRef.current?.setFieldValue('straightLineVariable.usefulLife', usefulLife);

    if (straightLineDetails.length > 0) {
      setStraightLineDetails([]);
    }
  };

  const handleLoadDetails = async () => {
    if (formikRef.current?.values.straightLineVariable !== undefined) {
      dispatch(submitStraightLinePayload(formikRef.current?.values.straightLineVariable))
        .then(response => {
          setStraightLineDetails(response.data);
        })
        .catch(() => {
          alert('Error occur while saving primary information.');
        });
    }
  };

  React.useEffect(() => {
    _straightLineEntity.straightLineVariable.purchaseCost =
      formik.values.vehiclePurchase?.totalAcquisitionAmount || 0;
    setStraightLineEntity(_straightLineEntity);
  }, [formik.values.vehiclePurchase?.totalAcquisitionAmount]);

  React.useEffect(() => {
    if (formik.values.vehiclePurchase !== undefined) {
      _straightLineEntity.straightLineVariable.acquisitionDate =
        formik.values.vehiclePurchase.acquisitionDate;
      setStraightLineEntity(_straightLineEntity);
    }
  }, [formik.values.vehiclePurchase?.acquisitionDate]);

  return (
    <div className="flex flex-col h-full">
      <FsxDrawer
        title="Depreciation Detail"
        isOpen={isOpen}
        onClose={handleClose}
        unMountChildren={true}
        onSubmit={handleDrawerSubmit}
        isReadOnly={isReadOnly}>
        <div className="flex flex-1 flex-col w-full py-4 px-8">
          <Formik
            enableReinitialize={true}
            initialValues={straightLineEntity}
            validateOnChange={false}
            onSubmit={handleFormikSubmit}
            innerRef={formikRef}>
            <div className="grid sm:grod-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
              <DepreciationPeriodTypeDropdown isFormik className="col-span-2" disabled={isReadOnly}/>
              <div className="col-span-2">
                <FsxFormikInput
                  label="Total Acquisition Amount:"
                  name={`straightLineVariable.purchaseCost`}
                  disabled
                />
              </div>
              <FsxNumericTextBox
                label="Residual Cost:"
                onChange={handleResidualCost}
                min={0}
                defaultValue={0}
                disabled={isReadOnly}
              />
              <FsxNumericTextBox
                label="Useful Life (Month):"
                onChange={handleUsefulLife}
                min={0}
                defaultValue={0}
                disabled={isReadOnly}
              />
              <FsxFormikNumericTextBox
                label="Depreciation Rate:"
                name={`straightLineVariable.depreciationRate`}
                min={0}
                defaultValue={0}
                disabled
              />
              <FsxFormikNumericTextBox
                label="Depreciation Value:"
                name={`straightLineVariable.depreciationValue`}
                min={0}
                defaultValue={0}
                disabled
              />

              <div className="w-full mb-8" />
              <div className="col-span-2">
                <FsxTable data={straightLineDetails} columns={columns}>
                  <FsxTableActions isReadOnly={isReadOnly}>
                    <FsxTableAction label="Load details" onClick={handleLoadDetails} />
                  </FsxTableActions>
                </FsxTable>
              </div>
            </div>
          </Formik>
        </div>
      </FsxDrawer>

      <FsxExcelExport
        fileName={`Register_Vehicle_Depreciation_${moment().format('YYYYMMDDHHmm')}`}
        data={vehicleDepreciationDetailReducer.current}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable data={vehicleDepreciationDetailReducer.current} columns={columns}>
          <FsxTableActions isReadOnly={isReadOnly}>
            <FsxTableAction
              label="Generate Details"
              onClick={handleGenerate}
              disabled={(formik.values.vehicleDepreciation?.depreciationMethodId || 0) <= 0}
            />
            <FsxTableAction label="Clear" onClick={handleClear} />
            <FsxTableAction label="Export" onClick={exportToExcel} />
          </FsxTableActions>
        </FsxTable>
      </FsxExcelExport>
    </div>
  );
};

export default React.memo(Depreciation);
