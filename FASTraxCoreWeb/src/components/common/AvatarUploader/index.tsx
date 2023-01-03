import React from 'react';
import {SvgIcon} from '@app/components/common';
import {readFile} from '@app/helpers/file';
import styles from './avataruploader.module.scss';
import NoImageAvailable from '@app/assets/images/no-image-available.jpg';
import styled from 'styled-components';

export interface AvatarUploaderProps {
  onChange?: (file: File | null, uri: string | null) => void;
  image?: File | string | undefined;
  rounded?: boolean;
  circle?: boolean;
  hideUploadButton?: boolean;
}

const AvatarWrapper = styled.div<AvatarUploaderProps>`
  img {
    border-radius: ${props => (props.circle ? '50%' : '10%')};
  }

  img + div {
    transform: ${props => (!props.circle ? 'translate(20px, 16px)' : 'translate(0, 0)')};
  }
`;

const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  children,
  hideUploadButton = false,
  image,
  onChange,
  rounded,
  circle = !rounded,
  ...props
}) => {
  const inputFileRef = React.createRef<HTMLInputElement>();
  const [uri, setUri] = React.useState<string | null>();
  const getFile = () => inputFileRef.current?.files?.item(0);

  const onFileChange = async () => {
    const file = getFile();

    if (!file) return setUri(null);

    const newUri = file && (await readFile(file));
    onChange && onChange(file || null, newUri || null);

    return setUri(newUri);
  };

  const LoadImage = async (image: File | string) => {
    if (typeof image === 'string') {
      setUri(await image);
    } else {
      setUri(await readFile(image));
    }
  };

  React.useEffect(() => {
    if (!image) return setUri('');

    LoadImage(image);
  }, [image]);

  return (
    <AvatarWrapper
      {...{circle}}
      className="rounded-full h-48 w-48 flex items-center justify-center bg-gray-300 mx-auto my-0 relative">
      {<img src={uri ? uri : NoImageAvailable} className={`w-full ${styles.avatarImage}`} alt="" />}
      {!hideUploadButton && (
        <div
          className={`h-12 w-12 rounded-full bg-blue-300 absolute bottom-0 right-0 cursor-pointer ${styles.avatarImageBtn}`}>
          <input
            type="file"
            multiple={false}
            ref={inputFileRef}
            className="hidden"
            name="image-attachment"
            onChange={onFileChange}
            accept={'.jpg, .png, .gif'}
          />

          <SvgIcon
            svgId="add"
            size={16}
            color="white"
            className="my-3 mx-4 mt-4 p-0"
            onClick={() => inputFileRef.current?.click()}></SvgIcon>
        </div>
      )}
    </AvatarWrapper>
  );
};

export default React.memo(AvatarUploader);
