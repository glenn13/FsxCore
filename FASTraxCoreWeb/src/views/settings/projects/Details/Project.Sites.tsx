import {FsxDrawer} from '@app/components/common';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import {FsxFormikInput} from '@app/components/common/FsxFormik';
import FsxTable from '@app/components/common/FsxTable';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import {emptyProjectSite, ProjectSite} from '@app/entities/catalog';
import {GridColumn} from '@app/helpers/types';
import {clearProjectSite} from '@app/store/catalog/projectsites/projectsites.reducer';
import {RootState} from '@app/store/rootReducer';
import {BaseUUIDType, UUID} from '@app/utils/uuid.util';
import {Formik, FormikProps, useFormikContext} from 'formik';
import {produce} from 'immer';
import moment from 'moment';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import {Grid} from '@progress/kendo-react-grid';
import {DataResult} from '@progress/kendo-data-query';

interface IProjectSitesProps {}

const ProjectSites: React.FC<IProjectSitesProps> = props => {
  const dispatch = useDispatch();
  const projectSiteDetails = useSelector((state: RootState) => state.projectSiteReducer);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<
    (ProjectSite & BaseUUIDType) | undefined
  >();
  const [projectSites, setProjectSites] = React.useState<ProjectSite[]>();
  const formikRef = React.useRef<FormikProps<ProjectSite & BaseUUIDType>>(null);
  const formikParent = useFormikContext();
  const gridRef = React.useRef<Grid>(null);

  const excelExportRef = useRef<any>(null);
  const exportToExcel = () => excelExportRef.current?.exportAsExcel();

  const columns: GridColumn[] = [
    {field: 'code', title: 'Code'},
    {field: 'title', title: 'Title'},
    {field: 'description', title: 'Description'},
  ];

  const handleAdd = () => {
    setIsOpen(true);
    formikRef.current?.setValues(emptyProjectSite);
  };

  const handleEdit = React.useCallback(() => {
    if (!gridRef.current) return;

    const gridData = gridRef.current.props as DataResult;
    if (!gridData.data.some(item => item.selected)) alert('No Selected Item');

    const currentSelected = gridData.data.filter(item => item.selected);
    setSelectedItem(currentSelected && currentSelected[0]);

    if (!currentSelected[0]) return;

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

    setProjectSites(
      produce(draft => {
        const indx =
          draft &&
          draft.findIndex((pr: ProjectSite & BaseUUIDType) => pr.uuid === selectedItem.uuid);

        if (indx >= 0) draft.splice(indx, 1);
      }),
    );
  }, [selectedItem]);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleDrawerSubmit = React.useCallback(() => {
    formikRef.current?.handleSubmit();
  }, []);

  const handleOnSubmit = React.useCallback(
    (values: ProjectSite & BaseUUIDType, {resetForm}: any) => {
      if (!projectSites || projectSites.length === 0) {
        setProjectSites(
          produce(draft => {
            draft.push({...values, uuid: UUID()});
          }),
        );
      } else {
        //check if code or title but different uuid
        const isAlreadyExists = projectSites.some(
          (pr: ProjectSite & BaseUUIDType) =>
            (pr.code.toLowerCase() === values.code.toLowerCase() ||
              pr.title.toLowerCase() === values.title.toLowerCase()) &&
            pr.uuid !== values.uuid,
        );

        if (!isAlreadyExists) {
          setProjectSites(
            produce(draft => {
              const indx =
                draft &&
                draft.findIndex((pr: ProjectSite & BaseUUIDType) => pr.uuid === values.uuid);

              if (indx >= 0) draft[indx] = {...values};
              else draft.push({...values, uuid: UUID()});
            }),
          );
        } else {
          alert('Code/ Title already existing');
          return;
        }
      }

      setIsOpen(false);
    },
    [projectSites],
  );

  useEffect(() => {
    setProjectSites(projectSiteDetails.all);
  }, [projectSiteDetails.all]);

  useEffect(() => {
    return () => {
      dispatch(clearProjectSite());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!formikRef.current?.isSubmitting && !formikParent.isSubmitting) return;

    formikParent.setFieldValue('projectSites', projectSites);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formikRef.current?.isSubmitting, formikParent.isSubmitting]);

  const shapeValidation = yup.object({
    code: yup.string().required('Code is required'),
    title: yup.string().required('Title is required'),
  });

  return (
    <div className="flex px-10 py-5">
      <FsxDrawer
        title="Project Site Location"
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleDrawerSubmit}>
        <div className="flex flex-1 flex-col w-full py-4 px-8">
          <Formik
            enableReinitialize={true}
            validationSchema={shapeValidation}
            initialValues={selectedItem || emptyProjectSite}
            validateOnChange={false}
            onSubmit={handleOnSubmit}
            innerRef={formikRef}>
            <div>
              <FsxFormikInput label="Code" name="code" type="text" />
              <FsxFormikInput label="Title" name="title" type="text" />
              <FsxFormikInput label="Description" name="description" type="text" />
            </div>
          </Formik>
        </div>
      </FsxDrawer>

      <FsxExcelExport
        fileName={`Project_Sites_${moment().format('YYYYMMDDHHmm')}`}
        data={projectSites}
        ref={excelExportRef}
        columns={columns}>
        <FsxTable
          ref={gridRef}
          data={projectSites}
          columns={columns}
          onRowClick={e => setSelectedItem(e.dataItem)}>
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

export default React.memo(ProjectSites);
