import React, {useState} from 'react';

import RepairOperationDetails from '@app/entities/maintenance/RepairOperationDetails';
import RepairOperationSelection from '@app/entities/maintenance/RepairOperationSelection';
import _ from 'lodash';
import {getRepairOperationAction} from '@app/services/maintenance/workordercomponent.service';
import {FsxGridWithSelection} from '@app/components/common';

import {useSelector} from 'react-redux';
import {RootState} from '@app/store/rootReducer';
import {GridColumn} from '@progress/kendo-react-grid';
import {generateUUID} from '@app/helpers/randoms';
import RepairSubGroup from '@app/entities/maintenance/standard-entries/RepairSubGroup';

const optOperationSelection = {
  group: [{field: 'repairGroup'}],
  skip: 0,
  take: 25,
};

//const optOperationAction= {
//    group: [{ field: 'repairOperation' }],
//    skip: 0,
//    take: 25
//};

export interface SelectionRepairProps {}

const SelectionRepair: React.FC<SelectionRepairProps> = () => {
  const workOrderComponentRepairSelectionReducer = useSelector(
    (state: RootState) => state.workOrderComponentRepairSelectionReducer,
  );
  const [repairOperationSelectionData, setRepairOperationSelectionData] = useState<
    RepairOperationSelection[]
  >();
  const [selectedRepairOperationData, setSelectedRepairOperationData] = React.useState<
    RepairOperationDetails[]
  >();
  //const repairOperationDetailsReducer = useSelector((state: RootState) => state.repairOperationDetailsReducer);

  const handleGridSelectionRowClick = (values: any) => {
    //console.log({ data: values });
    //const _data1 = values.filter((x: { checked: boolean; }) => x.checked === true);
    //console.log(_data1);
    //var _varSelected: RepairOperationSelection[] = [];
    //_varSelected = values as RepairOperationSelection[];
    ////var _selectedRepairGroups = values.reduce(function (acc: RepairOperationSelection[], obj: { repairGroupId: number; repairSubGroupId: number; }) {
    ////    acc.push(obj.repairGroupId);
    ////    acc.push(obj.repairSubGroupId);
    ////    return acc;
    ////},[]);
    ////var result: RepairOperationSelection[] = [];
    ////_varSelected.forEach(acc => result.push({ ...acc, repairGroupId: 0, repairSubGroupId: 0}));
    ////console.log(_varSelected);
  };

  const handleGridSelectionChanged = (values: any) => {
    //console.log(values);
  };

  const handleGridSelectionOnItemCheckedChanged = async (values: any) => {
    var _varSelectedValues = values as RepairOperationSelection[];

    let _selectedRepairOperation = _varSelectedValues.filter(function (obj) {
      return obj.checked;
    });
    //let _unSelectedRepairOperation = _varSelectedValues.filter(function (obj) { return !obj.checked });

    let _repairSubGroupPayload: RepairSubGroup[] = _selectedRepairOperation.map(x => {
      return {
        repairGroupId: x.repairGroupId,
        id: x.repairSubGroupId,
        SRO: '',
        repairLevelId: 0,
        description: '',
      };
    });

    if (_repairSubGroupPayload.length > 0) {
      await getRepairOperationAction(_repairSubGroupPayload).then(response => {
        setSelectedRepairOperationData(response.data);
        console.log(response.data);
      });
    }
  };

  const handleGridOperationRowClick = (values: any) => {};

  const handleGridOperationChanged = (values: any) => {};

  const handleGridOperationOnItemCheckedChanged = async (values: any) => {};

  React.useEffect(() => {
    setRepairOperationSelectionData(
      _.map(workOrderComponentRepairSelectionReducer, ps => ({
        ...ps,
        checked: false,
        id: generateUUID(),
      })) || [],
    );

    //console.log(workOrderComponentRepairSelectionReducer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workOrderComponentRepairSelectionReducer]);

  return (
    <div>
      <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <FsxGridWithSelection
          data={repairOperationSelectionData}
          pageable
          options={optOperationSelection}
          onGridSelectionDataChanged={handleGridSelectionChanged}
          onItemCheckedChanged={e => {
            handleGridSelectionOnItemCheckedChanged(e);
          }}
          onRowClick={e => handleGridSelectionRowClick(e.dataItem)}>
          <GridColumn field="repairSubGroup" title="repairSubGroup" />
        </FsxGridWithSelection>

        <FsxGridWithSelection
          data={selectedRepairOperationData}
          pageable
          options={optOperationSelection}
          onGridSelectionDataChanged={handleGridOperationChanged}
          onItemCheckedChanged={e => {
            handleGridOperationOnItemCheckedChanged(e);
          }}
          onRowClick={e => handleGridOperationRowClick(e.dataItem)}>
          <GridColumn field="repairOperationActionId" title="repairOperationActionId" />
          <GridColumn field="repairOperationId" title="repairOperationId" />
          <GridColumn field="repairGroupId" title="repairGroupId" />
          <GridColumn field="repairSubGroupId" title="repairSubGroupId" />
          <GridColumn field="repairOperationSRO" title="repairOperationSRO" />
          <GridColumn field="repairOperation" title="repairOperation" />
          <GridColumn field="hours" title="hours" />
          <GridColumn field="salesPrice" title="salesPrice" />
          <GridColumn field="serviceType" title="serviceType" />
          <GridColumn field="repairAction" title="repairAction" />
          <GridColumn field="repairLevel" title="repairLevel" />
        </FsxGridWithSelection>
      </div>
    </div>
  );
};

export default React.memo(SelectionRepair);
