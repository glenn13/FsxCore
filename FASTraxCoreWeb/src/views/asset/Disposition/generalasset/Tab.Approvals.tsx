import React, {useRef} from 'react';
import {GridColumn} from '@app/helpers/types';
import {FsxDrawer, FsxTable} from '@app/components/common';
import {
  addDispositionGeneralAssetApproval,
  emptyDispositionGeneralAssetApproval,
  removeDispositionGeneralAssetApproval,
  updateDispositionGeneralAssetApproval,
} from '@app/store/asset/disposition/generalasset/dispositionGeneralAssetApproval.reducers';
import {FormikProps, Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {
  DispositionGeneralAssetApproval,
  dispositionGeneralAssetApprovalShape,
  dispositionGeneralAssetApprovedShape,
} from '@app/entities/asset/disposition/generalasset/DispositionGeneralAssetApproval';
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
  isReadOnly: boolean
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
  const formikRef = React.useRef<FormikProps<DispositionGeneralAssetApproval>>(null);
  const [selected, setSelected] = React.useState<DispositionGeneralAssetApproval>();

  const [existingApproverId, setExistingApproverId] = React.useState<number[]>();

  const [approvalStatus, setApprovalStatus] = React.useState<DispositionApprovalStatus>();

  const [schema, setSchema] = React.useState<any>();

  const [
    varDispositionGeneralAssetApproval,
    varSetDispositionGeneralAssetApproval,
  ] = React.useState<DispositionGeneralAssetApproval>(emptyDispositionGeneralAssetApproval());

  const dispositionGeneralAssetApprovalReducer = useSelector(
    (state: RootState) => state.dispositionGeneralAssetApprovalReducer,
  );

  const ids = React.useMemo(
    () => dispositionGeneralAssetApprovalReducer.map((wovmr: any) => wovmr.tempId),
    [dispositionGeneralAssetApprovalReducer],
  );

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const handleAdd = () => {
    setExistingApproverId(dispositionGeneralAssetApprovalReducer.map(x => x.approverId));
    varSetDispositionGeneralAssetApproval(emptyDispositionGeneralAssetApproval(ids));
    setSchema(dispositionGeneralAssetApprovalShape);
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
    dispatch(removeDispositionGeneralAssetApproval(selected));
    setSelected(undefined);
  };

  const handleEdit = () => {
    if (!selected) return;
    const _filterResult = dispositionGeneralAssetApprovalReducer.filter(
      x => x.approverId !== selected.approverId,
    );
    setExistingApproverId(_filterResult?.map(x => x.approverId));

    if (selected.dispositionApprovalStatus?.title === 'Approved') {
      setSchema(dispositionGeneralAssetApprovedShape);
    } else {
      setSchema(dispositionGeneralAssetApprovalShape);
    }

    varSetDispositionGeneralAssetApproval(selected);
    setIsOpen(true);
  };

  const handleOnSubmit = (value: DispositionGeneralAssetApproval) => {
    value.dispositionApprovalStatus = approvalStatus;
    const action =
      ids?.indexOf(value.tempId) === -1
        ? addDispositionGeneralAssetApproval
        : updateDispositionGeneralAssetApproval;

    if (approvalStatus?.title === 'Approved') {
      setSchema(dispositionGeneralAssetApprovedShape);
    } else {
      setSchema(dispositionGeneralAssetApprovalShape);
    }
    dispatch(action(value));
    setIsOpen(false);
  };

  const handleApproverChange = (
    val: string | number | Date | boolean | object,
    key: keyof DispositionGeneralAssetApproval,
  ) => {
    varSetDispositionGeneralAssetApproval(currentState => ({
      ...currentState,
      [key]: val,
    }));
  };

  const handleStatusChange = (value: DispositionApprovalStatus) => {
    setApprovalStatus(value);
    if (approvalStatus?.title === 'Approved') {
      setSchema(dispositionGeneralAssetApprovedShape);
    } else {
      setSchema(dispositionGeneralAssetApprovalShape);
      varDispositionGeneralAssetApproval.dateApproved = '';
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
            initialValues={varDispositionGeneralAssetApproval}
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
        fileName={`Disposition_GeneralAsset_Approvals_${moment().format('YYYYMMDDHHmm')}`}
        data={dispositionGeneralAssetApprovalReducer}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          data={dispositionGeneralAssetApprovalReducer}
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
