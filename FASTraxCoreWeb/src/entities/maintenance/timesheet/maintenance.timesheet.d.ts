// import {Personnel} from '../../hr/personnel.d';

interface TimesheetPersonnelMaintenance {
  id?: number;
  personnelId?: number;
  referenceNo?: string;
  timesheets?: Timesheet[];
  personnel?: Personnel;
}

interface Timesheet {
  id?: number | string;
  actualHour: number;
  clockIn: Date;
  clockOut: Date;
  confirmedByPersonnelId: number;
  datePerformed: Date;
  estimatedTime: number;
  ojt?: boolean;
  reWork?: boolean;
  remarks?: string;
  serviceCode: string;
  statusId: number;
  totalCost: number;
  workOrderAssetType?: string;
  workOrderId?: number;
  workOrderNo: string;
}
