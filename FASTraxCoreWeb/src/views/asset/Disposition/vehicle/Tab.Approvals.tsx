import React, {useRef} from 'react';
import {GridColumn} from '@app/helpers/types';
import {FsxDrawer, FsxTable} from '@app/components/common';
import {
  addDispositionVehicleApproval,
  emptyDispositionVehicleApproval,
  removeDispositionVehicleApproval,
  updateDispositionVehicleApproval,
} from '@app/store/asset/disposition/vehicle/dispositionVehicleApproval.reducers';
import {FormikProps, Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {
  DispositionVehicleApproval,
  dispositionVehicleApprovalShape,
  dispositionVehicleApprovedShape,
} from '@app/entities/asset/disposition/vehicle/DispositionVehicleApproval';
import {RootState} from '@app/store/rootReducer';
import DispositionApprovalStatusDropdown from '@app/views/asset/common/Dropdowns/DispositionApprovalStatus';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import UsersDropdown from '@app/views/catalog/common/Dropdowns/Users';
import FsxFormikDatePicker from '@app/components/common/FsxFormik/FsxFormikDatePicker';
import {FSXDateFormat} from '@app/helpers/global/enum';
import moment from 'moment';
import * as yup from 'yup';
import DispositionApprovalStatus from '@app/entities/asset/standard-entries/DispositionApprovalStatus';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';

export interface DispositionApprovalProps {
  isReadOnly: boolean;
}

const columns: GridColumn[] = [
  {field: 'approver.fullName', title: 'Approver Name'},
  {field: 'approver.designation.title', title: 'Position'},
  {field: 'dispositionApprovalStatus.title', title: 'Recommendation'},
  {field: 'dateApproved', title: 'Date Approved', type: 'date'},
];

const DispositionApproval: React.FC<DispositionApprovalProps> = ({isReadOnly}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const formikRef = React.useRef<FormikProps<DispositionVehicleApproval>>(null);
  const [selected, setSelected] = React.useState<DispositionVehicleApproval>();

  const [existingApproverId, setExistingApproverId] = React.useState<number[]>();

  const [approvalStatus, setApprovalStatus] = React.useState<DispositionApprovalStatus>();

  const [schema, setSchema] = React.useState<any>();

  const [
    varDispositionVehicleApproval,
    varSetDispositionVehicleApproval,
  ] = React.useState<DispositionVehicleApproval>(emptyDispositionVehicleApproval());

  const dispositionVehicleApprovalReducer = useSelector(
    (state: RootState) => state.dispositionVehicleApprovalReducer,
  );

  const ids = React.useMemo(
    () => dispositionVehicleApprovalReducer.map((wovmr: any) => wovmr.tempId),
    [dispositionVehicleApprovalReducer],
  );

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    setExistingApproverId(dispositionVehicleApprovalReducer.map(x => x.approverId));
    varSetDispositionVehicleApproval(emptyDispositionVehicleApproval(ids));
    setSchema(dispositionVehicleApprovalShape);
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
    dispatch(removeDispositionVehicleApproval(selected));
    setSelected(undefined);
  };

  const handleEdit = () => {
    if (!selected) return;
    const _filterResult = dispositionVehicleApprovalReducer.filter(
      x => x.approverId !== selected.approverId,
    );
    setExistingApproverId(_filterResult?.map(x => x.approverId));

    if (selected.dispositionApprovalStatus?.title === 'Approved') {
      setSchema(dispositionVehicleApprovedShape);
    } else {
      setSchema(dispositionVehicleApprovalShape);
    }

    varSetDispositionVehicleApproval(selected);
    setIsOpen(true);
  };

  const handleOnSubmit = (value: DispositionVehicleApproval) => {
    value.dispositionApprovalStatus = approvalStatus;
    const action =
      ids?.indexOf(value.tempId) === -1
        ? addDispositionVehicleApproval
        : updateDispositionVehicleApproval;

    if (approvalStatus?.title === 'Approved') {
      setSchema(dispositionVehicleApprovedShape);
    } else {
      setSchema(dispositionVehicleApprovalShape);
    }
    dispatch(action(value));
    setIsOpen(false);
  };

  const handleApproverChange = (
    val: string | number | Date | boolean | object,
    key: keyof DispositionVehicleApproval,
  ) => {
    varSetDispositionVehicleApproval(currentState => ({
      ...currentState,
      [key]: val,
    }));
  };

  const handleStatusChange = (value: DispositionApprovalStatus) => {
    setApprovalStatus(value);
    if (approvalStatus?.title === 'Approved') {
      setSchema(dispositionVehicleApprovedShape);
    } else {
      setSchema(dispositionVehicleApprovalShape);
      varDispositionVehicleApproval.dateApproved = '';
      formikRef.current?.setFieldValue('dateApproved', '');
    }
  };

  return (
    <div className="flex flex-1 flex-col mb-5">
      <FsxDrawer
        title="Approval"
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleDrawerSubmit}
        isReadOnly={isReadOnly}>
        <div className="flex flex-1 flex-col w-full py-4 px-8">
          <Formik
            validationSchema={yup.object().shape(schema)}
            enableReinitialize={true}
            initialValues={varDispositionVehicleApproval}
            validateOnChange={false}
            onSubmit={handleOnSubmit}
            innerRef={formikRef}
            isReadOnly={isReadOnly}>
            <div className="w-full">
              <UsersDropdown
                isFormik
                name={`approverId`}
                label="Approver Name:"
                onChange={e => {
                  handleApproverChange(e.value, 'approver');
                  handleApproverChange(e.value.id, 'approverId');
                }}
                currentUserId={existingApproverId}
                disabled={isReadOnly}
                required
              />
              <FsxFormikInput
                label="Position/ Title"
                name={`approver.designation.title`}
                type="text"
                disabled
              />
              <DispositionApprovalStatusDropdown
                isFormik
                name={`dispositionApprovalStatusId`}
                onChange={e => {
                  handleStatusChange(e.value);
                }}
                disabled={isReadOnly}
                required
              />
              <FsxFormikDatePicker
                label="Approved Date:"
                name={`dateApproved`}
                format={FSXDateFormat.Default}
                disabled={isReadOnly}
              />
            </div>
          </Formik>
        </div>
      </FsxDrawer>

      <FsxExcelExport
        fileName={`Disposition_Vehicle_Approvals_${moment().format('YYYYMMDDHHmm')}`}
        data={dispositionVehicleApprovalReducer}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={dispositionVehicleApprovalReducer}
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

export default React.memo(DispositionApproval);
