import React from 'react';
import styled from 'styled-components';

const ItemStyled = styled.a<ButtonDropdownItemProps>`
  padding: 10px 15px;

  :hover {
    background: #e6e8ea;
  }

  ${props => (!!props.topDivider ? 'border-top: 1px solid #dedede;' : '')}
  ${props => (!!props.bottomDivider ? 'border-bottom: 1px solid #dedede;' : '')}
`;

export interface ButtonDropdownItemProps {
  topDivider?: boolean;
  bottomDivider?: boolean;
}

const ButtonDropdownItem: React.FC<
  ButtonDropdownItemProps & React.HTMLAttributes<HTMLAnchorElement>
> = ({children, ...props}) => {
  return <ItemStyled {...props}>{children}</ItemStyled>;
};

export default ButtonDropdownItem;
