import React from 'react';
import {Button} from '@app/components/common'
import styled from 'styled-components';


const StyledTabItem = styled.div`
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    flex-basis: 50%;
`;

const StyledButton = styled(Button)`
    margin: 0 auto;
    width: 100% !important;
    border: .15rem solid var(--btn-color);
    padding: 0.65em 1.5em 0.65em;

    &:not(.active) {
      background: transparent !important;
      color: var(--btn-color);
    }
`;


export interface FsxTabItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  active?: boolean;
}

const FsxTabItem: React.FC<FsxTabItemProps> = ({
  children,
  className,
  title,
  active,
  ...props
}) => {
  
  return (
    <StyledTabItem {...props} className={`fsxtab-item`}>
           <StyledButton rounded ripple shadow className={`${active ? 'active' : ''}`}>{title}</StyledButton>
    </StyledTabItem>
  );
};

export default FsxTabItem;
