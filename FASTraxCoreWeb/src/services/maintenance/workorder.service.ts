import { FsxUri } from '@app/helpers/endpoints';
import WorkOrderBOM from '@app/entities/maintenance/workorder/WorkOrderBOM';
import WorkOrderComponent from '@app/entities/maintenance/workorder/WorkOrderComponent';
import WorkOrderGeneralAsset from '@app/entities/maintenance/workorder/WorkOrderGeneralAsset';
import WorkOrderVehicle from '@app/entities/maintenance/workorder/WorkOrderVehicle';
import http from '../http.service';
import httpService from '../http.service';
import {useQuery} from 'react-query';
import WorkOrderSummary from '@app/entities/maintenance/workorder/WorkOrderSummary';
import { AssetCategoryEnum } from '@app/helpers/asset/enum';

const WORK_ORDER_KEY = 'WORK_ORDER_SUMMARY';

export const GetURIWorkOrderPageForView = (assetCategoryId: number, id: number): string => 
{
  let _value: string;
  _value = '';
  switch (assetCategoryId) {
    case Number(AssetCategoryEnum.GeneralAsset): {
      _value = `/app/maintenance/workorder/${id}/generalasset`;
      break;
    }
    case Number(AssetCategoryEnum.Vehicle): {
      _value = `/app/maintenance/workorder/${id}/vehicle`;
      break;
    }
    case Number(AssetCategoryEnum.Component): {
      _value = `/app/maintenance/workorder/${id}/component`;
      break;
    }
  }

  return _value;
};

export const deleteWorkOrderBOM = (id: number) =>
    httpService.delete<WorkOrderBOM>(FsxUri.maintenance.workorderbom.delete(id));

export const deleteWorkOrderComponent = (id: number) =>
    httpService.delete<WorkOrderComponent>(FsxUri.maintenance.workordercomponent.delete(id));

export const deleteWorkOrderGeneralAsset = (id: number) =>
    httpService.delete<WorkOrderGeneralAsset>(FsxUri.maintenance.workordergeneralasset.delete(id));

export const deleteWorkOrderVehicle = (id: number) =>
  httpService.delete<WorkOrderVehicle>(FsxUri.maintenance.workordervehicle.delete(id));

export const getWorkOrderSummaryForGrid = () =>
    http.get<WorkOrderSummary[]>(FsxUri.maintenance.workorder.summaryForGrid());

export const getUnderMaintenanceCount= () =>
    http.get<any>(FsxUri.maintenance.workorder.undermaintenanceCount());

export const useWorkOrderSummaryForGrid = () =>
  useQuery(WORK_ORDER_KEY, getWorkOrderSummaryForGrid);
