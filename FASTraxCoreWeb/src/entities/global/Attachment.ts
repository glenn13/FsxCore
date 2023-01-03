import {User} from '../catalog/User';

export interface Attachment {
  id: number;
  file?: string;
  filepath?: string;
  filename: string;
  fileSize: number;
  fileType: string;
  remarks?: string;
  createdDate: Date;
  createdById: number;

  createdBy?: User;
}
