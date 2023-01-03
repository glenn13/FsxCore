import NoImageAvailable from '../assets/images/no-image-available.jpg';

export interface FileAttachment {
  file: string;
  filename: string;
  fileType: string;
  fileSize: number;
  default?: boolean;
}

type FileAttachmentType = keyof FileAttachment;

export const base64toDataUrl = (base64string: string, type?: string) => {
  if (!base64string) return '';

  const base64semiColonSeparated = base64string.split(';');

  if (base64semiColonSeparated.length === 2) return base64string;

  return `data:${type || 'image/jpg'};base64,${base64string}`;
};

export const attachmentToDataURL = <entity extends FileAttachment>(
  attachment: entity,
  returnNoImg: boolean = true,
): string => {
  if (!attachment) return returnNoImg ? NoImageAvailable : '';
  const base64arr = attachment.file.split(',');

  if (base64arr.length === 2) return attachment.file;

  return `data:${attachment.fileType};base64,${attachment.file}`;
};

export const attachmentToFile = async <entity = unknown>(
  attachment: entity & FileAttachment,
): Promise<File> => {
  const dataUrl = attachmentToDataURL(attachment);

  const response = await fetch(dataUrl);
  const blob = await response.blob();

  return new File([blob], attachment.filename, {type: attachment.fileType});
};
