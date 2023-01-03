import http from '@app/services/http.service';
import FsxUri from '@app/helpers/endpoints';

export interface AttachmentBase64 {
  id: number;
  base64String: string;
}

export const getAttachmentsBase64ById = (ids: number[]) => {
  return http.get<AttachmentBase64[]>(FsxUri.global.attachments.base64(ids));
};
