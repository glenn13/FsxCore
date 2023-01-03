import React, {useEffect, useRef, useState} from 'react';
import {
  TreeView,
  TreeViewCheckChangeEvent,
  TreeViewExpandChangeEvent,
  handleTreeViewCheckChange,
  processTreeViewItems,
} from '@progress/kendo-react-treeview';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {ModulePermissionCustom} from '@app/entities/catalog/Pages';
import {RootState} from '@app/store/rootReducer';
import {useAccessStore} from '@app/providers/access.store';
import {useFormikContext, useField, FormikContextType} from 'formik';
import {useRouteMatch} from 'react-router-dom';
import {findCheckedTreeViewItems} from '@app/utils/core.util';
import filterDeep from 'deepdash-es/filterDeep';

interface ITreeData {
  text: number;
  checked: boolean;
  checkIndeterminate: boolean;
  items?: Array<ITreeData>;
}

interface RouteProps {
  id: string;
}

interface ITreeModuleProps {
  headerFormik: FormikContextType<unknown>;
}

const TreeModule: React.FC<ITreeModuleProps> = ({headerFormik, ...rest}) => {
  const [projectSiteId] = useField('id');
  const [treeData, setTreeData] = useState<Array<ITreeData>>();
  const treeViewRef = useRef<any>();
  const checkIndeterminateField = 'checkUnknown';
  let initialCheckObj = {
    idField: 'name',
    applyCheckIndeterminate: true,
    checkIndeterminateField,
    ids: [] as any,
  };
  const [check, setCheck] = useState<any>(initialCheckObj);
  const {
    selectedRoleId,
    tempAccessByRole,
    setTempModulesIds,
    removeIdFromTempModules,
    setSelectedRoleId,
  } = useAccessStore();
  const dispatch = useDispatch();
  const formikParent = useFormikContext();
  const route = useRouteMatch<RouteProps>();
  const userId = route.params.id; //userId
  const {pageModuleList} = useSelector(
    (state: RootState) => ({
      pageModuleList: state.permissionCustomReducer.perUser,
    }),
    shallowEqual,
  );
  const [expanded, setExpanded] = useState<any>([]);

  const unflatten = (items: any, id: any = null, link = 'parentName') =>
    items
      .filter((items: any) => items[link] === id)
      .map((item: ModulePermissionCustom) => {
        return {
          displayName: item.displayName,
          name: item.name,
          parentName: item.parentName,
          editable: item.editable,
          visible: item.visible,
          referenceId: item.referenceId,
          isModule: item.isModule,
          roleId: item.roleId,
          userId: item.userId,
          projectSiteId: item.projectSiteId,
          accessModuleId: item.accessModuleId,
          text: item.displayName,
          items: unflatten(items, item.name),
        };
      });

  const onExpandChange = (event: TreeViewExpandChangeEvent) => {
    let expand = expanded.slice();
    const index = expanded.indexOf(event.itemHierarchicalIndex);
    index === -1 ? expand.push(event.itemHierarchicalIndex) : expand.splice(index, 1);
    setExpanded(expand);
  };

  const checkChildrenIfHasUnEditable = (treeViewItems: any) => {
    let filters: any = [];

    filterDeep(treeViewItems, (value: any, key: any, parent: any) => {
      if (key === 'editable' && value === false) {
        filters.push(parent);
        return;
      }
    });

    return filters.length > 0;
  };

  const onCheckChange = (event: TreeViewCheckChangeEvent) => {
    if (!event.item.editable) return;
    if (event.item.items && checkChildrenIfHasUnEditable(event.item.items)) {
      alert('Found items with uneditable value, so edit it manually per item');
      return;
    }

    if (event.item.checked) removeIdFromTempModules(event.item.accessModuleId, selectedRoleId);

    setCheck(
      handleTreeViewCheckChange(event, check, treeData, {
        checkChildren: true,
        checkParents: true,
      }),
    );
  };

  const setFormikValues = (name: string, currentValues: any) => {
    let {value: values} = headerFormik.getFieldProps(name);
    let mergedValues = mergeModulesFromHeaderFormik(values, currentValues);

    headerFormik.setFieldValue(name, mergedValues);
  };

  const mergeModulesFromHeaderFormik = React.useCallback(
    (
      prevValues: ModulePermissionCustom[],
      currentValues: ModulePermissionCustom[],
    ): ModulePermissionCustom[] => {
      if (!prevValues) return currentValues;

      let newValues: ModulePermissionCustom[] = [];
      let existFromPrevValues = prevValues
        .filter(p => p.projectSiteId == projectSiteId.value && p.roleId === selectedRoleId)
        .map((v, i) => {
          let cVal = currentValues.filter(p => p.name === v.name && p.roleId === v.roleId);

          if (cVal[0]) return {...v, visible: cVal[0].visible};
          else return {...v, visible: false};
        });

      newValues.push(...existFromPrevValues);

      const notFoundInPrevVal = currentValues.filter(
        c =>
          !prevValues.some(
            n => n.name === c.name && c.roleId === n.roleId && c.projectSiteId === n.projectSiteId,
          ),
      );

      if (notFoundInPrevVal.length > 0) newValues.push(...notFoundInPrevVal);

      return newValues;
    },
    [selectedRoleId],
  );

  useEffect(() => {
    if (pageModuleList) {
      const data = unflatten(pageModuleList);
      setTreeData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageModuleList]);

  const reCheckChildren = (items: any) => {
    items.map((item: any) => {
      let unCheckedItems: any = [];
      if (item.items && item.items.length > 0) {
        filterDeep(item.items, (value: any, key: any, parent: any) => {
          if (key === 'visible' && value === false) unCheckedItems.push(parent.name);
        });

        if (!(unCheckedItems.length > 0)) initialCheckObj.ids.push(item.name);

        return reCheckChildren(item.items);
      }

      if (item.visible) initialCheckObj.ids.push(item.name);

      return item;
    });
  };

  useEffect(() => {
    if (!treeData) return;

    reCheckChildren(treeData);

    setCheck(initialCheckObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treeData]);

  useEffect(() => {
    if (!selectedRoleId) return;

    if (tempAccessByRole[selectedRoleId])
      setCheck({...initialCheckObj, ids: tempAccessByRole[selectedRoleId].moduleIds});
    else setCheck(initialCheckObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoleId]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setTempModulesIds(check.ids, selectedRoleId), [check]);

  useEffect(() => {
    return () => {
      setSelectedRoleId(0);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!formikParent.isSubmitting) return;

    const value = processTreeViewItems(treeData, {check});
    const finalCheckedItems = findCheckedTreeViewItems(value);

    setFormikValues('modules', finalCheckedItems);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formikParent.isSubmitting]);

  // to avoid rerendering of treeview that will collapse the items
  const getTreeData = React.useMemo(
    () => processTreeViewItems(treeData, {check, expand: expanded}),
    [treeData, check, expanded],
  );

  return (
    <TreeView
      ref={treeViewRef}
      data={getTreeData}
      expandIcons={true}
      checkIndeterminateField={checkIndeterminateField}
      onExpandChange={onExpandChange}
      aria-multiselectable={true}
      checkboxes={true}
      onCheckChange={onCheckChange}
    />
  );
};

export default React.memo(TreeModule);
