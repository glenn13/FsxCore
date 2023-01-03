import {Formik, FormikProps, useField, useFormikContext} from 'formik';
import {FsxDrawer, FsxGridWithSelection} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import React, {useEffect} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import FsxTableAction from '@app/components/common/FsxTable/Action';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import PageAccessControl from './components/index';
import {ModulePermissionCustom, ProjectSite} from '@app/entities/catalog';
import {RootState} from '@app/store/rootReducer';
import _ from 'lodash';
import {updatePermissionsByUser} from '@app/store/catalog/access/access.actions';
import {useGridStore} from '@app/providers/grid.store';
import {clearProjectSite} from '@app/store/catalog/projectsites/projectsites.reducer';
import FsxDropdown from '@app/components/common/Dropdown';
import {produce} from 'immer';
import {Grid} from '@progress/kendo-react-grid';
import {DataResult} from '@progress/kendo-data-query';
import {findSelectedOnAggregatedDataFromKendo} from '@app/utils/core.util';
import {setCustomPermissionTreeValue} from '@app/store/settings/permissions/permission.custom.reducer';

import {useCustomStore} from '@app/providers/custom.store';

interface IProjectLocationProps {}

interface Selection {
  checked: boolean;
}

interface SelectedRole {
  roleId: number;
}
interface RoleStore {
  [Key: string]: SelectedRole;
}

const ProjectLocation: React.FC<IProjectLocationProps> = props => {
  const {setFooterPagerVisibility} = useGridStore();
  const [selectedItem, setSelectedItem] = React.useState<ProjectSite | undefined>(undefined);
  const [projectId, setProjectId] = React.useState<number | undefined>(undefined);
  const [isOpen, setIsOpen] = React.useState(false);
  const formikParent = useFormikContext();
  const dispatch = useDispatch();
  const formikRef = React.useRef<FormikProps<any>>(null);
  const [isInitial, setIsInitial] = React.useState<boolean>(true);
  const [isProjectRoleSelection, setIsProjectRoleSelection] = React.useState<boolean>(false);
  const [modifiedProjectSiteRole, setModifiedProjectSiteRole] = React.useState<any>([]);
  const gridRef = React.useRef<Grid>(null);

  const {projectSiteDetails} = useSelector(
    (state: RootState) => ({
      projectSiteDetails: state.projectSiteReducer,
    }),
    shallowEqual,
  );

  const [isEditing, setIsEditing] = React.useState(false);

  const {setUserSiteRoleId, userSiteRole, selectedRoleId, setSelectedRoleId} = useCustomStore();

  const [field] = useField('id');

  const findVisible = (ps: ProjectSite): boolean => {
    if (!projectSiteDetails.current || projectSiteDetails.current.length === 0) return false;

    return projectSiteDetails.current.some(site => site.id === ps.id && site.visible);
  };

  useEffect(() => {
    if (projectSiteDetails.all?.length === 0) return;

    setFooterPagerVisibility(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectSiteDetails.all]);

  useEffect(() => {
    return () => {
      dispatch(clearProjectSite());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data: Array<any & Selection> = React.useMemo(
    () =>
      (projectSiteDetails &&
        projectSiteDetails.all &&
        projectSiteDetails.all.length >= 0 &&
        _.map(projectSiteDetails.all, ps => ({
          ...ps,
          userProjectSitesRole: projectSiteDetails.current
            ?.filter(psd => psd.id === ps.id)
            .flatMap(i => i.userProjectSitesRole),
          checked: findVisible(ps),
        }))) ||
      [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projectSiteDetails.all],
  );

  React.useEffect(() => {
    return () => {
      //clears all
      dispatch(clearProjectSite());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = {
    group: [{field: 'project.client.name'}, {field: 'project.title'}],
  };

  const handleAssignRole = React.useCallback(() => {
    if (!gridRef.current) return;

    dispatch(setCustomPermissionTreeValue([]));

    const gridData = gridRef.current.props.data as DataResult;
    const selectedRows = findSelectedOnAggregatedDataFromKendo(gridData.data);

    if (selectedRows.length == 0) {
      alert('No Selected Item');
      return;
    }

    const currentSelected = selectedRows[0];
    setSelectedItem(currentSelected);

    setIsProjectRoleSelection(
      currentSelected.project && currentSelected.userProjectSitesRole.length > 0,
    );

    // setSelectedRoleId(
    //   (currentSelected &&
    //     currentSelected.project &&
    //     currentSelected.userProjectSitesRole &&
    //     currentSelected.userProjectSitesRole.length > 0 &&
    //     currentSelected.userProjectSitesRole[0]?.projectRole.id) ||
    //     0,
    // );

    if (!currentSelected) return;

    setIsOpen(true);
    setIsEditing(true);
  }, []);

  const handleDrawerClose = () => {
    setIsOpen(false);
    setSelectedRoleId(0);
  };

  const handleDrawerSubmit = () => {
    formikRef.current?.handleSubmit();
  };

  const handleOnSubmit = (values: any, {resetForm}: any) => {
    if (!selectedItem) return;

    if (isEditing) {
      // get Action Ids from temp as final copy
      //   setAccessByRoleFromTemp();
    }

    setUserSiteRoleId(selectedItem.id, selectedRoleId);
    setSelectedRoleId(0);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!selectedItem) return;

    setProjectId(selectedItem.projectId);
  }, [selectedItem, selectedRoleId]);

  const handleProjectRoleDropdownChange = (event: any) => {
    if (!selectedItem) return;

    const projectRoleId = event.value.id; // project role id
    const id = field.value;

    setModifiedProjectSiteRole(
      produce(draft => {
        const indx =
          draft &&
          draft.findIndex(
            (pr: any) => pr.projectRoleId === 1 && pr.projectSiteId === selectedItem.id,
          );

        if (indx >= 0) draft[indx].projectRoleId = projectRoleId;
        else draft.push({projectRoleId: projectRoleId, projectSiteId: selectedItem.id});
      }),
    );

    setSelectedRoleId(projectRoleId);

    dispatch(updatePermissionsByUser([], projectRoleId, id, selectedItem.id));
  };

  const rolesList = React.useMemo(
    () => selectedItem && selectedItem.project && selectedItem.project.projectRoles,
    [selectedItem],
  );
  //   console.log({rolesList, selectedItem});

  const getSelected = React.useMemo(() => {
    const moduleValues = formikParent.getFieldProps('modules').value as ModulePermissionCustom[];
    const roleId = userSiteRole[selectedItem?.id || 0];
    const exactSelectedRoleId = selectedRoleId == 0 ? roleId : selectedRoleId;

    if (selectedRoleId === 0 && roleId == undefined) {
      const gridAssignedRole =
        selectedItem &&
        selectedItem.project &&
        selectedItem.userProjectSitesRole &&
        selectedItem.userProjectSitesRole.length >= 0 &&
        selectedItem.userProjectSitesRole[0]?.projectRole;

      if (gridAssignedRole && selectedItem) {
        dispatch(updatePermissionsByUser([], gridAssignedRole.id, field.value, selectedItem.id));
      }

      return gridAssignedRole || {};
    }

    if (selectedItem)
      dispatch(
        updatePermissionsByUser(
          selectedItem && moduleValues
            ? moduleValues.filter(
                m => m.roleId == exactSelectedRoleId && m.projectSiteId == selectedItem.id,
              )
            : [],
          exactSelectedRoleId,
          field.value,
          selectedItem.id,
        ),
      );

    return (
      selectedItem &&
      selectedItem.project &&
      selectedItem.project.projectRoles?.find(d => d.id === exactSelectedRoleId)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoleId, setSelectedRoleId, selectedItem, setSelectedItem, isOpen]);

  const handleGridSelectionChanged = (values: any) => {
    if (!isInitial) {
      setIsInitial(false);
    } else {
      const selectedProjectSites = values.filter((d: any) => d.checked === true);
      const uniqProjectIds = _.uniq(_.values(_.mapValues(selectedProjectSites, 'projectId')));

      const userProject = uniqProjectIds.map((v: any) => {
        return {projectId: v, userId: 0};
      });

      formikParent.setFieldValue('userProjects', userProject);
      formikParent.setFieldValue('projectSites', selectedProjectSites);
    }
  };

  const cellItemCheckboxTemplate = (props: any) => {
    if (props.rowType === 'groupHeader') return <></>;

    if (props.dataItem.userProjectSitesRole[0]) {
      return (
        <td className="" role="gridcell" aria-selected="false">
          {props.dataItem.userProjectSitesRole[0]['projectRole'].title}
        </td>
      );
    }

    if (
      props.dataItem &&
      props.dataItem.project &&
      props.dataItem.project.projectRoles &&
      modifiedProjectSiteRole
    ) {
      const gridItemCellRole = props.dataItem.project.projectRoles.filter((d: any) => {
        return modifiedProjectSiteRole.some(
          (m: any) => m.projectRoleId === d.id && m.projectSiteId === props.dataItem.id,
        );
      })[0];

      if (!gridItemCellRole) return <td className="" role="gridcell" aria-selected="false"></td>;
      else
        return (
          <td className="" role="gridcell" aria-selected="false">
            {gridItemCellRole.title}
          </td>
        );
    }

    return <td className="" role="gridcell" aria-selected="false"></td>;
  };

  return (
    <div className="flex px-10 py-5">
      <div className="flex flex-col">
        <FsxDrawer
          className={isEditing ? 'lg:!w-3/5' : ''}
          title="Project Role"
          isOpen={isOpen}
          onClose={handleDrawerClose}
          onSubmit={handleDrawerSubmit}>
          <div className="flex flex-1 flex-col w-full py-4 px-8">
            {isOpen && (
              <Formik
                enableReinitialize={true}
                initialValues={selectedItem as any}
                validateOnChange={false}
                onSubmit={handleOnSubmit}
                innerRef={formikRef}>
                <div className="flex flex-col flex-grow">
                  <div>
                    <FsxDropdown
                      onChange={handleProjectRoleDropdownChange}
                      data={rolesList}
                      dataItemKey="id"
                      value={getSelected}
                      textField="title"
                      label="Project Role"
                      name="projectRoleId"
                      disabled={isProjectRoleSelection}
                      required
                    />
                  </div>
                  {isOpen && <PageAccessControl headerFormik={formikParent} />}
                </div>
              </Formik>
            )}
          </div>
        </FsxDrawer>

        <FsxGridWithSelection
          gridRef={gridRef}
          data={data}
          options={options}
          onRowClick={e => {
            // setSelectedItem(e.dataItem);
          }}
          onGridSelectionDataChanged={handleGridSelectionChanged}>
          <GridColumn field="code" title="Code" />
          <GridColumn field="title" title="Title" />
          <GridColumn
            field="userProjectSitesRole"
            title="Project Role"
            cell={cellItemCheckboxTemplate}
          />
        </FsxGridWithSelection>
        <FsxTableActions>
          <FsxTableAction
            label="Assign Role"
            onClick={handleAssignRole}
            disabled={!(data.length > 0)}
          />
        </FsxTableActions>
      </div>
    </div>
  );
};

export default React.memo(ProjectLocation);
