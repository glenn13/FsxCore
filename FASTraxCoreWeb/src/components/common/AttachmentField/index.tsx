import React from 'react';
import styled from 'styled-components';
import {readFile} from '../../../helpers/file';
import {StringKeyValuePair} from '../../../helpers/types';
import {ReactComponent as ImageUploadSvg} from '@app/assets/images/image-upload.svg';
import {Button} from '@app/components/common';

const AttachmentButtonStyled = styled.button`
    border: 2px dashed #dedede !important;
    height: 160px;
    border-radius: 11px;
    padding: 15px 5px;
`;

export type FsxAttachmentFieldTypes = 'images' | 'documents';

type FileTypes = {
    [key in FsxAttachmentFieldTypes]: string;
};
const fileTypes: FileTypes = {
    images: '.jpg, .png, .gif',
    documents: '.docx, .xlsx, .xls',
};

export interface FsxAttachmentFieldProps {
    onChange?: (file: File | null) => void;
    type: FsxAttachmentFieldTypes;
    fileAttachment?: File;
    readFileAttachment: (file: File, attachmentFile: string, remarks?: string) => void;
}

const inputFileRef = React.createRef<HTMLInputElement>();
const getFile = () => inputFileRef.current?.files?.item(0);

const FsxAttachmentField: React.FC<FsxAttachmentFieldProps> = ({
    onChange,
    type,
    fileAttachment,
    readFileAttachment,
}) => {
    const [errors, setErrors] = React.useState<StringKeyValuePair<string>>({});
    const [uri, setUri] = React.useState<string | null>();
    const [_remarks, setRemarks] = React.useState('');

    const onFileChange = async () => {
        const file = getFile();

        onChange && onChange(file || null);
        
        if (!file) return setUri(null);

        setUri(await readFile(file));
        
        return readFileAttachment(file, uri || '', _remarks);
        // return setUri(await readFile(file));
        // const file = inputFileRef.current?.files?.item(0);

        // if (file) return onSubmit(file, uri || '', _remarks);

        // if (fileAttachment) return onSubmit(fileAttachment, uri || '', _remarks);

        // return setErrors({...errors, file: 'File is required!'});
    };

    // const handleSubmit = () => {
    //     const file = inputFileRef.current?.files?.item(0);

    //     if (file) return onSubmit(file, uri || '', _remarks);

    //     if (fileAttachment) return onSubmit(fileAttachment, uri || '', _remarks);

    //     return setErrors({...errors, file: 'File is required!'});
    // };

    React.useEffect(() => {
        if (!fileAttachment) return setUri('');

        readFile(fileAttachment).then(base64 => {
            setUri(base64);
        });
        // console.log(uri);
    }, [fileAttachment]);

    // React.useEffect(() => {
    //     setRemarks(remarks || '');
    // }, [remarks]);

    React.useEffect(() => {
        return () => {
            setUri(null);
        };
    }, []);

    const renderLabel = () => {
        if (uri && type === 'images') return '';

        return getFile()?.name || fileAttachment?.name || `Choose your Attachment`;
    };

    return (
        <div className="flex flex-1 flex-col justify-between w-full">
            <div className="px-6 py-4">
                <input
                    type="file"
                    multiple={false}
                    ref={inputFileRef}
                    className="hidden"
                    name="image-attachment"
                    onChange={onFileChange}
                    accept={fileTypes[type]}
                />

                <AttachmentButtonStyled
                    className={`w-full my-2 relative ${type === 'images' ? `` : `py-5`}`}
                    onClick={() => inputFileRef.current?.click()}
                    style={{border: '1px solid #D9D9D9'}}
                    type="button"
                >
                    <span className="input__label">Attachment</span>
                    {uri && type === 'images' 
                        ? (<img src={uri} className="w-full"  alt="" style={{objectFit: 'contain', height: '100%'}} />) 
                        : (<ImageUploadSvg style={{ width: 75, margin: '0 auto', }} />)
                    }
                    <label className="text-gray-500 mb-5 block">{renderLabel()}</label>
                </AttachmentButtonStyled>

            </div>
        </div>
    );
};

export default React.memo(FsxAttachmentField);
