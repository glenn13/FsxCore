import {
  Grid,
  GridColumn,
  GridHeaderSelectionChangeEvent,
  GridRowClickEvent,
  GridSelectionChangeEvent,
} from '@progress/kendo-react-grid';

import {Button} from '@app/components/common';
import React from 'react';
import _ from 'lodash';
import produce from 'immer';
import {useFormikContext} from 'formik';
import {useGeneralAssetMaintenanceInspectionAreas} from '@app/services/maintenance/standardentries/maintenanceInspectionArea';
import {useParams} from 'react-router-dom';

interface GridDataInterface extends InspectionArea {
  selected: boolean;
}

const InspectionGeneralAssetInspectionDetailsDrawer = (props: {callBack?: () => void}) => {
  let {id} = useParams<any>();

  const {values, setFieldValue} = useFormikContext<InspectionGeneralAsset>();

  const {data: maintenanceInspectionAreas} = useGeneralAssetMaintenanceInspectionAreas();

  const [gridData, setGridData] = React.useState<GridDataInterface[]>([]);

  React.useEffect(() => {
    if (maintenanceInspectionAreas?.data)
      setGridData(
        _.filter(
          maintenanceInspectionAreas.data,
          item =>
            !_.includes(
              _.flatMap(
                values.inspectionGeneralAssetInspectionDetails,
                x => x.maintenanceGeneralAssetInspectionAreaId,
              ),
              item.id,
            ),
        ).map(dataGrid => ({...dataGrid, selected: false})),
      );
  }, [maintenanceInspectionAreas, values.inspectionGeneralAssetInspectionDetails]);

  const handleRowClick = (e: GridRowClickEvent) => {
    const current = _.findIndex(gridData, data => data.id === e.dataItem.id);
    setGridData(
      produce(gridData, draftData => {
        draftData[current].selected = !draftData[current].selected;
      }),
    );
  };

  const handleSelectionChange = (e: GridSelectionChangeEvent) => {
    const current = _.findIndex(gridData, data => data.id === e.dataItem.id);
    setGridData(
      produce(gridData, draftData => {
        draftData[current].selected = !draftData[current].selected;
      }),
    );
  };

  const handleHeaderSelectionChange = (e: GridHeaderSelectionChangeEvent | any) => {
    const checked = e.syntheticEvent.target.checked;
    const newDataGrid = _.map(gridData, x => ({...x, selected: checked}));
    setGridData(newDataGrid);
  };

  const handleButton = () => {
    const selectedData = _.filter(gridData, 'selected').map(data => {
      return {
        inspectionGeneralAssetId: id ? parseInt(id) : 0,
        actionTake: '',
        details: data.description,
        maintenanceGeneralAssetInspectionAreaId: data.id,
        passed: false,
        remarks: '',
      };
    });

    setFieldValue(
      'inspectionGeneralAssetInspectionDetails',
      produce(values.inspectionGeneralAssetInspectionDetails, draftData => {
        selectedData.forEach(itemData => draftData?.push(itemData));
      }),
    );

    if (props.callBack) props.callBack();
  };

  return (
    <div className="p-4">
      <div className=" shadow-lg bg-white rounded">
        <Grid
          data={gridData}
          selectedField="selected"
          onSelectionChange={handleSelectionChange}
          onHeaderSelectionChange={handleHeaderSelectionChange}
          onRowClick={handleRowClick}
          style={{height: '400px'}}>
          <GridColumn field="selected" width="50px" />
          <GridColumn field="title" title="Inspection Area" />
          <GridColumn field="description" title="Description" />
        </Grid>
      </div>
      <Button
        className="mt-6"
        type="button"
        block
        oval
        shadow
        ripple
        onClick={handleButton}
        disabled={gridData.length <= 0}>
        Add
      </Button>
      <Button className="mt-6" type="button" block oval shadow ripple>
        Create new
      </Button>
    </div>
  );
};

export default InspectionGeneralAssetInspectionDetailsDrawer;
