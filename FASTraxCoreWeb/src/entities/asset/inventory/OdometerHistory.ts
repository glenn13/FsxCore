import {User} from '../../catalog/User';

export interface OdometerHistory {
  id: number;
  vehicleId: number;
  from: Date;
  to: Date;
  remarks: string;
  dateCreated: Date;
  createdById: number;

  createdBy?: User;
}
