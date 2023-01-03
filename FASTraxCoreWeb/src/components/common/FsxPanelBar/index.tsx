import React from 'react';
import styled from 'styled-components';

const StyledPanelBar = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0px 3px 13px -5px var(--shadow-color);
  border: none;
  background-color: #fff;
  border-color: rgba(0, 0, 0, 0.08);
  color: #656565;

  .fsxpanelbar-item + .fsxpanelbar-item {
    border-top: thin solid #eaeaea;
  }
`;

export type FsxPanelBarProps = {};

const FsxPanelBar: React.FC<FsxPanelBarProps> = ({children, ...props}) => {
  return <StyledPanelBar {...props}>{children}</StyledPanelBar>;
};

export default FsxPanelBar;
