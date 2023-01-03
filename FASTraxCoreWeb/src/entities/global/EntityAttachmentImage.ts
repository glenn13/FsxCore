import EntityAttachment from './EntityAttachment';

export interface EntityAttachmentImage<T = unknown> extends EntityAttachment<T> {
  printable: boolean;
  default: boolean;
}
