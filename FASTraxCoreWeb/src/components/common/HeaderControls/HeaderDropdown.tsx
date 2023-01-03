import React from 'react';
import styled from 'styled-components';
import {HeaderButton} from '.';

const StyledDiv = styled.div`
  position: relative;
  z-index: 2;
`;

const DropdownContainer = styled.div<{visible?: boolean}>`
  z-index: 2;
  position: absolute;
  right: 8px;
  top: 40px;
  cursor: default;
  display: ${({visible = true}) => (visible ? 'block' : 'none')};
`;

interface HeaderDropdownProps {
  icon?: string;
  label?: string;
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = props => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <StyledDiv>
      <HeaderButton onClick={() => setIsOpen(!isOpen)} active={isOpen}>
        <span>
          <i className={`mr-2 ${props.icon}`}></i>
          {props.label}
        </span>
      </HeaderButton>
      {isOpen && <DropdownContainer>{props.children}</DropdownContainer>}
    </StyledDiv>
  );
};

export default HeaderDropdown;
