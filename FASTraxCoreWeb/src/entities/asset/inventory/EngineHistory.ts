import {User} from '../../catalog/User';

export interface EngineHistory {
  id: number;
  vehicleId: number;
  from: Date;
  to: Date;
  remarks: string;
  dateCreated: Date;
  createdById: number;

  createdBy?: User;
}
