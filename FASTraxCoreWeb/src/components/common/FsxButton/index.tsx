import {Button, ButtonProps} from '@progress/kendo-react-buttons';

import {ReactComponent as LoadingSvg} from '@app/assets/images/loading.svg';
import React from 'react';
import styled from 'styled-components';

export interface FsxButtonProps extends ButtonProps {
  loading?: boolean;
  shape?: 'rounded' | 'rounded-full' | 'rounded-none';
}

const StyledButton = styled(Button)<FsxButtonProps>`
  font-weight: normal;
  min-height: 46.05px;
`;

export const FsxButton: React.FC<FsxButtonProps> = ({
  children,
  className,
  loading,
  shape,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      className={`border-none ${shape !== undefined ? shape : ''} ${
        className !== undefined ? className : ''
      }`}
      disabled={disabled || loading}
      {...props}>
      {loading ? <LoadingSvg height={16} width={16} className="rotating" /> : children}
    </StyledButton>
  );
};

export default FsxButton;
