import React from 'react';
import styled from 'styled-components';

export type FsxCheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  rounded?: boolean;
  shadow?: boolean;
  text?: string;
};

const InputStyled = styled.input<FsxCheckboxProps>`
  position: relative;
  visibility: hidden;
  margin-right: 14px;
  cursor: pointer;

  &:hover:before {
    background-color: #e4e4e4;
  }

  &:before {
    content: '';
    position: absolute;
    visibility: visible;
    width: 19px;
    height: 19px;
    border-radius: 50%;
    top: -3px;
    left: 0;
    border: 0.09rem solid #9e9e9e;
    transition: 0.2s all ease-in;
  }

  &:after {
    content: '\\e908';
    position: absolute;
    font-family: 'ams-icons' !important;
    font-style: normal;
    font-weight: normal;
    font-feature-settings: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    z-index: 1000;
    color: #fff;
    visibility: visible;
    top: 3px;
    left: 5px;
    font-size: 9px;
  }

  &:checked:before {
    background: ${props => props.theme.color.secondary};
    border: 1.5px solid ${props => props.theme.color.secondary};
    box-shadow: 0 5px 13px -6px ${props => props.theme.color.secondary};
  }
`;

const InputWrapperStyled = styled.label`
  cursor: pointer;
  user-select: none;
  padding: 6px 5px;
  align-items: center;
  display: inline-flex;
  justify-content: center;
`;

export const Index: React.FC<FsxCheckboxProps> = ({text, ...props}) => {
  return (
    <InputWrapperStyled>
      <InputStyled type="checkbox" {...props} />
      {text && <span>{text}</span>}
    </InputWrapperStyled>
  );
};

export default Index;
