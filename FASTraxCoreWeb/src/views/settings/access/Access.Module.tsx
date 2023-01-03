import React, {useEffect, useRef, useState} from 'react';
import {
  TreeView,
  TreeViewCheckChangeEvent,
  TreeViewExpandChangeEvent,
  handleTreeViewCheckChange,
  processTreeViewItems,
} from '@progress/kendo-react-treeview';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {ModulePermissionDefault} from '@app/entities/catalog/Pages';
import {RootState} from '@app/store/rootReducer';
import {useAccessStore} from '@app/providers/access.store';
import {FormikContextType, useFormikContext} from 'formik';
import filterDeep from 'deepdash-es/filterDeep';
import {findCheckedTreeViewItems} from '@app/utils/core.util';

interface ITreeData {
  text: number;
  checked: boolean;
  checkIndeterminate: boolean;
  items?: Array<ITreeData>;
}

interface TreeCheck {
  ids: Array<number>;
}
interface ITreeCheck {
  [Key: number]: TreeCheck;
}

interface ITreeModuleProps {
  headerFormik: FormikContextType<unknown>;
}

const TreeModule: React.FC<ITreeModuleProps> = ({headerFormik, ...rest}) => {
  const {pageModuleList} = useSelector(
    (state: RootState) => ({
      pageModuleList: state.permissionReducer,
    }),
    shallowEqual,
  );
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
  const {selectedRoleId, setTempModulesIds, removeIdFromTempModules} = useAccessStore();
  const dispatch = useDispatch();
  const formikParent = useFormikContext();
  const [expanded, setExpanded] = useState<any>([]);

  const unFlatten = (items: any, id = null, link = 'parentName') =>
    items
      .filter((items: any) => items[link] === id)
      .map((item: any) => {
        return {
          displayName: item.displayName,
          name: item.name,
          parentName: item.parentName,
          editable: item.editable,
          visible: item.visible,
          referenceId: item.referenceId,
          isModule: item.isModule,
          roleId: item.roleId,
          accessModuleId: item.accessModuleId,
          text: item.displayName,
          items: unFlatten(items, item.name),
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

  const onCheckChange = React.useCallback(
    (event: TreeViewCheckChangeEvent) => {
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
    },
    [check, treeData],
  );

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

  const setFormikValues = (name: string, currentValues: any) => {
    let {value: values} = headerFormik.getFieldProps(name);
    let mergedValues = mergeModulesFromHeaderFormik(values, currentValues);

    headerFormik.setFieldValue(name, mergedValues);
  };

  const mergeModulesFromHeaderFormik = (
    prevValues: ModulePermissionDefault[],
    currentValues: ModulePermissionDefault[],
  ): ModulePermissionDefault[] => {
    if (!prevValues) return currentValues;

    let newValues: ModulePermissionDefault[] = [];
    let existFromPrevValues = prevValues.map((v, i) => {
      let cVal = currentValues.filter(p => p.name === v.name && p.roleId === v.roleId);

      if (cVal[0]) return {...v, visible: cVal[0].visible};
      else return v;
    });

    newValues.push(...existFromPrevValues);

    const notFoundInPrevVal = currentValues.filter(
      c =>
        !prevValues.some(
          n => n.name === c.name && n.parentName === c.parentName && c.roleId === n.roleId,
        ),
    );

    if (notFoundInPrevVal.length > 0) newValues.push(...notFoundInPrevVal);

    return newValues;
  };

  useEffect(() => {
    if (pageModuleList) {
      initialCheckObj.ids = [];
      const data = unFlatten(pageModuleList);
      setTreeData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageModuleList]);

  useEffect(() => {
    if (!treeData) return;

    reCheckChildren(treeData);

    setCheck(initialCheckObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treeData]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => setTempModulesIds(check.ids, selectedRoleId), [check]);

  useEffect(() => {
    if (!formikParent?.isSubmitting) return;

    const value = processTreeViewItems(treeData, {check});
    const finalCheckedItems = findCheckedTreeViewItems(value);

    setFormikValues('modules', finalCheckedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formikParent?.isSubmitting]);

  useEffect(() => {
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
