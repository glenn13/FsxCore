import {FsxDrawer} from '@app/components/common';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import {FsxFormikInput} from '@app/components/common/FsxFormik';
import FsxTable from '@app/components/common/FsxTable';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import {emptyProjectRole, ModulePermissionDefault, ProjectRole} from '@app/entities/catalog';
import {GridColumn} from '@app/helpers/types';
import {useAccessStore} from '@app/providers/access.store';
import {updatePermissions} from '@app/store/catalog/access/access.actions';
import {RootState} from '@app/store/rootReducer';
import {BaseUUIDType, UUID} from '@app/utils/uuid.util';
import PageAccessControl from '@app/views/settings/access';
import {Formik, FormikProps, useFormikContext} from 'formik';
import {produce} from 'immer';
import moment from 'moment';
import React, {useEffect, useRef} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {Grid} from '@progress/kendo-react-grid';
import {DataResult} from '@progress/kendo-data-query';

interface IProjectRolesProps {}

const ProjectRoles: React.FC<IProjectRolesProps> = props => {
  const {projectRoleDetails, user} = useSelector(
    (state: RootState) => ({
      projectRoleDetails: state.projectRoleReducer.current,
      user: state.users.current,
    }),
    shallowEqual,
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<(ProjectRole & BaseUUIDType) | undefined>(
    undefined,
  );
  const [projectRoles, setProjectRoles] = React.useState<ProjectRole[]>();
  const formikRef = React.useRef<FormikProps<any>>(null);
  const formikParent = useFormikContext();
  const [isEditing, setIsEditing] = React.useState(false);
  const dispatch = useDispatch();

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();
  const gridRef = React.useRef<Grid>(null);

  const {
    setSelectedRoleId,
    selectedRoleId,
    setAccessByRoleFromTemp,
    revertTempAccessFromOld,
    tempAccessByRole,
  } = useAccessStore();

  const columns: GridColumn[] = [
    {field: 'code', title: 'Code'},
    {field: 'title', title: 'Title'},
    {field: 'description', title: 'Description'},
    {field: 'isStatic', title: 'Static', type: 'checkbox'},
  ];

  const handleAdd = React.useCallback(() => {
    setIsEditing(false);
    setIsOpen(true);
    formikRef.current?.setValues(emptyProjectRole);
  }, []);

  const handleEdit = React.useCallback(() => {
    if (!gridRef.current) return;

    const gridData = gridRef.current.props as DataResult;
    if (!gridData.data.some(item => item.selected)) alert('No Selected Item');

    const currentSelected = gridData.data.filter(item => item.selected);

    setSelectedItem(currentSelected && currentSelected[0]);

    RepopulateModules();

    if (!currentSelected[0]) return;
    if (currentSelected[0].isStatic && user && !!!user.isSuperAdmin) return;

    setIsEditing(true);
    setIsOpen(true);

    formikRef.current &&
      formikRef.current.setValues(
        produce(formikRef.current.values, (draft: any) => {
          draft = currentSelected[0];
        }),
      );
  }, [selectedItem]);

  const handleDelete = React.useCallback(() => {
    if (!selectedItem) return;
    if (selectedItem.isStatic && user && !!!user.isSuperAdmin) return;

    setProjectRoles(
      produce(draft => {
        const indx =
          draft &&
          draft.findIndex((pr: ProjectRole & BaseUUIDType) => pr.uuid === selectedItem.uuid);

        if (indx >= 0) draft.splice(indx, 1);
      }),
    );
  }, [selectedItem]);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    revertTempAccessFromOld();
  }, []);

  const handleDrawerSubmit = React.useCallback(() => {
    formikRef.current?.handleSubmit();
  }, []);

  const handleOnSubmit = React.useCallback(
    (values: any, {resetForm}: any) => {
      if (!projectRoles || projectRoles.length === 0) {
        setProjectRoles(
          produce(draft => {
            draft.push({...values, uuid: UUID()});
          }),
        );
      } else {
        //check if code or title but different uuid
        const isAlreadyExists = projectRoles.some(
          (pr: ProjectRole & BaseUUIDType) =>
            (pr.code.toLowerCase() === values.code.toLowerCase() ||
              pr.title.toLowerCase() === values.title.toLowerCase()) &&
            pr.uuid !== values.uuid,
        );

        if (!isAlreadyExists) {
          setProjectRoles(
            produce(draft => {
              const indx =
                draft &&
                draft.findIndex((pr: ProjectRole & BaseUUIDType) => pr.uuid === values.uuid);

              if (indx >= 0) draft[indx] = {...values};
              else draft.push({...values, uuid: UUID()});
            }),
          );
        } else {
          alert('Code/ Title already existing');
          return;
        }
      }

      if (isEditing) {
        if (!selectedItem) return;
        if (Object.keys(tempAccessByRole).length === 0) return setIsOpen(false);

        // get Action Ids from temp as final copy
        setAccessByRoleFromTemp();
      }

      setIsOpen(false);
    },
    [selectedItem],
  );

  useEffect(() => {
    if (Object.keys(projectRoles || []).length == 0) setProjectRoles(projectRoleDetails);
  }, [projectRoleDetails]);

  useEffect(() => {
    if (!formikParent.isSubmitting) return;

    formikParent.setFieldValue('projectRoles', projectRoles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formikParent.isSubmitting]);

  const RepopulateModules = React.useCallback(() => {
    const moduleValues = formikParent.getFieldProps('modules').value as ModulePermissionDefault[];

    if (!selectedItem) return;

    dispatch(
      updatePermissions(
        selectedItem && moduleValues ? moduleValues.filter(r => r.roleId === selectedItem.id) : [],
        selectedItem.id,
      ),
    );
  }, [selectedItem, setSelectedItem]);

  const shapeValidation = yup.object({
    code: yup.string().required('Code is required'),
    title: yup.string().required('Title is required'),
  });

  return (
    <div className="flex px-10 py-5">
      <FsxDrawer
        className={isEditing ? 'lg:!w-3/5' : ''}
        title="Project Roles"
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleDrawerSubmit}>
        <div className="flex flex-1 flex-col w-full py-4 px-8">
          <Formik
            enableReinitialize={true}
            validationSchema={shapeValidation}
            initialValues={selectedItem || emptyProjectRole}
            validateOnChange={false}
            onSubmit={handleOnSubmit}
            innerRef={formikRef}>
            <div className="flex flex-col flex-grow">
              <FsxFormikInput label="Code" name="code" type="text" />
              <FsxFormikInput label="Title" name="title" type="text" />
              <FsxFormikInput label="Description" name="description" type="text" />

              {isEditing && selectedItem && selectedItem.id > 0 && isOpen && (
                <PageAccessControl headerFormik={formikParent} />
              )}
            </div>
          </Formik>
        </div>
      </FsxDrawer>

      <FsxExcelExport
        fileName={`Project_Roles_${moment().format('YYYYMMDDHHmm')}`}
        data={projectRoles}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          ref={gridRef}
          data={projectRoles}
          columns={columns}
          onRowClick={e => {
            setSelectedRoleId(e.dataItem.id || 0);
            setSelectedItem(e.dataItem);
          }}
          onRowDoubleClick={e => handleEdit()}>
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

export default React.memo(ProjectRoles);
