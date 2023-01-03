import {Attachment} from '../entities/global/Attachment';
import NoImageAvailable from '../assets/images/no-image-available.jpg';

export const getFileFromUrl = async (url: string, name: string, defaultType = 'image/jpeg') => {
  const fileReader = new FileReader();
  const response = await fetch(url);
  const data = await response.blob();
  const file = new File([data], name, {
    type: response.headers.get('content-type') || defaultType,
  });

  return new Promise<string | null>(resolve => {
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result?.toString() || '');
  });
};

export const readFile = (file: File) => {
  return new Promise<string | null>(resolve => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result?.toString() || '');
  });
};

export const attachmentToDataURL = (
  attachment?: Attachment,
  returnNoImg: boolean = true,
): string => {
  if (!attachment) return returnNoImg ? NoImageAvailable : '';

  if (!attachment.file) return '';

  const base64arr = attachment.file.split(',');

  if (base64arr.length === 2) return attachment.file;

  return `data:${attachment.fileType};base64,${attachment.file}`;
};

export const attachmentToFile = async (attachment: Attachment) => {
  const dataUrl = attachmentToDataURL(attachment);

  const response = await fetch(dataUrl);
  const blob = await response.blob();

  return new File([blob], attachment.filename, {type: attachment.fileType});
};

export const dataURLtoFile = (daraUrl: string, filename: string) => {
  const arr = daraUrl.split(',');
  const match = arr[0] && arr[0].match(/:(.*?);/);
  const mime = (match && match[1]) || undefined;
  const bstr = arr.length === 1 ? arr[0] : arr[1];
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) u8arr[n] = bstr.charCodeAt(n);

  return new File([u8arr], filename, {type: mime});
};

export const urltoFile = async (url: string, filename: string, mimeType: string): Promise<File> => {
  if (url.split(',').length === 1) return Promise.resolve(dataURLtoFile(url, filename));

  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();

  return new File([arrayBuffer], filename, {type: mimeType});
};

export const downloadAttachment = (attachment: Attachment) => {
  if (!attachment) return;

  const el = document.createElement('a');
  el.href = attachmentToDataURL(attachment);
  el.download = attachment.filename;
  el.click();

  el.remove();
};
