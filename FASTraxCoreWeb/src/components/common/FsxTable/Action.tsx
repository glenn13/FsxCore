import React from 'react';
import styled from 'styled-components';

const ButtonStyled = styled.button`
  border-radius: 4px;
  padding: 7px 10px;
  background-color: #4f5761;

  &:disabled {
    background-color: #4f5761;
    opacity: 0.3;
  }
`;

export interface FsxTableActionProps {
  label: string;
}

const FsxTableAction: React.FC<
  FsxTableActionProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({onClick, label, ...props}) => {
  return (
    <ButtonStyled
      className="mr-1 text-white py-1 text-base flex-1 lg:flex-none lg:w-40"
      onClick={onClick}
      type="button"
      {...props}>
      {label}
    </ButtonStyled>
  );
};

export default FsxTableAction;
