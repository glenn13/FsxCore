import React, {HTMLAttributes} from 'react';
import styled from 'styled-components';

export interface IInputProps {
  rounded?: boolean;
  shadow?: boolean;
  text?: string;
}

const InputStyled = styled.input<IInputProps>`
  position: relative;
  visibility: hidden;
  margin-right: 14px;
  cursor: pointer;
  &:before {
    content: '';
    position: absolute;
    visibility: visible;
    width: 19px;
    height: 19px;
    border-radius: 50%;
    top: -3px;
    left: 0;
    border: 0.09rem solid #eaeaea;
    transition: 0.2s all ease-in;
  }

  &:after {
    content: '';
    position: absolute;
    background: ${props => props.theme.color.secondary};
    width: 16px;
    height: 16px;
    transition: 0.2s background ease-in, 0.15s transform ease-in;
    border-radius: 50%;
    transform: translate(0.2rem, -0.02rem) scale(0);
  }

  &:checked:before {
    background: #fff;
    box-shadow: 0 5px 13px -6px ${props => props.theme.color.secondary};
    border: 0.09rem solid ${props => props.theme.color.secondary};
  }

  &:checked:after {
    visibility: visible;
    transform: translate(0.2rem, -0.02rem) scale(1);
  }
`;

const InputWrapperStyled = styled.label`
  cursor: pointer;
  user-select: none;
  padding: 6px 5px;
  display: inline-block;
`;

export const Index: React.FC<
  IInputProps & HTMLAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement>
> = ({text, id, className, ...props}) => {
  return (
    <InputWrapperStyled>
      <InputStyled type="checkbox" {...props} />
      {text && <span>{text}</span>}
    </InputWrapperStyled>
  );
};

export default Index;
