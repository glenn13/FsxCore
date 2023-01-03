import * as React from 'react';
import {NumberKeyValuePair} from './../helpers/types';
import EntityAttachment from '@app/entities/global/EntityAttachment';
import {getAttachmentsBase64ById} from './../services/global/attachments.service';

export interface AttachmentsHookProps<T extends EntityAttachment> {
  attachments: T[];
  updateAttachments: (attachments: T[]) => void;
}

export const useAttachments = <T extends EntityAttachment>({
  attachments,
  updateAttachments,
}: AttachmentsHookProps<T>) => {
  React.useEffect(() => {
    if (attachments.length === 0) return;

    const ids: number[] = [];
    const result: T[] = [];
    const attachmentWithoutBase64: NumberKeyValuePair<T> = {};

    attachments.forEach(image => {
      if (image.attachment.file) return;

      ids.push(image.attachment.id);
      attachmentWithoutBase64[image.attachmentId] = image;
    });

    if (ids.length === 0) return;

    getAttachmentsBase64ById(ids).then(response => {
      if (response.data.length === 0) return console.error('Attachments not found!');
      const base64Attachments: NumberKeyValuePair<string> = {};
      response.data.forEach(data => (base64Attachments[data.id] = data.base64String));

      Object.keys(attachmentWithoutBase64).forEach(key => {
        const image = {...attachmentWithoutBase64[parseInt(key)]};
        result.push({
          ...image,
          attachment: {...image.attachment, file: base64Attachments[image.attachmentId]},
        });
      });

      updateAttachments(result);
    });
  }, [attachments, updateAttachments]);
};
