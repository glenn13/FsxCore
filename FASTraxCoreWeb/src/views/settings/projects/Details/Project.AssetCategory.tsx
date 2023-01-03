import React, {useEffect, useState} from 'react';
import {FsxGridWithSelection} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import {ProjectAssetCategory} from '@app/entities/catalog/ProjectAssetCategory';
import {BaseUUIDType} from '@app/components/common/FsxGridWithSelection';
import {getAssetCategories} from '@app/services/asset/standardentries/assetCategory.service';
import {useField, useFormikContext} from 'formik';
import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from '@app/store/rootReducer';

export interface IProjectAssetCategory {}

const ProjectAssetCategoryGrid: React.FC<IProjectAssetCategory> = () => {
  const [projectId] = useField('id');
  const [categories, setCategories] = useState<any>();
  const [dataGrid, setDataGrid] = useState<Array<ProjectAssetCategory & BaseUUIDType>>();
  const formikParent = useFormikContext();
  const projectAsset = useSelector(
    (state: RootState) => state.projectAssetCategoryReducer.current,
    shallowEqual,
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSelectionChange = React.useCallback((e: any) => setDataGrid(e), [dataGrid]);

  useEffect(() => {
    getAssetCategories().then(response => setCategories(response.data));
  }, []);

  useEffect(() => {
    if (!categories) return;

    const result: Array<ProjectAssetCategory & BaseUUIDType> = categories.map(
      (item: ProjectAssetCategory) => ({
        id: (projectAsset && projectAsset.filter(i => i.assetCategoryId === item.id)[0]?.id) || 0,
        checked: projectAsset?.some(i => i.assetCategoryId === item.id) || false,
        projectId: projectId.value,
        assetCategoryId: item.id,
        assetCategory: item,
      }),
    );

    setDataGrid(result);

    /* eslint-disable react-hooks/exhaustive-deps */
  }, [categories]);

  useEffect(() => {
    if (!formikParent.isSubmitting) return;
    if (!dataGrid) return;

    formikParent.setFieldValue(
      'assetCategories',
      dataGrid.filter(item => item.checked),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formikParent.isSubmitting]);

  return (
    <div className="pt-4 px-5">
      <FsxGridWithSelection
        data={dataGrid}
        options={{}}
        onGridSelectionDataChanged={e => handleSelectionChange(e)}>
        <GridColumn field="assetCategory.title" title="Asset Group" />
      </FsxGridWithSelection>
    </div>
  );
};

export default React.memo(ProjectAssetCategoryGrid);
