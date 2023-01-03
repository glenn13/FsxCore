import {Button} from '@app/components/common';
import FsxTextarea from '../Textarea';
import {ReactComponent as ImageUploadSvg} from '@app/assets/images/image-upload.svg';
import React from 'react';
import {StringKeyValuePair} from '../../../helpers/types';
import {readFile} from '../../../helpers/file';
import styled from 'styled-components';

// TODO: add this to global settings.
const MAX_IMAGE_FILE_SIZE = 5245329;

const MAX_FILE_SIZE = 26214400;

const AttachmentButtonStyled = styled.button`
  border: 2px dashed #dedede !important;
  height: 160px;
  border-radius: 11px;
  padding: 15px 5px;
`;

export type FsxAttachmentFormTypes = 'images' | 'documents';

type FileTypes = {
  [key in FsxAttachmentFormTypes]: string;
};

const fileTypes: FileTypes = {
  images: '.jpg, .png, .gif',
  documents: '.docx, .xlsx, .xls',
};

function isImage(file: File) {
  return file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif';
}
export interface FsxAttachmentFormProps {
  children?: React.ReactNode | React.ReactNode[];
  fileAttachment?: File;
  maxImageFileSize?: number;
  maxFileSize?: number;
  onChange?: (file: File | null) => void;
  onSubmit: (file: File, attachmentFile: string, remarks?: string) => void;
  remarks?: string;
  type: FsxAttachmentFormTypes;
  isReadOnly?: boolean;
}

const inputFileRef = React.createRef<HTMLInputElement>();

const getFile = () => inputFileRef.current?.files?.item(0);

const FsxAttachmentForm: React.FC<FsxAttachmentFormProps> = ({
  onSubmit,
  children,
  onChange,
  remarks,
  type,
  fileAttachment,
  maxImageFileSize,
  maxFileSize,
  isReadOnly,
}) => {
  const [errors, setErrors] = React.useState<StringKeyValuePair<string>>({});

  const [uri, setUri] = React.useState<string | null>();

  const [_remarks, setRemarks] = React.useState('');

  const [fileType, setFileType] = React.useState<'documents' | 'images'>(type);

  const [isGreaterThanMaxFileSize, setIsGreaterThanMaxFileSize] = React.useState(false);

  const allowedImageFileSize = maxImageFileSize ?? MAX_IMAGE_FILE_SIZE;

  const allowedFileSize = maxFileSize ?? MAX_FILE_SIZE;

  const onFileChange = async () => {
    const file = getFile();

    onChange && onChange(file || null);

    if (!file) return setUri(null);

    setFileType(isImage(file) ? 'images' : 'documents');

    setIsGreaterThanMaxFileSize(
      isImage(file) ? file.size > allowedImageFileSize : file.size > allowedFileSize,
    );

    return setUri(await readFile(file));
  };

  const handleSubmit = () => {
    const file = inputFileRef.current?.files?.item(0);

    if (file) return onSubmit(file, uri || '', _remarks);

    if (fileAttachment) return onSubmit(fileAttachment, uri || '', _remarks);

    return setErrors({...errors, file: 'File is required!'});
  };

  React.useEffect(() => {
    if (!fileAttachment) return setUri('');

    readFile(fileAttachment).then(base64 => {
      setUri(base64);
    });
  }, [fileAttachment]);

  React.useEffect(() => {
    setRemarks(remarks || '');
  }, [remarks]);

  React.useEffect(() => {
    return () => {
      setUri(null);
    };
  }, []);

  const renderLabel = () => {
    if (uri && type === 'images') return '';

    return getFile()?.name || fileAttachment?.name || `Click or drag your Attachment`;
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (inputFileRef.current) inputFileRef.current.files = event.dataTransfer.files;

    const file = getFile();

    if (file) {
      setFileType(isImage(file) ? 'images' : 'documents');

      setIsGreaterThanMaxFileSize(
        isImage(file) ? file.size > allowedImageFileSize : file.size > allowedFileSize,
      );

      (async () => {
        setUri(await readFile(file));
      })();
    }
  };

  return (
    <div className="flex flex-col justify-between flex-1 w-full">
      <div className="z-50 px-6 py-4" onDrop={handleDrop}>
        <input
          type="file"
          multiple={false}
          ref={inputFileRef}
          className="hidden"
          name="image-attachment"
          onChange={onFileChange}
          accept={fileTypes[type]}
          disabled={isReadOnly}
        />
        <AttachmentButtonStyled
          className={`w-full my-2 relative ${type === 'images' ? `` : `py-5`}`}
          onClick={() => inputFileRef.current?.click()}
          style={{border: '1px solid #D9D9D9'}}
          type="button" disabled={isReadOnly}> 
          <span className="input__label">Attachment</span>
          {uri && type === 'images' ? (
            <img
              src={uri}
              className="w-full"
              alt=""
              style={{objectFit: 'contain', height: '100%'}}
            />
          ) : (
            <ImageUploadSvg
              style={{
                width: 75,
                margin: '0 auto',
              }}
            />
          )}
          <label className="block mb-5 text-gray-500">{renderLabel()}</label>
        </AttachmentButtonStyled>
        {uri && type !== fileType ? (
          <p className="text-red-800">Invalid File</p>
        ) : (
          isGreaterThanMaxFileSize && (
            <p className="text-red-800">
              Maximum file size allowed is {fileType === 'images' ? '5MB' : '25MB'}
            </p>
          )
        )}
        <FsxTextarea
          value={_remarks}
          label="Remarks"
          onChange={e => setRemarks(e.currentTarget.value)}
          disabled={isReadOnly}
        />
        {children}
      </div>
      <div className="px-5 pb-5">
        <Button
          type="button"
          block
          oval
          shadow
          ripple
          onClick={handleSubmit}
          disabled={isGreaterThanMaxFileSize || type !== fileType || isReadOnly}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default React.memo(FsxAttachmentForm);
