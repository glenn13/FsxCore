import React from 'react';
import {getUnderMaintenanceCount} from '@app/services/maintenance/workorder.service';
import {getInspectionCount} from '@app/services/maintenance/inspection.service';
import {getDispositionCount} from '@app/services/asset/disposition/disposition.service';

export interface SideStatsProps {}

const SideStats: React.FC<SideStatsProps> = () => {
  const [undermaintenanceCount, setUndermaintenanceCount] = React.useState(0);
  const [inspectionCount, setInspectionCount] = React.useState(0);
  const [dispositionCount, setDispositionCount] = React.useState(0);

  React.useEffect(() => {
    getUnderMaintenanceCount().then(response => setUndermaintenanceCount(response.data));
  }, []);

  React.useEffect(() => {
    getInspectionCount().then(response => setInspectionCount(response.data));
  }, []);

  React.useEffect(() => {
    getDispositionCount().then(response => setDispositionCount(response.data));
  }, []);

  return (
    <div className="flex flex-1 shadow flex-col p-2" id="asset-inventory-panel">
      <div className="mb-2">
        <div className="title">Asset On Hire</div>
        <div className="flex pt-1">
          <div className="w-1/3">
            <span className="text-3xl percent">0</span>
          </div>
          <div className="w-2/3 text-right items-end justify-end">
            <span className="text-lg block pt-3">0</span>
          </div>
        </div>
      </div>
      <div className="mb-2">
        <div className="title">Asset On Reserved</div>
        <div className="flex pt-1">
          <div className="w-1/3">
            <span className="text-3xl percent">0</span>
          </div>
          <div className="w-2/3 text-right">
            <span className="text-lg block pt-3">0</span>
          </div>
        </div>
      </div>
      <div className="mb-2">
        <div className="title">Asset Due for Service</div>
        <div className="flex pt-1">
          <div className="w-1/3">
            <span className="text-3xl percent">0</span>
          </div>
          <div className="w-2/3 text-right">
            <span className="text-lg block pt-3">0</span>
          </div>
        </div>
      </div>
      <div className="mb-2">
        <div className="title">Asset Under Maintenance/ Repair</div>
        <div className="flex pt-1">
          <div className="w-1/3">
            <span className="text-3xl percent">0</span>
          </div>
          <div className="w-2/3 text-right">
            <span className="text-lg block pt-3">{undermaintenanceCount || 0}</span>
          </div>
        </div>
      </div>
      <div className="mb-2">
        <div className="title">Asset For Inspection</div>
        <div className="flex pt-1">
          <div className="w-1/3">
            <span className="text-3xl percent">0</span>
          </div>
          <div className="w-2/3 text-right">
            <span className="text-lg block pt-3">{inspectionCount || 0}</span>
          </div>
        </div>
      </div>
      <div className="mb-2">
        <div className="title">Asset For Release</div>
        <div className="flex pt-1">
          <div className="w-1/3">
            <span className="text-3xl percent">0</span>
          </div>
          <div className="w-2/3 text-right">
            <span className="text-lg block pt-3">0</span>
          </div>
        </div>
      </div>
      <div className="mb-2">
        <div className="title">Asset For Disposal</div>
        <div className="flex pt-1">
          <div className="w-1/3">
            <span className="text-3xl percent">0</span>
          </div>
          <div className="w-2/3 text-right">
            <span className="text-lg block pt-3">{dispositionCount || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideStats;
